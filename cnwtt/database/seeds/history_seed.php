<?php

use Illuminate\Database\Seeder;

class history_seed extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        DB::table('history')->insert([
            ['content' => 'Anh Phương đã xóa task 1', 'job_id' => 1],
            ['content' => 'Anh Phương đã xóa task 2', 'job_id' => 2],
            ['content' => 'Anh Phương đã xóa task 3', 'job_id' => 3],
            ['content' => 'Anh Phương đã xóa task 4', 'job_id' => 4],
        ]);
    }
}
