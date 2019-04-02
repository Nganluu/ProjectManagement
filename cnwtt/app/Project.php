<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    //
    protected $table = 'project';
    public $timestamps = false;
    protected $fillable = [
        'project_name',
    ];
    public function jobgroup(){
        return $this->hasMany('App\JobGroup', 'project_id', 'id');
    }

    public function user(){
        return $this->belongsToMany('App\User', 'user_project', 'project_id', 'user_id');
    }
    
}
