<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;
use App\Http\Resources\UserResource;

class UserController extends Controller
{
    public function getUsers() {
        return UserResource::collection(User::all());
    }

    public function getUser($id)
    {
        return new UserResource(User::find($id));
    }
}
