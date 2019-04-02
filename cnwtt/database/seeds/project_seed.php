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
            ['project_name' => 'Phát triển phần mềm xx'],
            ['project_name' => 'Lập trình mạng  xx'],
            ['project_name' => 'Lập trìn Java'],
            ['project_name' => 'Công nghệ web tiên tiến'],
            ['project_name' => 'Xây cầu đường'],
            ['project_name' => 'Phát triển cá nhân']
        ]);
    }
}
