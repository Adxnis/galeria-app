<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Shared extends Model
{
    protected $table = 'shared';
    protected $guarded = [];
    public $timestamps = false;
    use HasFactory;

    public function user() {
        return $this->belongsTo(User::class);
    }
    
    public function photos() {
        return $this->belongsToMany(Photo::class, 'album_photo');
    }

}
