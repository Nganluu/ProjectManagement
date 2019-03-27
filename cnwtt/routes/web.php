<?php



/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});
// test model comment
route::get("comment/test", function(){
    $comment = App\Comment::find(3);
    echo $comment->jobgroup->job_group_name;
    echo $comment->user->name;
});

//test model jobgroup
route::get('jobgroup/test', function(){
    $jobgroup = App\JobGroup::find(2);
    foreach($jobgroup->comment as $comment){
        echo $comment->content . "<br>";
    }
    foreach($jobgroup->job as $job){
        echo $job->job_name . "<br>";
    }
    echo $jobgroup->project->project_name;
});

//test model job
route::get('job/test', function(){
    $job = App\Job::find(1);
    echo $job->jobgroup->job_group_name;
    echo $job->user->name;
});


//test model user
route::get('user/test', function(){
    $user = App\User::find(1);
    var_dump($user);
    foreach($user->comment as $comment){
        echo $comment->content . "<br>";
    }
    foreach($user->job as $job){
        echo $job->job_name . "<br>";
    }
    foreach($user->project as $project)
    {
        echo $project->project_name;
    }
    App\User::find(1)->project()->attach(5, ['user_role' => 'user']);


});


//test mode project
route::get('project/test', function(){
    $project = App\Project::find(1);
    foreach($project->jobgroup as $jobgroup){
        echo $jobgroup->job_group_name;
    }
    foreach($project->user as $user){
        echo $user->name;
    }
    App\Project::find(1)->user()->attach(6, ['user_role' => 'user']);
});

//test api

route::get('sanpham/insert', function(){
    DB::table('sanpham')->insert([
        ['ten' => 'oppo', 'soluong' => 100],
        ['ten' => 'nokia', 'soluong' => 200],
        ['ten' => 'samsung', 'soluong' => 300],
    ]);
});






