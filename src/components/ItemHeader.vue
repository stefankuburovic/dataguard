<template>
  <div v-if="!!filters.startDate && filters.endDate && filters.selectedLanguages.length > 0" class="p-4 bg-white rounded-xl shadow-md m-5">
    <h1 class="text-center text-2xl font-bold mb-2">Github Repositories</h1>
    <h3 class="text-center text-lg text-gray-700 mb-1">Between {{filters.startDate}} and {{filters.endDate}}</h3>
    <h5 class="text-center text-md text-gray-600">with at least {{filters.minStars}} stars</h5>
    <hr class="pb-2"/>
  </div>
</template>

<script>
export default {
  props: {
    filters: {
      type: Object,
      required: true
    }
  }
};
</script>

<style scoped>
/* Add any component-specific styles here */
</style>