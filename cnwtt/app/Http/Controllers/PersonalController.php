<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Auth;

use Illuminate\Http\Request;
use App\Personal;
use App\User;

class PersonalController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
    
        $personal = auth()->user()->personal;
        if($personal->count() != null){
            return response()->json([
                'success' => true,
                'data' => $personal
            ], 200);
        }else{
            return response()->json([
                'success' => false,
                'message' => 'Không có bảng cá nhân nào để hiển thị'
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
            'personal_name' => 'required'
        ]);

        $personal = new Personal();
        $personal->personal_name = $request['personal_name'];
        if(auth()->user()->personal()->save($personal)){
            return response()->json([
                'success' => true,
                'data' => $personal 
            ], 201);
        }else{
            return response()->json([
                'success' => false,
                'message' => 'Bảng cá nhân không được thêm'
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
        $personal = auth()->user()->personal()->find($id);
        if(!$personal){
            return response()->json([
                'success' => false,
                'message' => "Bảng cá nhân này không có"
            ], 400);
        }
        return response()->json([
            'success' => true,
            'data' => $personal
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
        //
        $personal = auth()->user()->personal()->find($id);

        if(!$personal){
            return response()->json([
                'success' => false,
                'message' => 'Không tìm thấy bảng cá nhân'
            ], 400);
        }
        // $updated = $personal->update($request->all());
        $updated = $personal->fill($request->all())->save();

        if($updated){
            return response()->json([
                'success' => true,
                'message' => 'Bảng cá nhân được update'
            ], 200);
        }
        else{
            return response()->json([
                'success' => false,
                'message' => 'Không cập nhật được bảng cá nhân'
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
        $personal = auth()->user()->personal()->find($id);
        if(!$personal){
            return response()->json([
                'success' => false,
                'message' => 'Không tìm thấy bảng cá nhân'
            ], 400);
        }else{
            $personal->ptask()->delete();
        }
        if($personal->delete()){
            return response()->json([
                'success' => true,
                'message' => 'Bảng cá nhân đã được xóa'
            ], 200);
        }
        else{
            return response()->json([
                'success' => false,
                'message' => 'Không xóa được bảng cá nhân'
            ], 500);
        }

    }
    // public function percent($id){
    //     $personal = Personal::find($id);
    //     $count =  $personal->ptask()->count();
    //     $tick = 0;
    //     foreach($personal->ptask as $p_task_tick){
    //         if($p_task_tick->p_task_tick == 1){
    //             $tick++;
    //         }
    //     }
    //     if($tick == $count){
    //         $personal->personal_process = 100;
    //         $personal->save();
    //     }
    //     else{
    //         $personal->personal_process = (int)($tick/$count*100);
    //         $personal->save();
    //     }
    //     return response()->json([
    //         $personal
    //     ], 200);

    // }
}
