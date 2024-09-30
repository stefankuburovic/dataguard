<template>
  <div class="p-4 bg-gray-100 shadow-md h-full">
    <h2 class="font-semibold text-xl mb-4">Filters</h2>
    <div class="space-y-3">
      <div class="flex flex-wrap gap-2">
        <!-- Language Chips -->
        <div
            v-for="(lang, index) in selectedLanguages"
            :key="index"
            class="bg-blue-500 text-white px-2 py-1 rounded flex items-center"
        >
          {{ lang }}
          <button @click="removeLanguage(index)" class="ml-2">x</button>
        </div>
      </div>

      <!-- Language Dropdown -->
      <div class="relative">
        <input
            type="text"
            placeholder="Search language..."
            v-model="languageSearch"
            @input="filterLanguages"
            @focus="showDropdown = true"
            class="border border-gray-300 rounded-md p-2 w-full"
        />
        <ul
            v-if="showDropdown"
            class="absolute bg-white border border-gray-300 w-full z-10 max-h-48 overflow-y-auto"
        >
          <li
              v-for="(lang, index) in filteredLanguages"
              :key="index"
              @click="selectLanguage(lang)"
              class="p-2 cursor-pointer hover:bg-gray-100"
          >
            {{ lang }}
          </li>
        </ul>
      </div>

      <!-- Date Range Fields (Required) -->
      <div class="flex flex-col space-y-2">
        <label class="font-semibold">From</label>
        <input
            type="date"
            v-model="startDate"
            class="border border-gray-300 rounded-md p-2 w-full"
        />
        <label class="font-semibold">To</label>
        <input
            type="date"
            v-model="endDate"
            class="border border-gray-300 rounded-md p-2 w-full"
        />
      </div>

      <!-- Minimum Stars Input -->
      <div class="flex items-center space-x-2">
        <label class="font-semibold">With at least</label>
        <input
            type="number"
            v-model="minStars"
            placeholder="100"
            class="border border-gray-300 rounded-md p-2 w-20"
        />
        <span class="font-semibold">stars</span>
      </div>

      <!-- Submit Button (Disabled if fields are not valid) -->
      <button
          @click="applyFilters"
          :disabled="!isFormValid"
          class="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition disabled:opacity-50"
      >
        Search selected filters
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedLanguages: [],
      languageSearch: '',
      showDropdown: false,
      filteredLanguages: ['javascript', 'typescript', 'c', 'python', 'ruby', 'java'],
      startDate: '',
      endDate: '',
      minStars: 100,
      submitted: false
    };
  },
  computed: {
    isFormValid() {
      return this.startDate && this.endDate;
    },
  },
  watch: {
    selectedLanguages: 'triggerApiCall',
    startDate: 'triggerApiCall',
    endDate: 'triggerApiCall',
    minStars: 'triggerApiCall',
  },
  methods: {
    filterLanguages() {
      this.filteredLanguages = ['javascript', 'typescript', 'c', 'python', 'ruby', 'java'].filter(
          (lang) => lang.toLowerCase().includes(this.languageSearch.toLowerCase())
      );
    },
    selectLanguage(language) {
      this.selectedLanguages.push(language);
      this.showDropdown = false;
      this.languageSearch = '';
      this.triggerApiCall();
    },
    removeLanguage(index) {
      this.selectedLanguages.splice(index, 1);
      this.triggerApiCall();
    },
    applyFilters() {
      this.submitted = true;
      this.triggerApiCall();
    },
    triggerApiCall() {
      if(!this.isFormValid) return;
      if(this.submitted) {
        this.$emit('filters-applied', {
          selectedLanguages: this.selectedLanguages,
          startDate: this.startDate,
          endDate: this.endDate,
          minStars: this.minStars,
        });
        this.$emit('submitted', {
          submitted: this.submitted
        });
      }
    },
  },
};
</script>
