<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;

class PassportController extends Controller
{
    //
    public function register(Request $request){
        $this->validate($request, [
            'name' => 'required',
            'email' => 'required|email',
            'password' => 'required',
        ]);
        $users = User::all();
        foreach($users as $user){
            if($user->email == $request->email){
                return response()->json([
                    'success' => false,
                    'message' => 'Email đã tồn tại'
                ]);
            }
        }
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password)
        ]);
        $token = $user->createToken('cnwtt')->accessToken;
        return response()->json([
            'success' => true, 
            'token' => $token
        ], 200);
    }

    public function login(Request $request){
        $info = [
            'email' => $request->email,
            'password' => $request->password
        ];
        if(auth()->attempt($info)){
            $token = auth()->user()->createToken('cnwtt')->accessToken;
            $user = auth()->user();
            return response()->json([
                'succes' => true,
                'token' => $token,
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
            ], 200);
        }else{
            return response()->json([
                'succes' => false
            ], 401);
        }
    }
    // public function details(){
    //     return response()->json(['user' => auth()->user()], 200);
    // }
    
}
