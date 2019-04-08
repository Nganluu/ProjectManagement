<?php

use Illuminate\Database\Seeder;
// use database\seeds\user_seed;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call(project_seed::class);
        $this->call(user_project_seed::class);
        $this->call(user_seed::class);
        $this->call(job_seed::class);
        $this->call(job_group_seed::class);
        $this->call(comment_seed::class);
        $this->call(task_seed::class);
        $this->call(personal_seed::class);
        $this->call(user_job_seed::class);
        $this->call(sanpham_seed::class);
        $this->call(p_task_seed::class);
        $this->call(history_seed::class);
    }
}
