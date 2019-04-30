<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Project;
use App\User;

class UserProjectController extends Controller
{
    /**
     *Xem danh sách thành viên của dự án 
     *
     * @return \Illuminate\Http\Response
     */
    public function index($project_id)
    {
     
        $inProject = auth()->user()->project()->find($project_id) == true;

        $project = Project::find($project_id);
       
        if(!$project){
            return response()->json([
                'success' => false,
                'message' => "Không tồn tại dự án này"//400: Lỗi. Đây là lỗi cơ bản khi không vượt qua được xác nhận yêu cầu từ server.
            ], 400);
        }
        if($project && $inProject){
            $user = $project->user;
            if($user->count() != 0){
                return response()->json([
                    'success' => true,
                    'data' => $user,
                ], 200);
            }
        }else{
            return response()->json([
                'success' => false,
                'message' => 'Người dùng không có quyền xem'
            ]);
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
            'email' => 'required|email',
            'project_id' => 'required'
        ]);

        $admin = auth()->user()->project()->find($request['project_id'])->pivot->user_role == 'admin';
        if(!$admin){
            return response()->json([
                'success' => false,
                'message' => 'Không có quyền thêm'
            ]);
        }
        $users = User::where('email', $request['email'])->get();
        if($users->count() == 0){
            return response()->json([
                'success' => false,
                'message' => 'email không tồn tại'
            ], 400);
        }
        foreach($users as $user){
            $user_id = $user->id;
        }
        $project = Project::find($request['project_id']);
        if($project->user()->find($user_id)){
            return response()->json([
                'success' => false,
                'message' => 'Đã là thành viên dự án '
            ], 400);
        }else{
            $project->user()->attach($user_id, ['user_role' => 'user']);
            return response()->json([
                'success' => true,
                'message' => 'Đã được thêm vào dự án'
            ], 201);
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
        
        $admin = auth()->user()->project()->find($request['project_id'])->pivot->user_role == 'admin';
        if(!$admin){
            return response()->json([
                'success' => false,
                'message' => 'Không có quyền xóa thành viên'
            ]);
        }


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
