<?php

namespace App\Http\Controllers;
use App\JobGroup;
use App\Job;

use Illuminate\Http\Request;

class JobController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($job_group_id)
    {
        //
        $job_group = JobGroup::find($job_group_id);
        if(!$job_group){
            return response()->json([
                'success' => false,
                'message' => "Không tìm thấy nhóm công việc"
            ], 400);
        }
        $job = $job_group->job;
        if($job->count() != 0){
            return response()->json([
                'success' => true,
                'data' => $job
            ], 200);
        }else{
            return response()->json([
                'success' => false,
                'message' => 'Không có công việc nào để hiển thị'
            ], 500);
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
            'job_name' => 'required',
            'start_date' => 'required',
            'end_date' => 'required',
            'job_group_id' => 'required'
        ]);
        $project_id = JobGroup::find($request['job_group_id'])->project->id;
        $admin = auth()->user()->project()->find($project_id)->pivot->user_role == 'admin';  
        
        if($admin){
            $job = Job::create($request->all());
            if($job){
                return response()->json([
                    'success' => true,
                    'data' => $job
                ], 201);
            }else{
                return response()->json([
                    'success' => false,
                    'message' => 'Công việc không được thêm'
                ], 500);
            }
        }else{
            return response()->json([
                'success' => false,
                'message' => 'Không có quyền thêm công việc'
            ]);
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
        $job = Job::find($id);
        if($job){
            return response()->json([
                'success' => true,
                'data' => $job
            ], 200);
        }else{
            return response()->json([
                'success' => false,
                'message' => 'Không tìm thấy công việc'
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
        $project_id = Job::find($id)->jobgroup->project->id;
        $admin = auth()->user()->project()->find($project_id)->pivot->user_role == 'admin'; 

        if($admin){
            $job = Job::find($id);
            if(!$job){
                return response()->json([
                    'success' => false,
                    'message' => 'Không tìm thấy công việc'
                ], 400);
            }
            $updated = $job->update($request->all());
            if($updated){
                return response()->json([
                    'success' => true,
                    'data'=> $job
                ], 200);
            }else{
                return response()->json([
                    'success' => false,
                    'message' => 'Công việc không được cập nhật'
                ], 500);
            }
        }else{
            return response()->json([
                'success' => false,
                'message' => 'Không có quyền sửa'
            ]);
        }

      
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
        $project_id = Job::find($id)->jobgroup->project->id;
        $admin = auth()->user()->project()->find($project_id)->pivot->user_role == 'admin'; 
        if($admin){
            $job = Job::find($id);
            if(!$job){
                return response()->json([
                    'success' => false,
                    'message' => 'Không tìm thấy công việc'
                ], 400);
            }else{
                $job->task()->delete();
                if($job->delete()){
                    return response()->json([
                        'success' => true,
                        'message' => 'Đã xóa công việc'
                    ], 200);
                }else{
                    return response()->json([
                        'success' => false,
                        'message' => 'Không xóa được công việc'
                    ], 500);
                }
            }
        }else{
            return response()->json([
                'success' => false,
                'message' => 'Không có quyền xóa công việc' 
            ]);
        }
       
    }
    public function showHistory($id){
        $job = Job::find($id);
        $history = $job->history;
        if($history->count() != 0){
            return response()->json([
                'success' => true,
                'data' => $history
            ], 200);
        }else{
            return response()->json([
                'success' => false,
                'message' => 'Chưa có lịch sử'
            ], 400);
        }
    }
}
