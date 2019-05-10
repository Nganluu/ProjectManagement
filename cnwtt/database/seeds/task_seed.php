<?php

use Illuminate\Database\Seeder;

class task_seed extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        DB::table('task')->insert([
            ['task_name' => 'Lập trình PHP', 'job_id' => 1],
            ['task_name' => 'Lập trình C', 'job_id' => 2],
            ['task_name' => 'Lập trình Laravel', 'job_id' => 3],
            ['task_name' => 'Lập trình ReactJS', 'job_id' => 1],
            ['task_name' => 'Lập trình Spring MVC', 'job_id' => 2],
            ['task_name' => 'Lập trình Nhúng', 'job_id' => 3],
            ['task_name' => 'Lập trình Mobile', 'job_id' => 1],
        ]);
    }
}
