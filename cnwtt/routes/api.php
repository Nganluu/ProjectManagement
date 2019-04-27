<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});


// Learning API
route::get('HelloWorld', function(Request $request){
    return response()->json('Hello Anh Phuong den voi api', 200);
});

route::get('Hello/{name}/{age}', function(Request $request, $name, $age){
    return response()->json('Hello ' . $name . '. Your age: ' . $age, 200);
});

route::get('Permision/{age?}', function(Request $request, $age = 17){
    if($age < 18){
        $str = "Tre con khong duoc an thit cho";
    }else{
        $str = "Nguoi lon duoc phep truy cap";
    }
    return response()->json($str, 200);
});

Route::get('/books', function(Request $request){
    $entries = [
        [
            "isbn" => "9781593275846",
            "title" => "Eloquent JavaScript, Second Edition",
            "author" => "Marijn Haverbeke"      
        ],
        [
            "isbn" => "9781449331818",
            "title" => "Learning JavaScript Design Patterns",
            "author" => "Addy Osmani"
        ],
        [
            "isbn" => "9781449365035",
            "title" => "Speaking JavaScript",
            "author" => "Axel Rauschmayer",
        ],
        [
            "isbn" => "9781491950296",
            "title" => "Programming JavaScript Applications",
            "author" => "Eric Elliott"
        ]
    ];
    return response()->json($entries, 200);
});

Route::post('/books', function(Request $request){
    
    $entries = [
        [
            "isbn" => "9781593275846",
            "title" => "Eloquent JavaScript, Second Edition",
            "author" => "Marijn Haverbeke"      
        ],
        [
            "isbn" => "9781449331818",
            "title" => "Learning JavaScript Design Patterns",
            "author" => "Addy Osmani"
        ]
    ];

    // Get book data from POST
    $book = [
        "isbn" => $request->input('isbn'),
        "title" => $request->input('title'),
        "author" => $request->input('author')
    ];

    // Append news book into current list.
    $entries[] = $book;

    return response()->json($entries, 200);
});

Route::post('/append', function(Request $request){
    
    $entries = [
        [
            "isbn" => "9781593275846",
            "title" => "Eloquent JavaScript, Second Edition",
            "author" => "Marijn Haverbeke"      
        ],
        [
            "isbn" => "9781449331818",
            "title" => "Learning JavaScript Design Patterns",
            "author" => "Addy Osmani"
        ]
    ];
 
    // Get book data from POST
    $book = [
        "isbn" => $request->input('isbn'),
        "title" => $request->input('title'),
        "author" => $request->input('author')
    ];
 
    // Append news book into current list.
    $entries[] = $book;
 
    return response()->json($entries, 200);
});


//test api tu viet

route::get('sanpham', 'ControllerSanPham@index');
route::get('sanpham/{id}', 'ControllerSanPham@show');
route::post('sanpham', 'ControllerSanPham@store');
route::put('sanpham/{id}', 'ControllerSanPham@update');
route::delete('sanpham/{id}', 'ControllerSanPham@destroy');


// Start Project

// Acount

route::post('login', 'PassportController@login');
route::post('register', 'PassportController@register');
route::put('updatepassword/{id}', 'PasswordController@update');
route::put('updateaccount/{id}', 'AccountController@update');


// Personal
    // Tất cả phải truyền lên Authorization = 'Bearer' + ' ' + 'Mã Token'
    // để xác thực người dùng
route::middleware('auth:api')->group(function () {
    route::get('personal', 'PersonalController@index');
    route::get('personal/{id}', 'PersonalController@show');

    // Chuyền lên: personal_name
    route::post('personal', 'PersonalController@store');
    // Chuyền lên: personal_name mới để cập nhật
    route::put('personal/{id}', 'PersonalController@update');
    route::delete('personal/{id}', 'PersonalController@destroy');
   
});
    // route này dùng method get nhưng làm thay đổi giá trị của nhiều trường
    // nên không dùng nữa, comment lại để tính sau, phần trăm thì chỉ cần hiện thị
    // personal thì sẽ có phần trăm kèm theo
    // Phần trăm thay đổi được tạo ra trong các hàm thêm, sửa, xóa pTask
    // Hiển thị phần trăm của personal hiện tại
    // route::get('percentpersonal/{id}', 'PersonalController@percent');


// PTask

    // Lấy ra tất cả các p_task của personal_id chuyền vào personal_id
route::get('allptask/{personal_id}', 'PTaskController@index');
    // Lấy ra p_task có id là id
route::get('ptask/{id}', 'PTaskController@show');
    // Tạo p_task mới chuyền lên: p_task_name, personal_id
route::post('ptask', 'PTaskController@store');
    // Cập nhật p_task chuyền lên: p_task_name hoặc p_task_tick
route::put('ptask/{id}', 'PTaskController@update');
    // Xóa  p_task có id là id
route::delete('ptask/{id}', 'PTaskController@destroy');


// Comment

    // Lấy ra tất cả các comment trong một job truyền vào job_id
route::get('allcomment/{job_id}', 'CommentController@index');

    // Làm việc với comment thông qua người dùng cần phải xác thực, truyền thêm:
    // Authorization = 'Bearer' + ' ' + 'Mã Token'
route::middleware('auth:api')->group(function(){
    // Hiển thị một comment của một người cụ thể truyền vào id của comment
    route::get('comment/{id}', 'CommentController@show');
    // Lưu lại một comment truyền vào: content, job_id
    route::post('comment', 'CommentController@store');
    // Cập nhật nội dung của comment truyền vào: content
    route::put('comment/{id}', 'CommentController@update');
    // Xóa một comment truyền vào id của comment
    route::delete('comment/{id}', 'CommentController@destroy');
});


// Project
route::middleware('auth:api')->group(function () {
    //Hiển thị danh sách dự án của người đang đăng nhập
    route::get('allproject', 'ProjectController@index');
    //Hiển thị dự án có  id
    route::get('project/{id}', 'ProjectController@show');

    /* Người dùng tạo 1 dự án mới
    Truyền vào: project_name
    */
    route::post('project', 'ProjectController@store');
    /* Chỉnh sửa 1 dự án có id 
    Truyền vào : project_name
    */
    route::put('project/{id}', 'ProjectController@update');
    //  xóa dự án có id là id
    route::delete('project/{id}', 'ProjectController@destroy');
   

});

// JobGroup
    // Hiển thị tất cả các job_group trong dự án truyền vào: project_id
route::get('alljobgroup/{project_id}', 'JobGroupController@index');
    // Hiển thị một jobgroup truyền vào id
route::get('jobgroup/{id}', 'JobGroupController@show');
    // Thêm một nhóm công việc truyền vào job_group_name, project_id
route::post('jobgroup', 'JobGroupController@store');
    // Chỉnh sửa một nhóm công việc truyền vào job_group_name
route::put('jobgroup/{id}', 'JobGroupController@update');
    // Xóa một nhóm công việc truyền vào id nhóm công việc
route::delete('jobgroup/{id}', 'JobGroupController@destroy');
   



// Job
    // Hiển thị tất cả các job trong một job_group truyền vào: job_group_id
route::get('alljob/{job_group_id}', 'JobController@index');
    // Hiển thị một job truyền vào id
route::get('job/{id}', 'JobController@show');
    // Thêm vào một job truyền vào: job_name, start_date, end_date, job_group_id
route::post('job', 'JobController@store');
    // Chỉnh sủa một job truyền vào: job_name, start_date, end_date,
route::put('job/{id}', 'JobController@update');
    // Xóa một job truyền vào một id
route::delete('job/{id}', 'JobController@destroy');
    // Hiển thị tất cả lịch sử trong job hiện tại truyền vào id của job
route::get('showhistory/{id}', 'JobController@showHistory');



// Task
    
route::middleware('auth:api')->group(function(){
    // Hiển thị tất cả các task trong 1 job.... Vì thế người nào có trong job
    // hoặc là admin mới có quyền xem
    // truyền vào: Authorization = Bearer + ' ' + 'Mã Token'
    // truyền vào: job_id
    route::get('alltask/{job_id}', 'TaskController@index');   

    // Thêm sửa xóa một task cần lưu lại lịch sử nên cần truyền vào 
    // Authorization = Bearer + ' ' + 'Mã Token'
        // Thêm một task truyền vào: task_name, job_id, Authorization = Bearer + ' ' + 'Mã Token'
    route::post('task', 'TaskController@store');
        // Cập nhật một task truyền vào : id, task_name hoặc task_tick,  Authorization = Bearer + ' ' + 'Mã Token'
    route::put('task/{id}', 'TaskController@update');
        // Xóa một task truyền vào: id,  Authorization = Bearer + ' ' + 'Mã Token'
    route::delete('task/{id}', 'TaskController@destroy');
    

});
    // Hiển thị một task truyền vào: id
    route::get('task/{id}', 'TaskController@show');


// CRUD người tương ứng với công việc

    // Vì cài đặt job không hiển thị cho user bình thường mà chỉ hiện thị cho admin cho nên
    // không cần xác thực người dùng
    // Hiển thị tất cả các người trong một job truyền vào job_id
    route::get('userjob/{job_id}', 'UserJobController@index');

    // Thêm người vào job truyền vào: user_id, job_id
    route::post('userjob', 'UserJobController@store');
    // Xóa người ra khỏi job truyền vào: 'user_id (người), 'job_id' (công việc)
    route::delete('userjob', 'UserJobController@destroy');

// JobGroup__Xác thực
// JobGroup
route::middleware('auth:api')->group(function () {
    // Hiển thị tất cả các job_group trong dự án truyền vào: project_id
    route::get('alljobgroup/{project_id}', 'JobGroupController@index');
    // Hiển thị một jobgroup truyền vào id
route::get('jobgroup/{id}', 'JobGroupController@show');
    // Thêm một nhóm công việc truyền vào job_group_name, project_id
route::post('jobgroup', 'JobGroupController@store');
    // Chỉnh sửa một nhóm công việc truyền vào job_group_name
route::put('jobgroup/{id}', 'JobGroupController@update');
    // Xóa một nhóm công việc truyền vào id nhóm công việc
route::delete('jobgroup/{id}', 'JobGroupController@destroy');
   
});





