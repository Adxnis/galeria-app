import { Photo } from "./photo";

export interface Tag {
    title: string;
    photos?: Photo[];
}