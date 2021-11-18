import { Album } from "./album";

export interface Photo {
    id: number;
    user_id: number;
    name: string;
    file_name: string;
    size: string;
    albums?: Album[];
}
