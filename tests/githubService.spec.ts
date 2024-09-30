import axios from 'axios';
import { searchRepositories } from '@/service/githubService';

jest.mock('axios');

describe('githubService.ts', () => {
    it('fetches repositories from GitHub API', async () => {
        const response = {
            data: {
                items: [
                    { id: 1, name: 'repo1', html_url: 'url1', description: 'desc1', stargazers_count: 100, created_at: '2022-01-01' }
                ]
            }
        };
        axios.get.mockResolvedValue(response);

        const result = await searchRepositories('JavaScript', 100, '2022-01-01', '2022-12-31', 1);
        expect(result).toEqual(response);
    });
});