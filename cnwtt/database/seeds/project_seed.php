<?php

use Illuminate\Database\Seeder;

class project_seed extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        DB::table('project')->insert([
            ['project_name' => 'Phát triển phần mềm xx', 'project_category' => 'group', 'project_process' => 20],
            ['project_name' => 'Lập trình mạng  xx', 'project_category' => 'group', 'project_process' => 10],
            ['project_name' => 'Lập trìn Java', 'project_category' => 'group', 'project_process' => 0],
            ['project_name' => 'Công nghệ web tiên tiến', 'project_category' => 'group', 'project_process' => 20],
            ['project_name' => 'Xây cầu đường', 'project_category' => 'personal', 'project_process' => 30],
            ['project_name' => 'Phát triển cá nhân', 'project_category' => 'personal', 'project_process' => 0]
        ]);
    }
}
