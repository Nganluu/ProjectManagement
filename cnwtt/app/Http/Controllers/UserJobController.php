<?php

namespace App\Http\Controllers;
use App\User;
use App\Job;

use Illuminate\Http\Request;

class UserJobController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($job_id)
    {
        //
        $job = Job::find($job_id);
        if(!$job){
            return response()->json([
                'success' => false,
                'message' => 'Không tồn tại công việc'
            ], 400);
        }
        $user = $job->user;
        if($user->count() != 0){
            return response()->json([
                'success' => true,
                'data' => $user
            ], 200);
        }else{
            return response()->json([
                'success' => false,
                'message' => 'Công việc không có người nào để hiển thị'
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
            'user_id' => 'required',
            'job_id' => 'required'
        ]);
        $project_id = Job::find($request['job_id'])->jobgroup->project->id;
        $admin = auth()->user()->project()->find($project_id)->pivot->user_role == 'admin';           
        if($admin){
            $user = User::find($request['user_id']);
            if($user->job()->find($request['job_id'])){
                return response()->json([
                    'success' => false,
                    'message' => 'Người này đã có trong công việc'
                ], 400);
            }else{
                $user->job()->attach($request['job_id']);
                return response()->json([
                    'success' => true,
                    'message' => 'Thêm người thành công'
                ], 200);
            }
        }else{
            return response()->json([
                'success' => false,
                'message' => 'Không có quyền thêm người'
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
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request)
    {
        //
        $this->validate($request, [
            'user_id' => 'required',
            'job_id' => 'required'
        ]);
        $project_id = Job::find($request['job_id'])->jobgroup->project->id;
        $admin = auth()->user()->project()->find($project_id)->pivot->user_role == 'admin';      

        if($admin){
            $user = User::find($request['user_id']);
            if($user->job()->detach($request['job_id'])){
                return response()->json([
                    'success' => true,
                    'message' => 'Xóa người khỏi công việc thành công'
                ]);
            }
            return response()->json([
                'success' => false,
                'message' => 'Xóa người ra khỏi công việc thất bại'
            ]);
        }else{
            return response()->json([
                'success' => false,
                'message' => 'Không có quyền xóa người'
            ]);
        }
    }
}
