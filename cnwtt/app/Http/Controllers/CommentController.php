<?php

namespace App\Http\Controllers;
use App\Job;
use App\User;
use App\Comment;
use Carbon\Carbon;
use Illuminate\Http\Request;

class CommentController extends Controller
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
                'message' => 'Không tìm thấy job'
            ], 400);
        }else{
            $comment = $job->comment;
            foreach($comment as $cmt){
                $user_id = $cmt->user_id;
                $user = User::find($user_id);
                $cmt->user_name = $user->name;       
            }
            return response()->json([
                'success' => true,
                'data' => $comment
            ], 200);
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
        $this->validate($request,[
            'content' => 'required',
            'job_id' => 'required'
        ]);
        $comment = new Comment();
        $comment->job_id = $request['job_id'];
        $comment->content = $request['content'];
        $comment->comment_date = Carbon::now();
        if(auth()->user()->comment()->save($comment)){
            return response()->json([
                'success' => true,
                'data' => $comment
            ], 201);
        }else{
            return response()->json([
                'success' => false,
                'message' => 'Comment không được thêm'
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
        $comment = Comment::find($id);
        if(!$comment){
            return response()->json([
                'success' => false,
                'message' => 'Không tồn tại comment này'
            ], 400);
        }else{
            $comment->user_name =  User::find($comment->user_id)->name;
            return response()->json([
                'success' => true,
                'data' => $comment
            ], 200);
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
        $comment = auth()->user()->comment()->find($id);
        if(!$comment){
            return response()->json([
                'success' => false,
                'message' => 'Không tìm thấy comment'
            ], 400);
        }
        // $updated = $comment->fill($request->all())->save();
        $updated = $comment->update($request->all());
        if($updated){
            return response()->json([
                'success' => "abcd",
                'data' => $comment
            ]);
        }
        return response()->json([
            'success' => false,
            'message' => 'Comment không được cập nhật'
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
        $comment = auth()->user()->comment()->find($id);
        if(!$comment){
            return response()->json([
                'success' => false,
                'message' => 'Không tìm thấy comment'
            ], 400);
        }
        if($comment->delete()){
            return response()->json([
                'success' => true,
                'message' => 'Đã xóa comment'
            ], 200);
        }else{
            return response()->json([
                'success' => false,
                'message' => 'Không thể xóa comment'
            ], 500);
        }
    }
}
