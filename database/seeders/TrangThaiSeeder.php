<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TrangThaiSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $trang_thais = [
            [
                'id' => 1,
                'ten_trang_thai' => "Đang thụ lý...",
            ],
            [
                'id' => 2,
                'ten_trang_thai' => 'Chờ duyệt...',
            ],
            [
                'id' => 3,
                'ten_trang_thai' => 'Đã có kết quả!',
            ],
            [
                'id' => 4,
                'ten_trang_thai' => "Xử lý lại...",
            ],
        ];
        foreach ($trang_thais as $trang_thai) {
            DB::table('trang_thai')->insert($trang_thai);
        }
    }
}
