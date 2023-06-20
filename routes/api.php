<?php

use App\Http\Controllers\HoSoController;
use App\Http\Controllers\PhuongController;
use App\Http\Controllers\QuanController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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
//Ho So
Route::prefix('v1')->name('v1')->group(function () {
    // Route::get('/hoso', [HoSoController::class, 'index']);
    // Route::post('/hoso', [HoSoController::class, 'store']);
    // Route::get('/hoso/{id}', [HoSoController::class, 'show']);
    // Route::put('/hoso/{id}/edit', [HoSoController::class, 'edit']);
    // Route::delete('/hoso/{id}/delete', [HoSoController::class, 'destroy']);
    Route::resource('hoso', HoSoController::class);
    Route::get('/danhsachhoso', [HoSoController::class, 'getDanhSachChiTietHoSo']);
    Route::get('/danhsachhosothuly', [HoSoController::class, 'getDanhSachHoSoThuLy']);
    Route::put('/capnhattrangthai/{id}', [HoSoController::class, 'updateChiTietHoSo']);
    Route::put('/capnhatketqua/{id}', [HoSoController::class, 'updateKetQuaChiTietHoSo']);
    Route::put('/tralaihoso/{id}', [HoSoController::class, 'updateTraLaiChiTietHoSo']);
    Route::resource('quan', QuanController::class);
    Route::get('/quan/{id}/phuong', [QuanController::class, 'showPhuong']);
    Route::resource('phuong', PhuongController::class);
    Route::get('/phuong/{id}/quan', [PhuongController::class, 'showQuan']);
});
