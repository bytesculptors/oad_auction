import request from '@/lib/axios';

export interface SearchApiProps {
    keyWord: string;
    limit: number;
    page: number;
}
