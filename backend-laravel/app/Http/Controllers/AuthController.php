<?php

namespace App\Http\Controllers;

use App\Http\Requests\RegisterRequest;
use App\Http\Requests\UpdateInfoRequest;
use App\Http\Requests\UpdatePasswordRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;
use App\Http\Resources\UserResource;


class AuthController extends Controller
{

    public function register(RegisterRequest $request) {
        $user = User::create([
            'username' => $request->input('username'),
            'first_name' => $request->input('first_name'),
            'last_name' => $request->input('last_name'),
            'email' => $request->input('email'),
            'password' => Hash::make($request->input("password"))
        ]);

        return response($user, Response::HTTP_CREATED);
    }

    public function login(Request $request) {
        if(!Auth::attempt($request->only('username', 'password'))) {
            return \response([
                'error' => "Invalid Credentials!"
            ], Response::HTTP_UNAUTHORIZED);
        }

        /** @var User $user */
        $user = Auth::user();

        // JWT Token
        $jwt = $user->createToken('token')->plainTextToken;

        $cookie = cookie('jwt', $jwt, 60*24);

        // Remember me 
        // Auth::login($user, true);

        return \response([
            'jwt' => $jwt
        ])->withCookie($cookie);
    }


    public function user(Request $request) {
        $user = $request->user();
        return new UserResource(($user)->load('photos', 'albums'));
    }


    public function logout(Request $request) {
        $cookie = \Cookie::forget('jwt');

        return \response([
            'message' => 'success'
        ])->withCookie($cookie);

    }


    public function updateInfo(UpdateInfoRequest $request) {
        $user = $request->user();

        $user->update($request->only('first_name', 'last_name', 'email'));

        return \response($user, Response::HTTP_ACCEPTED);
    }

    public function updatePassword(UpdatePasswordRequest $request) {
        $user = $request->user();

        $user->update([
            'password' => Hash::make($request->input('password'))
        ]);

        return \response($user, Response::HTTP_ACCEPTED);

    }

}
