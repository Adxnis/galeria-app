<?php

namespace App\Http\Controllers;
use App\Models\Album;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;
use App\Http\Resources\AlbumResource;
class AlbumController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $albums = Album::where('isShared', "=" ,null)->get();
        return AlbumResource::collection($albums->load('photos'));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {

        $album = Album::create([
            'user_id' => Auth::user()->id,
            'album_name' => $request->input('album_name'),
            'isFavourited' => $request->input('isFavourited'),
            'isShared' => $request->input('isShared')
        ]);

        $album->photos()->attach($request->input('photos'));
        return \response(new AlbumResource($album), Response::HTTP_CREATED);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return new AlbumResource(Album::find($id)->load('photos'));
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
        $album = Album::find($id);
        $album->update($request->only('album_name'));
        $album->photos()->sync($request->input('photos'));
        return \response(new AlbumResource($album), Response::HTTP_ACCEPTED);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        Album::destroy($id);
        return \response(null, Response::HTTP_NO_CONTENT);
    }


    public function getUserAlbums() {
        $user_id = Auth::user()->id;
        $albums = Album::where('user_id', "=" ,$user_id)->where('isShared', "=" ,null)->get();
        return AlbumResource::collection($albums);
    }

    public function getSharedAlbums() {
        $user_id = Auth::user()->id;
        $albums = Album::join('shared', 'album.id', '=', 'shared.album_id')
        ->select('album.*')
        ->where('owner_id', $user_id)
        ->where('isShared', 1)
        ->orWhere(function($query) {
            $user_id = Auth::user()->id;
            $query->where('shared_person_id', $user_id)
            ->where('isShared', 1);
        })->get();
        return AlbumResource::collection($albums);
    }
}
