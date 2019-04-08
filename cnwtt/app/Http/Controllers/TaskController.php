<?php

namespace App\Http\Controllers;
use App\Task;
use App\User;
use App\Job;
use App\History;
use Carbon\Carbon;

use Illuminate\Http\Request;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($job_id)
    {
        //
        $project_id = Job::find($job_id)->jobgroup->project->id;
        $admin = auth()->user()->project()->find($project_id)->pivot->user_role == 'admin';
        $job = auth()->user()->job()->find($job_id);      
        // if(!$job || !$admin){
        //     return response()->json([
        //         'success' => false,
        //         'message' => 'Người dùng không nằm trong công việc này và người này không phải admin dự án'
        //     ], 400); 
        // }
        // $task = $job->task;
        // if($task){
        //     return response()->json([
        //         'success' => true,
        //         'data' => $task
        //     ], 200);
           
        // }else{
        //     return response()->json([
        //         'success' => false,
        //         'message' => 'Công việc không có task nào'
        //     ], 500);
        // }
        if($job || $admin){
            $task = Job::find($job_id)->task;
            if($task->count() != null){
                return response()->json([
                    'success' => true,
                    'data' => $task
                ], 200);
            
            }else{
                return response()->json([
                    'success' => false,
                    'message' => 'Công việc không có task nào'
                ], 500);     
            }
        }
        elseif(!$job){
            return response()->json([
                'success' => false,
                'message' => 'Người dùng không nằm trong công việc này'
            ], 400);
        }
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
        $this->validate($request, [
            'task_name' => 'required',
            'job_id' => 'required'
        ]);
        $task = Task::create($request->all());
        if($task){
            // Cập nhật phần trăm job
            $job = $task->job;
            $count =  $job->task()->count();
            $tick = 0;
            foreach($job->task as $task_tick){
                if($task_tick->task_tick == 1){
                    $tick++;
                }
            }
            if($tick == $count){
                $job->job_process = 100;
                $job->save();
            }
            else{
                $job->job_process = (int)($tick/$count*100);
                $job->save();
            }       
            // Cập nhật phần trăm job_group
            $job_group = $task->job->jobgroup;
            $count = 0;
            foreach($job_group->job as $job){
                $count += $job->task()->count();
            }
            $tick = 0;
            foreach($job_group->job as $job){
                foreach($job->task as $task_tick){
                    if($task_tick->task_tick == 1){
                        $tick++;
                    }
                }
            }
            if($tick == $count){
                $job_group->job_group_process = 100;
                $job_group->save();
            }
            else{
                $job_group->job_group_process = (int)($tick/$count*100);
                $job_group->save();
            }   
            // Chèn vào bảng lịch sử  
            $history = new History();
            $history->content = auth()->user()->name . " đã thêm Task: " . $task->task_name . ", Thời gian: " . Carbon::now();
            $history->job_id = $request['job_id'];
            $history->save();
            return response()->json([
                'success' => true,
                'data' => $task
            ], 201);
        }else{
            return response()->json([
                'success' => false,
                'message' => 'Không thể tạo mới task'
            ], 500);
        }

    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
        $task = Task::find($id);
        if($task){
            return response()->json([
                'success' => true,
                'data' => $task
            ], 200);
        }else{
            return response()->json([
                'success' => false,
                'message' => 'Không tìm thấy task'
            ], 400);
        }
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
        $task = Task::find($id);
        $task_name_old = $task->task_name;
        $updated = $task->update($request->all());
        if($updated){
            $job = $task->job;
            $count =  $job->task()->count();
            $tick = 0;
            foreach($job->task as $task_tick){
                if($task_tick->task_tick == 1){
                    $tick++;
                }
            }
            if($tick == $count){
                $job->job_process = 100;
                $job->save();
            }
            else{
                $job->job_process = (int)($tick/$count*100);
                $job->save();
            }       
            // Cập nhật phần trăm job_group
            $job_group = $task->job->jobgroup;
            $count = 0;
            foreach($job_group->job as $job){
                $count += $job->task()->count();
            }
            $tick = 0;
            foreach($job_group->job as $job){
                foreach($job->task as $task_tick){
                    if($task_tick->task_tick == 1){
                        $tick++;
                    }
                }
            }
            if($tick == $count){
                $job_group->job_group_process = 100;
                $job_group->save();
            }
            else{
                $job_group->job_group_process = (int)($tick/$count*100);
                $job_group->save();
            }   

            if($request['task_name']){
                 // Chèn vào bảng lịch sử  
                $history = new History();
                $history->content = auth()->user()->name . " đã sửa Task: " . $task_name_old . " thành Task: " . $task->task_name . " Thời gian: " . Carbon::now();
                $history->job_id = $job->id;
                $history->save();
            }
            if($request['task_tick'] == 1){
                // Chèn vào bảng lịch sử  
                $history = new History();
                $history->content = auth()->user()->name . " đã tick vào Task: " . $task->task_name . " Thời gian: " . Carbon::now();
                $history->job_id = $job->id;
                $history->save();
           }
           if($request['task_tick'] == 0){
                // Chèn vào bảng lịch sử  
                $history = new History();
                $history->content = auth()->user()->name . " đã bỏ tick ở Task: " . $task->task_name . " Thời gian: " . Carbon::now();
                $history->job_id = $job->id;
                $history->save();
            }

            return response()->json([
                'success' => true,
                'data' => $task
            ], 200);

        }
        return response()->json([
            'success' => false,
            'message' => 'task không được cập nhật'
        ], 500);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
        $task = Task::find($id);
        if(!$task){
            return response()->json([
                'success' => false,
                'message' => 'Không tìm thấy task'
            ], 400);
        }
        if($task->delete()){
            $job = $task->job;
            $count =  $job->task()->count();
            $tick = 0;
            foreach($job->task as $task_tick){
                if($task_tick->task_tick == 1){
                    $tick++;
                }
            }
            if($tick == $count){
                $job->job_process = 100;
                $job->save();
            }
            else{
                $job->job_process = (int)($tick/$count*100);
                $job->save();
            }       
            // Cập nhật phần trăm job_group
            $job_group = $task->job->jobgroup;
            $count = 0;
            foreach($job_group->job as $job){
                $count += $job->task()->count();
            }
            $tick = 0;
            foreach($job_group->job as $job){
                foreach($job->task as $task_tick){
                    if($task_tick->task_tick == 1){
                        $tick++;
                    }
                }
            }
            if($tick == $count){
                $job_group->job_group_process = 100;
                $job_group->save();
            }
            else{
                $job_group->job_group_process = (int)($tick/$count*100);
                $job_group->save();
            }   

            // Chèn vào bảng lịch sử  
            $history = new History();
            $history->content = auth()->user()->name . " đã xóa Task: " . $task->task_name . " Thời gian: " . Carbon::now();
            $history->job_id = $job->id;
            $history->save();


            return response()->json([
                'success' => true,
                'message' => 'Đã xóa task thành công'
            ], 200);
        }else{
            return response()->json([
                'success' => false,
                'message' => 'Xóa task thất bại'
            ], 500);
            
        }
        
    }
}
