<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class PTask extends Model
{
    //
    protected $table = 'p_task';
    public $timestamps = false;
    protected $fillable = [
        'p_task_name', 'p_task_tick', 'personal_id'
    ];
    public function personal(){
        return $this->belongsTo('App\Personal', 'personal_id', 'id');
    }
}
