export interface Post {
    id: string;
    userId: number;
    categoryId: number;
    title: string;
    content: string;
    imgUrl: string;
    tags: string[];
    categories: string[];
    createdDate: Date;
}