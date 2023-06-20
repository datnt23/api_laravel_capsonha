<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\ChiTietHoSoRequest;
use App\Http\Requests\HoSoRequest;
use App\Models\ChiTietHoSo;
use App\Models\HoSo;
use App\Models\TrangThai;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class HoSoController extends Controller
{
    public function index()
    {
        try {
            $ho_so = HoSo::all();
            return response()->json([
                'data' => $ho_so,
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'An error occurred while processing the request!',
            ], 500);
        }
    }
    public function store(HoSoRequest $request)
    {
        try {
            $ho_so = HoSo::create($request->validated());
            $ct_ho_so = ChiTietHoSo::create([
                "id_hoso" => $ho_so->id,
                'id_trang_thai' => 1,
            ]);
            $trang_thai = TrangThai::find($ct_ho_so->id_trang_thai)
                ->ten_trang_thai;
            return response()->json([
                'message' => 'Tạo hồ sơ thành công!',
                'ma_ho_so' => $ho_so->id,
                'trang_thai' => $trang_thai,
            ], 201);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'An error occurred while processing the request!',
            ], 500);
        }
    }
    public function show($id)
    {
        try {
            $ct_ho_so = HoSo::find($id);
            $ct_ho_so->getChiTietHoSo->getTrangThai;
            $ct_ho_so->getPhuong->getQuan;
            return response()->json($ct_ho_so, 200);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'An error occurred while processing the request!',
            ], 500);
        }
    }
    public function getDanhSachChiTietHoSo()
    {
        try {
            $danh_sach_ho_so = HoSo::with('getChiTietHoSo', 'getChiTietHoSo.getTrangThai', 'getQuan', 'getPhuong')
                ->whereHas('getChiTietHoSo', function ($query) {
                    $query->where('id_trang_thai', 4)
                        ->orWhere('id_trang_thai', 1);
                })
                ->get();
            return response()->json($danh_sach_ho_so, 200);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'An error occurred while processing the request!',
            ], 500);
        }
    }
    public function getDanhSachHoSoThuLy()
    {
        try {
            $danh_sach_ho_so = HoSo::with('getChiTietHoSo', 'getChiTietHoSo.getTrangThai', 'getQuan', 'getPhuong')
                ->whereHas('getChiTietHoSo', function ($query) {
                    $query->where('id_trang_thai', 2);
                })
                ->get();
            return response()->json($danh_sach_ho_so, 200);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'An error occurred while processing the request!',
            ], 500);
        }
    }
    public function updateChiTietHoSo(ChiTietHoSoRequest $request, int $id)
    {
        try {
            $chi_tiet_hoso = ChiTietHoSo::find($id);
            $chi_tiet_hoso->update(
                array_merge(
                    $request->validated(),
                    ['id_trang_thai' => 2]
                )
            );
            return response()->json([
                'message' => 'Đã thụ lý!',
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'An error occurred while processing the request!',
            ], 500);
        }
    }
    public function updateTraLaiChiTietHoSo(ChiTietHoSoRequest $request, int $id)
    {
        try {
            $chi_tiet_hoso = ChiTietHoSo::find($id);
            $chi_tiet_hoso->update(
                array_merge(
                    $request->validated(),
                    ['id_trang_thai' => 4]
                )
            );
            return response()->json([
                'message' => 'Xử lý lại!',
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'An error occurred while processing the request!',
            ], 500);
        }
    }
    public function updateKetQuaChiTietHoSo(Request $request, int $id)
    {
        try {
            $chi_tiet_hoso = ChiTietHoSo::find($id);
            $chi_tiet_hoso->update([
                'id_trang_thai' => 3
            ]);
            return response()->json([
                'message' => 'Đã duyệt!',
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => $th,
            ], 500);
        }
    }
    public function update(HoSoRequest $request, int $id)
    {
        try {
            HoSo::find($id)->update($request->validated());
            return response()->json([
                'message' => 'Cập nhật hồ sơ thành công!'
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => $th,
            ], 500);
        }
    }
    public function destroy($id)
    {
        HoSo::find($id)->delete();
        return response()->json([
            'message' => 'Xóa hồ sơ thành công!'
        ], 204);
    }
}
