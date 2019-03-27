<?php

use Illuminate\Database\Seeder;

class user_project_seed extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        DB::table('user_project')->insert([
            ['user_id' => 1, 'project_id' => 1, 'user_role' => 'admin'],
            ['user_id' => 2, 'project_id' => 2, 'user_role' => 'admin'],
            ['user_id' => 3, 'project_id' => 3, 'user_role' => 'admin'],
            ['user_id' => 4, 'project_id' => 4, 'user_role' => 'admin'],
            ['user_id' => 5, 'project_id' => 5, 'user_role' => 'admin'],
            ['user_id' => 6, 'project_id' => 6, 'user_role' => 'admin'],
            ['user_id' => 2, 'project_id' => 1, 'user_role' => 'user'],
            ['user_id' => 3, 'project_id' => 1, 'user_role' => 'user'],          
        ]);
        
    }
}
