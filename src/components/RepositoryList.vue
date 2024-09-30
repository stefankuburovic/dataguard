<template>
  <div class="border border-gray-300 p-4 rounded-lg shadow-sm relative">
    <h3 class="font-semibold text-lg mb-3">{{ language }}</h3>
    <div
        v-infinite-scroll="loadMore"
        infinite-scroll-disabled="loading"
        infinite-scroll-distance="10"
        class="space-y-4 overflow-auto max-h-96 mt-8"
        @scroll="handleScroll"
        ref="tile"
    >
      <h1 class="text-center" v-if="!loading && repositories.length === 0">No repositories found</h1>
      <div v-for="repo in repositories" :key="repo.id" class="space-y-2">
        <RepositoryItem :repo="repo"/>
      </div>
      <div v-if="loading" class="text-center">
        <div class="loader"></div>
      </div>
    </div>
  </div>
</template>

<script>
import {searchRepositories} from '@/service/githubService';
import RepositoryItem from "@/components/RepositoryItem.vue";
import ItemHeader from "@/components/ItemHeader.vue";

export default {
  components: {ItemHeader, RepositoryItem},
  props: ['language', 'filters'],
  data() {
    return {
      repositories: [],
      loading: false,
      page: 1,
    };
  },
  watch: {
    filters: {
      immediate: true,
      handler() {
        this.repositories = [];
        this.page = 1;
        this.loadMore();
      },
    },
  },
  methods: {
    handleScroll() {
      const tile = this.$refs.tile;
      if (tile.scrollTop + tile.clientHeight >= tile.scrollHeight) {
        console.log('here');
        this.loadMore();
      }
    },
    async loadMore() {
      if (this.loading) return;
      this.loading = true;
      try {
        const response = await searchRepositories(this.language, this.filters.minStars, this.filters.startDate, this.filters.endDate, this.page);
        this.repositories.push(...response.data.items);
        this.page++;
      } catch (error) {
        console.error(error);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>
<style scoped>
/* index.css or within <style> in RepositoryList.vue */
.loader {
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-left-color: #4f46e5;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  animation: spin 1s linear infinite;
  margin: 0 auto;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>