<?php

namespace App\Http\Controllers;

use App\Models\Photo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;
use App\Http\Resources\PhotoResource;

class DiscoveryController extends Controller
{
    /**
     * Display a listing of the resource where
     * images are public
     *
     * @return \Illuminate\Http\Response
     */
    public function index(){
        $photos = Photo::where('isPublic', 1)->get();
        $photos->load('user');
        return PhotoResource::collection($photos);
    }

    public function hidePhotos() {
        $photos = Photo::where('user_id', Auth::user()->id)
        ->update(['isPublic' => false]);

        return \response($photos, Response::HTTP_ACCEPTED);
    }

    public function showPhotos() {
        $photos = Photo::where('user_id', Auth::user()->id)
        ->update(['isPublic' => true]);
        return \response($photos, Response::HTTP_ACCEPTED);
    }
}
