<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Job extends Model
{
    //
    protected $table = 'job';
    protected $fillable = [
        'job_name', 'job_done',
    ];
    public $timestamps = false;
    public function jobgroup(){
        return $this->belongsTo('App\JobGroup', 'job_group_id', 'id');
    }
    public function user(){
        return $this->belongsTo('App\User', 'user_id', 'id');
    }
}
