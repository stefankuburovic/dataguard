import { shallowMount } from '@vue/test-utils';
import RepositoryList from '@/components/RepositoryList.vue';
import { searchRepositories } from '@/service/githubService';

jest.mock('@/service/githubService');

describe('RepositoryList.vue', () => {
  it('renders language prop when passed', () => {
    const language = 'JavaScript';
    const filters = {
      startDate: '2022-01-01',
      endDate: '2022-12-31',
      minStars: 100
    };
    const wrapper = shallowMount(RepositoryList, {
      props: { language, filters }
    });
    expect(wrapper.text()).toContain(language);
  });

  it('calls searchRepositories on loadMore', async () => {
    const language = 'JavaScript';
    const filters = {
      startDate: '2022-01-01',
      endDate: '2022-12-31',
      minStars: 100
    };
    const wrapper = shallowMount(RepositoryList, {
      props: { language, filters }
    });
    await wrapper.vm.loadMore();
    expect(searchRepositories).toHaveBeenCalled();
  });
});