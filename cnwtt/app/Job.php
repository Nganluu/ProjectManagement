<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Job extends Model
{
    //
    protected $table = 'job';
    protected $fillable = [
        'job_name', 'job_process', 'job_outdate', 'start_date', 'end_date', 'done_date', 'job_description',
    ];
    public $timestamps = false;
    public function jobgroup(){
        return $this->belongsTo('App\JobGroup', 'job_group_id', 'id');
    }
    public function user(){
        return $this->belongsToMany('App\User', 'user_job', 'job_id', 'user_id');
    }
    public function comment(){
        return $this->hasMany('App\Comment', 'job_id', 'id');
    }
}
