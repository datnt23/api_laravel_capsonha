<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class ChiTietHoSo extends Model
{
    use HasFactory;
    protected $table = 'chi_tiet_ho_so';
    public $timestamps = false;
    public $primaryKey = 'id';
    protected $fillable = [
        'id_hoso',
        'id_trang_thai',
        'noi_dung',
        'toa_do_x',
        'toa_do_y',
        'loi_nhan',
    ];
    public function getHoSo(): HasOne
    {
        return $this->hasOne(HoSo::class, "id", "id_hoso");
    }
    public function getTrangThai(): HasOne
    {
        return $this->hasOne(TrangThai::class, "id", "id_trang_thai");
    }
}
