import axios, { AxiosResponse } from 'axios';
import { useToast } from 'vue-toast-notification';

const GITHUB_TOKEN = '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'; //Github token visible, only for testing purposes

const $toast = useToast();

interface Repository {
    id: number;
    name: string;
    html_url: string;
    description: string;
    stargazers_count: number;
    created_at: string;
}

interface SearchResponse {
    data: {
        items: Repository[];
    };
}

export const searchRepositories = async (
    language: string,
    minStars: number,
    startDate: string,
    endDate: string,
    page: number
): Promise<AxiosResponse<SearchResponse>> => {
    const query = `q=language:${language}+stars:>=${minStars}+created:${startDate}..${endDate}&sort=stars&order=desc&page=${page}&per_page=10`;
    const url = `https://api.github.com/search/repositories?${query}`;

    try {
        return await axios.get<SearchResponse>(url, {
            headers: {
                Authorization: `token ${GITHUB_TOKEN}`,
            },
        });
    } catch (error: any) {
        $toast.error(`Failed to fetch repositories: ${error.response.data.errors[0].message}`, {
            duration: 5000,
            position: 'top-right',
        });
        throw error;
    }
};