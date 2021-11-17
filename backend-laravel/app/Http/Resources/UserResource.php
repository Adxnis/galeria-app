<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
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
            'username' => $this->username,
            'first_name' => $this->first_name,
            'last_name' => $this->last_name,
            'email' => $this->email,
            'email_verified_at' => $this->email_verified_at,
            'profile_picture' => $this->profile_picture,
            'location' => $this->location,
            'isPublic' => $this->isPublic,
            'isNotificationsEnabled' => $this->isNotificationsEnabled,
            'remember_token' => $this->rememberToken,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'total_photos' => $this->totalPhotos,
            'total_albums' => $this->totalAlbums,
            'photos' => $this->photos,
            'albums' => $this->albums,
        ];
    }
}
