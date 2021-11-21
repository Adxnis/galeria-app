import { Album } from "./album";
import { Tag } from "./tag";

export interface Photo {
    id: number;
    user_id: number;
    name: string;
    file_name: string;
    size: string;
    albums?: Album[];
    isPublic: boolean;
    file_type: string;
    likes: any[];
    tags: Tag[];
    created_at: Date;
    updated_at: Date;
    total_likes: number;
    total_comments: number;
    total_tags: number;
}