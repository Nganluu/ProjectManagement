<?php

use Illuminate\Database\Seeder;

class job_seed extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        DB::table('job')->insert([
            ['job_name' => 'code', 'user_id' => 1, 'job_group_id' => 1, 'start_date' => '2018/11/02 22:30', 'end_date' => '2019/11/02'],
            ['job_name' => 'code1', 'user_id' => 2, 'job_group_id' => 2, 'start_date' => '2018/11/02 22:30', 'end_date' => '2019/11/02'],
            ['job_name' => 'code2', 'user_id' => 3, 'job_group_id' => 3, 'start_date' => '2018/11/02 22:30', 'end_date' => '2019/11/02'],
            ['job_name' => 'code3', 'user_id' => 4, 'job_group_id' => 4, 'start_date' => '2018/11/02 22:30', 'end_date' => '2019/11/02'],
            ['job_name' => 'code4', 'user_id' => 5, 'job_group_id' => 5, 'start_date' => '2018/11/02 22:30', 'end_date' => '2019/11/02'],
            ['job_name' => 'code4', 'user_id' => 6, 'job_group_id' => 6, 'start_date' => '2018/11/02 22:30', 'end_date' => '2019/11/02']
        ]);
    }
}
