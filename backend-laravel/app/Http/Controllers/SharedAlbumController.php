<?php

namespace App\Http\Controllers;

use App\Models\Shared;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;
use App\Http\Resources\SharedAlbumResource;

class SharedAlbumController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return SharedAlbumResource::collection(Shared::all());
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $sharedAlbum = Shared::create([
            'album_id' => $request->input('album_id'),
            'owner_id' => Auth::user()->id,
            'shared_person_id' => $request->input('shared_person_id'),
        ]);

        $sharedAlbum->photos()->attach($request->input('photos'));
        return \response($sharedAlbum, Response::HTTP_CREATED);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request, $id)
    {
        return Shared::find($id);
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
        $album = Shared::find($id);
        $album->update($request->only('album_name'));
        $album->photos()->sync($request->input('photos'));
        return \response($album, Response::HTTP_ACCEPTED);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        Shared::destroy($id);
        return \response(null, Response::HTTP_NO_CONTENT);
    }
}
