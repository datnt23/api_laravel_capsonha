<?php

use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\HoSoController;
use App\Http\Controllers\PhuongController;
use App\Http\Controllers\QuanController;
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::controller(AuthController::class)->group(function () {
    Route::post('register', 'register');
    Route::post('login', 'login');
});
Route::middleware(['auth:sanctum', 'role:user'])->prefix('user')->group(function () {
    Route::resource('hoso', HoSoController::class);
    Route::resource('quan', QuanController::class);
    Route::get('/quan/{id}/phuong', [QuanController::class, 'showPhuong']);
    Route::resource('phuong', PhuongController::class);
    Route::get('/phuong/{id}/quan', [PhuongController::class, 'showQuan']);
});
Route::middleware(['auth:sanctum', 'role:chuyen_vien'])->prefix('chuyen_vien')->group(function () {
    Route::get('/danhsachhoso', [HoSoController::class, 'getDanhSachChiTietHoSo']);
    Route::put('/capnhattrangthai/{id}', [HoSoController::class, 'updateChiTietHoSo']);
});
Route::middleware(['auth:sanctum', 'role:truong_phong'])->prefix('truong_phong')->group(function () {
    Route::get('/danhsachhosothuly', [HoSoController::class, 'getDanhSachHoSoThuLy']);
    Route::put('/capnhatketqua/{id}', [HoSoController::class, 'updateKetQuaChiTietHoSo']);
    Route::put('/tralaihoso/{id}', [HoSoController::class, 'updateTraLaiChiTietHoSo']);
});
