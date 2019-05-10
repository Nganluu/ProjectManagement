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
            ['job_name' => 'code', 'job_group_id' => 1, 'start_date' => '2018/11/02 22:30', 'end_date' => '2019/11/02', 'job_description' => 'Một công việc khó khăn'],
            ['job_name' => 'code1', 'job_group_id' => 2, 'start_date' => '2018/11/02 22:30', 'end_date' => '2019/11/02', 'job_description' => 'Một công việc cụ thể'], 
            ['job_name' => 'code2', 'job_group_id' => 3, 'start_date' => '2018/11/02 22:30', 'end_date' => '2019/11/02', 'job_description' => 'Một công việc cần phải hoàn thành nhanh'],
            ['job_name' => 'code3', 'job_group_id' => 4, 'start_date' => '2018/11/02 22:30', 'end_date' => '2019/11/02', 'job_description' => 'Một công việc khó khăn'],
            ['job_name' => 'code4', 'job_group_id' => 5, 'start_date' => '2018/11/02 22:30', 'end_date' => '2019/11/02', 'job_description' => 'Một công việc khó khăn'],
            ['job_name' => 'code4', 'job_group_id' => 6, 'start_date' => '2018/11/02 22:30', 'end_date' => '2019/11/02', 'job_description' => 'Một công việc khó khăn']
        ]);
    }
}
