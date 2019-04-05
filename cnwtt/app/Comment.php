<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    //
    protected $table = 'comment';
    protected $fillable = [
        'job_id','content','comment_date'
    ];
    public $timestamps = false;
    public function job(){
        return $this->belongsTo('App\Job', 'job_id', 'id');
    }
    public function user(){
        return $this->belongsTo('App\User', 'user_id', 'id');
    }
}
