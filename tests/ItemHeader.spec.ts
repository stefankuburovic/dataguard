import { shallowMount } from '@vue/test-utils';
import ItemHeader from '@/components/ItemHeader.vue';

describe('ItemHeader.vue', () => {
  it('renders props.filters when passed', () => {
    const filters = {
      startDate: '2022-01-01',
      endDate: '2022-12-31',
      minStars: 100,
      selectedLanguages: ['JavaScript', 'TypeScript']
    };
    const wrapper = shallowMount(ItemHeader, {
      props: { filters }
    });
    expect(wrapper.text()).toContain('Between 2022-01-01 and 2022-12-31');
    expect(wrapper.text()).toContain('with at least 100 stars');
  });
});