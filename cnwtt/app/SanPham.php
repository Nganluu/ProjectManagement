<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class SanPham extends Model
{
    //
    protected $table = 'sanpham';
    public $timestamps = false;

    protected $fillable = [
        'ten', 'soluong'
    ];
}
