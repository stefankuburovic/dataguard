<template>
  <div class="flex w-full h-2/3">
    <filter-sidebar @filters-applied="applyFilters" @submitted="isSubmitted" class="w-1/4" />
    <div class="w-3/4 flex flex-col mt-4">
      <item-header :filters="filters" v-if="submitted"/>
      <div class="p-6 grid grid-cols-2 gap-6">
        <repository-list
            v-for="(language) in filters.selectedLanguages"
            :key="language"
            :language="language"
            :filters="filters"
        />
      </div>
    </div>
  </div>
</template>

<script>
import FilterSidebar from '@/components/FilterSidebar.vue';
import RepositoryList from '@/components/RepositoryList.vue';
import ItemHeader from "@/components/ItemHeader.vue";

export default {
  components: {
    ItemHeader,
    FilterSidebar,
    RepositoryList
  },
  data() {
    return {
      filters: {
        selectedLanguages: [],
        startDate: '',
        endDate: '',
        minStars: 100,
      },
      submitted: false,
    };
  },
  methods: {
    applyFilters(filters) {
      this.filters = filters;
    },
    isSubmitted(submitted) {
      this.submitted = submitted;
    },
  },
};
</script>
