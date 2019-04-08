<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class History extends Model
{
    //
    protected $table = 'history';
    protected $fillable = [
        'content', 'job_id'
    ];
    public $timestamps = false;
    
    public function job(){
        return $this->belongsTo('App\Job', 'job_id', 'id');
    }
}
