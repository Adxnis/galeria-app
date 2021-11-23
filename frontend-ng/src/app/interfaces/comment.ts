export interface Comment {
    id: number;
    username: string;
    photo_id: number;
    user_id: number;
    body: string;
    created_at: Date;
    updated_at: Date;
}