<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    //
    protected $table = 'task';
    public $timestamps = false;
    protected $fillable = [
        'task_name', 'task_tick',
    ];
    public function job(){
        return $this->belongsTo('App\Job', 'job_id', 'id');
    }
}
