<?php

use Illuminate\Database\Seeder;

class job_group_seed extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        DB::table('job_group')->insert([
            ['job_group_name' => 'Tìm hiểu công nghệ', 'project_id' => 1],
            ['job_group_name' => 'Tìm hiểu lập trình', 'project_id' => 2],
            ['job_group_name' => 'Tìm hiểu docker', 'project_id' => 1],
            ['job_group_name' => 'Tìm hiểu javascript', 'project_id' => 3],
            ['job_group_name' => 'Tìm hiểu môi trường lập trình', 'project_id' => 4],
            ['job_group_name' => 'Tìm hiểu ide', 'project_id' => 1],
        ]);
    }
}
