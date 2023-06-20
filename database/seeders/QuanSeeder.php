<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class QuanSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $quans = [
            [
                'id' => 1,
                'name' => 'Quận Bình Thạnh',
            ],
            [
                'id' => 2,
                'name' => 'Huyện Nhà Bè',
            ],
            [
                'id' => 3,
                'name' => 'Huyện Củ Chi',
            ],
            [
                'id' => 4,
                'name' => 'Quận Gò Vấp',
            ],
        ];
        foreach ($quans as $quan) {
            DB::table('quan')->insert($quan);
        }
    }
}
