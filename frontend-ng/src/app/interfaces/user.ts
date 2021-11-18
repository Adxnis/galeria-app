import { Album } from "./album";
import { Photo } from "./photo";

export interface User {
    id: number;
    username: string;
    first_name: string;
    last_name: string;
    email: string;
    photos?: Photo[];
    albums?: Album[];
}
