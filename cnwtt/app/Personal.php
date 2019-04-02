<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Personal extends Model
{
    //
    protected $table = 'personal';
    protected $fillable = [
        'personal_name', 'personal_process',
    ];
    public $timestamps = false;

    public function user(){
        return $this->belongsTo('App\User', 'user_id', 'id');
    }
    public function ptask(){
        return $this->hasMany('App\PTask', 'personal_id', 'id');
    }
}
