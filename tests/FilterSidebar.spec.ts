import { shallowMount } from '@vue/test-utils';
import FilterSidebar from '@/components/FilterSidebar.vue';

describe('FilterSidebar.vue', () => {
    it('emits filters-applied event with correct payload', async () => {
        const wrapper = shallowMount(FilterSidebar);
        await wrapper.setData({
            selectedLanguages: ['JavaScript'],
            startDate: '2022-01-01',
            endDate: '2022-12-31',
            minStars: 100
        });
        await wrapper.vm.applyFilters();
        expect(wrapper.emitted('filters-applied')).toBeTruthy();
        expect(wrapper.emitted('filters-applied')[0][0]).toEqual({
            selectedLanguages: ['JavaScript'],
            startDate: '2022-01-01',
            endDate: '2022-12-31',
            minStars: 100
        });
    });
});