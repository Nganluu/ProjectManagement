<?php

use Illuminate\Database\Seeder;

class comment_seed extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        DB::table('comment')->insert([
            ['content' => 'Mày làm đi còn chần chừ gì nữa', 'job_id' => 1, 'user_id' => 1, 'comment_date' => '2019/11/03 11:20'],
            ['content' => 'Ơ thế hóa ra là như thế à', 'job_id' => 2, 'user_id' => 2, 'comment_date' => '2019/12/03 11:20'],
            ['content' => 'Ok tao biết rồi', 'job_id' => 1, 'user_id' => 1, 'comment_date' => '2019/11/03 11:14'],
            ['content' => 'Ok hihi', 'job_id' => 1, 'user_id' => 1, 'comment_date' => '2019/11/03 11:20'],
        ]);
    }
}
