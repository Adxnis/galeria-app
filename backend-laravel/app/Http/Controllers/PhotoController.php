<?php

namespace App\Http\Controllers;

use App\Models\Photo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;
use App\Http\Resources\PhotoResource;

class PhotoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {




        
        return PhotoResource::collection(Photo::all()); 

    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
    
        $photo = Photo::create([
            'user_id' => Auth::user()->id,
            'name' => $request->input('name'),
            'file_name' => $request->input('file_name'),
            'size' => $request->input('size'),
            // 'date_last_modified' => $request->input('date_last_modified'),
            'file_type'=> $request->input('file_type'),
            'isPublic' => $request->input('isPublic'),
        ]);
        $photo->albums()->attach($request->input('albums'));
        $photo->albums()->attach($request->input('tags'));
        return \response(new PhotoResource($photo), Response::HTTP_CREATED);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
        return new PhotoResource(Photo::find($id));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
        $photo = Photo::find($id);
        $photo ->update($request->only('name'));
        return \response(new PhotoResource($photo), Response::HTTP_ACCEPTED);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
        Photo::destroy($id);
        return \response(null, Response::HTTP_NO_CONTENT);
    }

    public function getUserPhotos(Request $request) {

        $user_id = Auth::user()->id;
        $photos = Photo::where('user_id', "=" ,$user_id)->get();
        return PhotoResource::collection($photos);
    }

    public function searchByTags($tagQuery) {
        $photos = Photo::join('photo_tag', 'photo.id', '=', 'photo_tag.photo_id')
        ->join('tag', 'tag.id', '=', 'photo_tag.tag_id')
        ->select('photo.*')
        // ->where("isPublic", 1)
        ->where('title', 'like', '%'.$tagQuery.'%')
        ->get();

        return PhotoResource::collection($photos);
    }
}
