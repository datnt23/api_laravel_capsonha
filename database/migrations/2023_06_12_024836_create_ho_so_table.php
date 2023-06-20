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
        Schema::create('ho_so', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('ho_ten_chu_ho', 255);
            $table->integer('so_to');
            $table->integer('so_thua');
            $table->unsignedBigInteger('id_phuong');
            $table->unsignedBigInteger('id_quan');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ho_so');
    }
};
