<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class JobGroup extends Model
{
    //
    protected $table = 'job_group';
    protected $fillable = [
        'job_group_name', 'job_group_status', 'job_group_process',
    ];
    public $timestamps = false;
    public function project(){
        return $this->belongsTo('App\Project', 'project_id', 'id');
    }
    public function job(){
        return $this->hasMany('App\Job', 'job_group_id', 'id');
    }
    public function comment(){
        return $this->hasMany('App\Comment', 'job_group_id', 'id');
    }
}
