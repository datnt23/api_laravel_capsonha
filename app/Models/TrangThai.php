<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class TrangThai extends Model
{
    use HasFactory;
    protected $table = 'trang_thai';
    public $timestamps = false;
    protected $primaryKey = 'id';
    protected $fillable = [
        'ten_trang_thai',
    ];
    public function getChiTietHoSo(): BelongsTo
    {
        return $this->belongsTo(ChiTietHoSo::class, 'id', 'id_trang_thai');
    }
}
