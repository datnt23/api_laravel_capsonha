<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Quan extends Model
{
    use HasFactory;
    protected $table = 'quan';
    public $timestamps = false;
    protected $primaryKey = 'id';
    protected $fillable = [
        'name',
    ];
    public function getHoSo(): BelongsTo
    {
        return $this->belongsTo(HoSo::class, 'id', 'id_quan');
    }
    public function getPhuong(): HasMany
    {
        return $this->hasMany(Phuong::class, 'id_quan', 'id');
    }
}
