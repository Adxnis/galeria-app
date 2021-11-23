<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class PhotoResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'user_id' => $this->user_id,
            'name' => $this->name,
            'file_name' => $this->file_name,
            'size' => $this->size,
            'file_type' => $this->file_type,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'total_likes' => $this->totalLikes,
            'total_comments' => $this->totalComments,
            'total_tags' => $this->totalTags,
            'isPublic' => $this->isPublic,
            'albums' => $this->albums,
            'likes' => $this->likes,
            'comments' => $this->comments,
            'tags' => $this->tags,
            'user' => $this->user
        ];
    }
}

// public function toArray($request)
// {
//     return [
//         'id' => $this->id,
//         'name' => $this->name,
//         'email' => $this->email,
//         'total' => $this->total,
//         'order_items' => OrderItemResource::collection($this->whenLoaded('orderItems'))

//     ];
// }
