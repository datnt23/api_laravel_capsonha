<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Spatie\Permission\Models\Role;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|max:191',
            'email' => 'required|email:200',
            'password' => 'required|min:6',
            'c_password' => 'required|same:password',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'validation_errors' => $validator->messages(),
            ]);
        } else {
            $input = $request->all();
            $input['password'] = bcrypt($input['password']);
            $user = User::create($input);
            $success['token'] = $user->createToken('MyApp')->plainTextToken;
            $success['name'] = $user->name;
            $user->assignRole('user');

            return response()->json([
                'success' => true,
                'data' => $success,
                'message' => 'Registered Successfully',
            ], 200);
        }
    }

    public function login(Request $request)
    {

        if (Auth::attempt(['email' => $request->email, 'password' => $request->password])) {
            $user = Auth::user();
            $success['token'] = $user->createToken('MyApp')->plainTextToken;
            $success['name'] = $user->name;
            $role = $user->getRoleNames();
            $roleId = Role::whereIn('name', $role)->pluck('id');
            $success['role'] = [
                'name' => $role,
                'id' => $roleId,
            ];
            return response()->json([
                'success' => true,
                'data' => $success,
                'message' => 'Login Successfully',
            ], 200);
        } else {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorised!',
            ]);
        }
    }
}
