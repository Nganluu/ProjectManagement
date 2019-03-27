<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    //
    protected $table = 'comment';
    protected $fillable = [
        'content',
    ];
    public $timestamps = false;
    public function jobgroup(){
        return $this->belongsTo('App\JobGroup', 'job_group_id', 'id');
    }
    public function user(){
        return $this->belongsTo('App\User', 'user_id', 'id');
    }
}
