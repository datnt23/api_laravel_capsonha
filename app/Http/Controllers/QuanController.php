<?php

namespace App\Http\Controllers;

use App\Models\Quan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class QuanController extends Controller
{
    public function index()
    {
        try {
            $quan = Quan::all();
            return response()->json(
                $quan,
                200
            );
        } catch (\Throwable $th) {
            return response()->json([
                'message' => $th,
            ], 500);
        }
    }
    public function store(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'name' => 'required|string|max:255',
            ]);
            if ($validator->fails()) {
                return response()->json([
                    'error' => $validator->errors(),
                    'message' => $validator->messages(),
                ], 422);
            } else {
                Quan::create([
                    'name' => $request->name,
                ]);
                return response()->json([
                    'message' => 'Created!',
                ], 201);
            }
        } catch (\Throwable $th) {
            return response()->json([
                'message' => $th,
            ], 500);
        }
    }
    public function show($id)
    {
        try {
            $quan = Quan::find($id);
            return response()->json([
                'data' => $quan,
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => $th,
            ], 500);
        }
    }
    public function showPhuong($id)
    {
        try {
            $phuong = Quan::find($id)->getPhuong;
            return response()->json(
                $phuong,
                200
            );
        } catch (\Throwable $th) {
            return response()->json([
                'message' => $th,
            ], 500);
        }
    }
    public function update(Request $request, int $id)
    {
        try {
            $validator = Validator::make($request->all(), [
                'name' => 'required|string|max:255',
            ]);
            if ($validator->fails()) {
                return response()->json([
                    'error' => $validator->errors(),
                    'message' => $validator->messages(),
                ], 422);
            } else {
                Quan::find($id)->update([
                    'name' => $request->name,
                ]);
                return response()->json([
                    'message' => 'Updated!',
                ], 201);
            }
        } catch (\Throwable $th) {
            return response()->json([
                'message' => $th,
            ], 500);
        }
    }
    public function destroy($id)
    {
        try {
            Quan::find($id)->delete();
            return response()->json([
                'message' => 'Deleted!',
            ], 201);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => $th,
            ], 500);
        }
    }
}
