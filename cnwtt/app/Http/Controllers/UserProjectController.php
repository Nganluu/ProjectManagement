<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Project;

class UserController extends Controller
{
    /**
     *Xem danh sách thành viên của dự án 
     *
     * @return \Illuminate\Http\Response
     */
    public function index($project_id)
    {
        $project = Project::find($project_id);
       
        if(!$project){
            return response()->json([
                'success' => false,
                'message' => "Không tồn tại dự án này"//400: Lỗi. Đây là lỗi cơ bản khi không vượt qua được xác nhận yêu cầu từ server.
            ], 400);
        }else{
        $user = $project->user;
        return response()->json([
            'success' => true,
            'data' => $user,
        ], 200);
    }
}
    

   

    /**
     * Store a newly created resource in storage.
     * Thêm người dùng vào trong dự án 
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $this->validate($request, [
            'user_id' => 'required',
            'project_id' => 'required'
        ]);
    
        $project = Project::find($request['project_id']);
        if($project->user()->find($request['user_id'])){
            return response()->json([
                'success' => false,
                'message' => 'Đã là thành viên dự án '
            ], 400);
        }else{
            $project->user()->attach($request['user_id'], ['user_role' => 'user']);
            return response()->json([
                'success' => true,
                'message' => 'Đã được thêm vào dự án'
            ], 200);
        }
          
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show()
    {
        
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
        
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request)
    {
        
        $this->validate($request, [
            'user_id' => 'required',
            'project_id' => 'required'
        ]);


        $project = Project::find($request['project_id']);
        if($project->user()->find($request['user_id'])){
        if($project->user()->detach($request['user_id'])){
            return response()->json([
                'success' => true,
                'message' => 'Đã ra khỏi dự án thành công'
            ]);
        }
        return response()->json([
            'success' => false,
            'message' => 'Xóa thất bại'
        ]);
    }else 
    return response()->json([
        'success' => false,
        'message' => 'Không là thành viên của dự án'
    ]);
}
}
