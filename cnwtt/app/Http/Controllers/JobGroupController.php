<?php

namespace App\Http\Controllers;
use App\Project;
use App\JobGroup;
use Illuminate\Http\Request;

class JobGroupController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($project_id)
    {
        // 
        $project = Project::find($project_id);
        if(!$project){
            return response()->json([
                'success' => false,
                'message' => 'Không tìm thấy dự án để hiển thị nhóm công việc'
            ], 400);
        }
        $job_group = $project->jobgroup;
        if($job_group->count() != 0){
            return response()->json([
                'success' => true,
                'data' => $job_group
            ], 200);
        }else{
            return response()->json([
                'success' => false,
                'message' => 'Không có nhóm công việc nào để hiển thị'
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
            'job_group_name' => 'required',
            'project_id' => 'required'
        ]);
        $job_group = JobGroup::create($request->all());
        if($job_group){
            return response()->json([
                'success' => true,
                'data' => $job_group
            ], 201);
        }else{
            return response()->json([
                'success' => false,
                'message' => 'Nhóm công việc không được thêm'
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
        $job_group = JobGroup::find($id);
        if($job_group){
            return response()->json([
                'success' => true,
                'data' => $job_group
            ], 200);
        }else{
            return response()->json([
                'success' => false,
                'message' => 'Không tìm thấy nhóm công việc'
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
        $job_group = JobGroup::find($id);
        if(!$job_group){
            return response()->json([
                'success' => false,
                'message' => 'Không tìm thấy nhóm công việc'
            ], 400);
        }
        $updated = $job_group->update($request->all());
        if($updated){
            return response()->json([
                'success' => true,
                'data' => $job_group
            ], 200);
        }else{
            return response()->json([
                'success' => false,
                'message' => 'Nhóm công việc không được cập nhật'
            ], 500);
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
        $job_group = JobGroup::find($id);
        if(!$job_group){
            return response()->json([
                'success' =>  false,
                'message' => 'Không tìm thấy nhóm công việc'
            ], 400);
        }else{
            foreach($job_group->job as $job){
                $job->task()->delete();
            }
            $job_group->job()->delete();
            if($job_group->delete()){
                return response()->json([
                    'success' => true,
                    'message' => 'Xóa nhóm công việc thành công'
                ]);
            }else{
                return response()->json([
                    'success' => false,
                    'message' => 'Xóa nhóm công việc thất bại'
                ]);
            }
        }
    }

}
