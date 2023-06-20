<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

class HoSo extends Model
{
    use HasFactory;

    protected $table = 'ho_so';
    public $timestamps = false;
    public $primaryKey = 'id';
    protected $fillable = [
        'ho_ten_chu_ho',
        'so_to',
        'so_thua',
        'id_phuong',
        'id_quan',
    ];
    public function getQuan(): HasOne
    {
        return $this->hasOne(Quan::class, 'id', 'id_quan');
    }
    public function getPhuong(): HasOne
    {
        return $this->hasOne(Phuong::class, 'id', 'id_phuong');
    }
    public function getChiTietHoSo(): BelongsTo
    {
        return $this->belongsTo(ChiTietHoSo::class, 'id', 'id_hoso');
    }
}
