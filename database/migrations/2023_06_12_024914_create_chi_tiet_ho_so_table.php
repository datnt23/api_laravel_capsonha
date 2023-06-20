<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('chi_tiet_ho_so', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('id_hoso');
            $table->unsignedBigInteger('id_trang_thai');
            $table->string('noi_dung', 255)->nullable();
            $table->string('toa_do_x', 255)->nullable();
            $table->string('toa_do_y', 255)->nullable();
            $table->string('loi_nhan', 255)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('chi_tiet_ho_so');
    }
};
