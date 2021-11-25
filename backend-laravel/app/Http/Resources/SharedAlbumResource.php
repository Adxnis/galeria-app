<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class SharedAlbumResource extends JsonResource
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
            "id"=>$this->id,
            "album_id"=>$this->album_id,
            "owner_id"=>$this->owner_id,
            "shared_person_id"=>$this->shared_person_id,
            "photos"=>$this->photos,
            'user'=>$this->user
        ];
    }
}
