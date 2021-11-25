import { Album } from "./album";
import { Photo } from "./photo";

export interface User {
    id: number;
    username: string;
    first_name: string;
    last_name: string;
    email: string;
    location: string;
    photos?: Photo[];
    albums?: Album[];
    created_at: Date;
    updated_at: Date;
    total_photos: number;
    total_albums: number;
    isNotificationsEnabled: boolean;
    isPublic: boolean;
    profile_picture: string;

}
