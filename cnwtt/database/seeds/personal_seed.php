<?php

use Illuminate\Database\Seeder;

class personal_seed extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        DB::table('personal')->insert([
            ['personal_name' => 'BTL java', 'personal_process' => 0, 'user_id' => 1],
            ['personal_name' => 'BTL CNW', 'personal_process' => 10, 'user_id' => 2],
            ['personal_name' => 'BTL PTTKHT', 'personal_process' => 20, 'user_id' => 3],
            ['personal_name' => 'BTL HĐH', 'personal_process' => 30, 'user_id' => 4],
            ['personal_name' => 'BTL LTC', 'personal_process' => 40, 'user_id' => 5],
            ['personal_name' => 'BTL PYTHON', 'personal_process' => 50, 'user_id' => 6]
        ]);
    }
}
