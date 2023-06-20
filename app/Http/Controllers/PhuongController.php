<?php

namespace App\Http\Controllers;

use App\Models\ChiTietHoSo;
use App\Models\Phuong;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class PhuongController extends Controller
{
    public function index()
    {
        try {
            $phuong = Phuong::all();
            return response()->json([
                'data' => $phuong,
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => $th,
            ], 500);
        }
    }
    public function showQuan($id)
    {
        try {
            $phuong = Phuong::find($id)->getQuan;
            return response()->json([
                'data' => $phuong,
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => $th,
            ], 500);
        }
    }
    public function show($id)
    {
        try {
            $phuong = Phuong::find($id);
            return response()->json([
                'data' => $phuong,
            ], 200);
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
                'id_quan' => 'required|integer',
            ]);
            if ($validator->fails()) {
                return response()->json([
                    'error' => $validator->errors(),
                    'message' => $validator->messages(),
                ], 422);
            } else {
                Phuong::create([
                    'name' => $request->name,
                    'id_quan' => $request->id_quan,
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
    public function update(Request $request, int $id)
    {
        try {
            $validator = Validator::make($request->all(), [
                'name' => 'required|string|max:255',
                'id_quan' => 'required|integer',
            ]);
            if ($validator->fails()) {
                return response()->json([
                    'error' => $validator->errors(),
                    'message' => $validator->messages(),
                ], 422);
            } else {
                Phuong::find($id)->update([
                    'name' => $request->name,
                    'id_quan' => $request->id_quan,
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
            Phuong::find($id)->delete();
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
