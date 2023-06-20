<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Phuong extends Model
{
    use HasFactory;
    protected $table = 'phuong';
    protected $primaryKey = 'id';
    public $timestamps = false;
    protected $fillable = [
        'name',
        'id_quan',
    ];
    public function getQuan(): BelongsTo
    {
        return $this->belongsTo(Quan::class, 'id_quan', 'id');
    }
    public function getHoSo(): BelongsTo
    {
        return $this->belongsTo(HoSo::class, 'id', 'id_phuong');
    }
}
