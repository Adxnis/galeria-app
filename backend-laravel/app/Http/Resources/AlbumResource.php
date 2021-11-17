<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class AlbumResource extends JsonResource
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
            'album_name' => $this->album_name,
            'isFavourited' => $this->isFavourited,
            'isShared' => $this->isShared,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'total_photos' => $this->totalPhotos,
            'photos' => $this->photos
        ];
    }
}
