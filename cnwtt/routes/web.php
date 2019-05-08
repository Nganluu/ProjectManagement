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
    echo $comment->job->job_name;
    echo $comment->user->name;
});

//test model jobgroup
route::get('jobgroup/test', function(){
    $jobgroup = App\JobGroup::find(2);
    foreach($jobgroup->job as $job){
        echo $job->job_name . "<br>";
    }
    echo $jobgroup->project->project_name;
});

//test model job
route::get('job/test', function(){
    $job = App\Job::find(3);
    echo $job->jobgroup->job_group_name;
    foreach($job->user as $user){
        echo $user->name;
    }
    foreach($job->comment as $comment){
        echo $comment->content;
    }
    $job->user()->attach(5);
    echo "Thành công";
});


//test model user
route::get('user/test', function(){
    $user = App\User::find(1);
    // var_dump($user);
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
    // App\User::find(1)->project()->attach(5, ['user_role' => 'user']);
    // App\User::find(2)->job()->attach(4);


});


//test model project
route::get('project/test', function(){
    $project = App\Project::find(1);
    foreach($project->jobgroup as $jobgroup){
        echo $jobgroup->job_group_name;
    }
    foreach($project->user as $user){
        echo $user->name;
    }
    $project->user()->attach(6, ['user_role' => 'user']);
});

//test model Personal

route::get('personal/test', function(){
    $personal = App\Personal::find(1);
    echo $personal->user->name;
    foreach($personal->ptask as $ptask){
        echo $ptask->p_task_name;
    }
});

// test model PTask
route::get('ptask/test', function(){
    $ptask = App\PTask::find(2);
    echo $ptask->personal->personal_name;
    echo $ptask->personal->user_id;
    echo $ptask->personal->personal_process;
});

//test model task
route::get('task/test', function(){
    $task = App\Task::find(1);
    echo $task->job->job_description;
});

//test api

route::get('sanpham/insert', function(){
    DB::table('sanpham')->insert([
        ['ten' => 'oppo', 'soluong' => 100],
        ['ten' => 'nokia', 'soluong' => 200],
        ['ten' => 'samsung', 'soluong' => 300],
    ]);
});


// test 

route::get('count', function(){
    $personal = App\Personal::find(2);
        $count = $personal->ptask()->count();
        echo $count;
        $tick = 0;
        foreach($personal->ptask as $p_task_tick){
            if($p_task_tick->p_task_tick == 1){
                $tick++;
            }
        }
        echo $tick;
        if($tick == $count){
            $personal->personal_process = 100;
            $personal->save();
        }
        else{
            $personal->personal_process = (int)($tick/$count*100);
            $personal->save();
        }
        return response()->json([
            $personal
        ]);
});

//test user_role
route::get('test/role', functioN(){
    $project_id = App\Job::find(3)->jobgroup->project->id;
    // echo $project_id->project->id;
    echo $project_id;
}); 

//test count
route::get('test/countxx', function(){
    $job_group = App\JobGroup::find(2);
    // echo $job_group->job()->task()->count();
    $count = 0;
    foreach($job_group->job as $job){
        echo $job->task()->count();
    }
}); 

//test email
route::get('test/email', function(){
    // $user = App\User::where('email', 'phuongx@gmail.com')->get();
    // if($user->count() == 0){
    //     echo "Khong co";
    // }
    // foreach($user as $u){
    //    if($u){
    //        echo "Co nguoi";
    //    }else{
    //        echo "khong co nguoi";
    //    }
    // }
    $user = App\User::find(2);
    if($user->job()->find(1)){
        echo "kaka";
    }
    else{
        echo "heheh";
    }
    
    
});
use Carbon\Carbon;
route::get('test/history', function(){
    // $history = new App\History();
    $task = App\Task::find(1);
    // $history->content = (string)App\User::find(1)->name + " đã thêm task " + (string)$task->name + ", thời gian:" + (string)Carborn::now();
    // $history->job_id = 1;
    // $history->save();
    // $history->content = "lala" + $task->name;
    // $history->job_id = 1;
    // $history->save();
    // echo "thêm lịch sử thành công";
    echo "lala " . $task->task_name;
});
route::get('testabc', function(){
    $users = App\User::where('email', 'phuong1@gmail.com')->get();
    echo $users->count();
});
route::get('testcommentjob', function(){
    $job = App\Job::find(1);
    $comment = $job->comment;
  
    foreach($comment as $cmt){
        $cmt->user_akakka = "Anh";
    }
    echo $comment;
});






