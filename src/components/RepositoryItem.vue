<template>
    <h4>
      <a :href="repo.html_url" class="text-blue-500 hover:underline" target="_blank">{{ repo.name }}</a>
    </h4>
    <p class="text-gray-600">{{ repo.description }}</p>
    <p class="text-sm text-gray-500">Created on: {{ formattedDate }}</p>
    <p class="text-sm text-gray-500">Stars: {{ repo.stargazers_count }}</p>
</template>

<script>
export default {
  props: {
    repo: {
      type: Object,
      required: true
    }
  },
   computed: {
    formattedDate() {
      return new Date(this.repo.created_at).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    }
   }
};
</script>

<style scoped>
/* Add any component-specific styles here */
</style>