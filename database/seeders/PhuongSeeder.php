<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PhuongSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $phuongs = [
            [
                'id' => 1,
                'name' => 'Phường 1',
                'id_quan' => 1,
            ],
            [
                'id' => 2,
                'name' => 'Phường 2',
                'id_quan' => 1,
            ],
            [
                'id' => 3,
                'name' => 'Phường 11',
                'id_quan' => 1,
            ],
            [
                'id' => 4,
                'name' => 'Phường 10',
                'id_quan' => 4,
            ],
            [
                'id' => 5,
                'name' => 'Phường 5',
                'id_quan' => 4,
            ],
            [
                'id' => 6,
                'name' => 'Phường Hiệp Phước',
                'id_quan' => 2,
            ],
            [
                'id' => 7,
                'name' => 'Xã Phú Xuân',
                'id_quan' => 2,
            ],
            [
                'id' => 8,
                'name' => 'Thị trấn Nhà Bè',
                'id_quan' => 2,
            ],
            [
                'id' => 9,
                'name' => 'Xã An Nhơn Tây',
                'id_quan' => 3,
            ],
            [
                'id' => 10,
                'name' => 'Xã Bình Mỹ',
                'id_quan' => 3,
            ],

        ];
        foreach ($phuongs as $phuong) {
            DB::table('phuong')->insert($phuong);
        }
    }
}
