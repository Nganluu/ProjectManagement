<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Passport\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens,Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password',
    ];
    public $timestamps = false;

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];
    public function comment(){
        return $this->hasMany('App\Comment', 'user_id', 'id');
    }
    public function project(){
        return $this->belongsToMany('App\Project', 'user_project', 'user_id', 'project_id')->withPivot('user_role');
    }
    public function job(){
        return $this->belongsToMany('App\Job', 'user_job', 'user_id', 'job_id');
    }
    public function personal(){
        return $this->hasMany('App\Personal', 'user_id', 'id');
    }
    
}
