<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Project;
use App\User;
use App\Job;
use App\JobGroup;
use App\Task;


class ProjectController extends Controller
{
    /**
     
     *Hiển thị danh sách dự án của người đang đăng nhập
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $project = auth()->user()->project;// lay ra du an cua nguoi dang dang nhap
        if(!$project){
            return response()->json([
                'success' => false,
                'message' => 'Người dùng chưa có dự án'
            ], 400);
        }
        return response()->json([
            'success' => true,
            'data' => $project
        ], 200);
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
     *Tạo 1 dự án 
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
        $this->validate($request, [
            'project_name' => 'required'
        ]);

        $project = Project::create($request->all());
        $project->user()->attach(auth::id(), ['user_role' => 'admin']);
          if($project){  
              return response()->json([
                'success' => true,
                'data' => $project 
            ], 201);//201 - doi tuong duoc tao, duoc dung trong ham store
        }else{
            return response()->json([
                'success' => false,
                'message' => 'Dự án không được tạo'
            ], 500);
        }
     
      
       
        
    }
    

    /**
     * Display the specified resource.
     *Hiển thị dự án có id = project_id
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
     function show($id)
    {
        $project = auth()->user()->project()->find($id);//hiển thị dự án có id = $id trong những dự án của người dùng hiện tại
        if(!$project){
            return response()->json([
                'success' => false,
                'message' => "Không tồn tại dự án này"//400: Lỗi. Đây là lỗi cơ bản khi không vượt qua được xác nhận yêu cầu từ server.
            ], 400);
        }
        return response()->json([
            'success' => true,
            'data' => $project
        ], 200);

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


        $project = auth()->user()->project()->find($id);

        if(!$project){
            return response()->json([
                'success' => false,
                'message' => 'Không tồn tại  dự án này trong dự án của người dùng'
            ], 400);
        }
        else{
        
        $updated = $project->fill($request->all())->save();
        
    }
        if($updated){
            return response()->json([
                'success' => true,
                'message' => 'Dự án được update'
            ], 200);
        }
        else{
            return response()->json([
                'success' => false,
                'message' => 'Dự án chưa được update'
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
        $project = auth()->user()->project()->find($id);
           foreach($project->user as $user){
           $project->user()->detach($user->id);
        
    
        if(!$project) {
            return response()->json([
                'success' => false,
                'message' => 'Không tìm thấy dự án '
            ], 400);
        }
        else{
            if( $project->job_group ){
                if($project->job_group->job){
                     foreach($project->job_group->job as $job){
                     $job->task()->delete();
            }
        
            foreach($project->job_group as $job_group){
                $job_group->job()->delete();
            }
        }
    }
            $project->delete();
        }
            

        if($project){
            return response()->json([
                'success' => true,
                'message' => 'Đã xóa thành công dự án'
            ], 200);
        }else{
            return response()->json([
                'success' => false,
                'message' => 'Xóa dự án thất bại'
            ], 500);
        }
    }
}
}

    

    





