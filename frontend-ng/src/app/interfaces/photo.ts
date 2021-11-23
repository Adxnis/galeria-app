import { Album } from "./album";
import { Tag } from "./tag";
import { Comment } from "./comment";

export interface Photo {
    id: number;
    user_id: number;
    name: string;
    file_name: string;
    size: string;
    file_type: string;
    created_at: Date;
    updated_at: Date;

    total_likes: number;
    total_comments: number;
    total_tags: number;

    isPublic: boolean;

    albums?: Album[];
    likes: any[];
    tags: Tag[];
    comments: Comment[];

}