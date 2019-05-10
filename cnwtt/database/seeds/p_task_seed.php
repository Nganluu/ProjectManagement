<?php

use Illuminate\Database\Seeder;

class p_task_seed extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        DB::table('p_task')->insert([
            ['p_task_name' => 'Lập trình game android', 'personal_id' => 1],
            ['p_task_name' => 'Lập trình game ios', 'personal_id' => 2],
            ['p_task_name' => 'Lập trình game avartar', 'personal_id' => 1],
            ['p_task_name' => 'Lập trình game java', 'personal_id' => 2],
        ]);
    }
}
