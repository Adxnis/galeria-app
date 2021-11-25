import { Photo } from "./photo";
export interface Album {
    id: number;
    album_name: string;
    isFavourited: string;
    isShared: boolean;
    photos?: Photo[];
    total_photos: number;
    created_at: Date;
    updated_at: Date;
    total_size: number;
}