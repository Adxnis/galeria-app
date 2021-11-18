import { Photo } from "./photo";
export interface Album {
    album_name: string;
    isFavourited: string;
    isShared: string;
    photos?: Photo[];
}