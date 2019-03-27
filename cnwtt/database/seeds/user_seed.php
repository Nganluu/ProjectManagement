<?php

use Illuminate\Database\Seeder;

class user_seed extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        DB::table('users')->insert([
            ['name' => 'phuong1', 'email' => 'phuong1@gmail.com', 'password' => bcrypt('matkhau')],
            ['name' => 'phuong2', 'email' => 'phuong2@gmail.com', 'password' => bcrypt('matkhau')],
            ['name' => 'phuong3', 'email' => 'phuong3@gmail.com', 'password' => bcrypt('matkhau')],
            ['name' => 'phuong4', 'email' => 'phuong4@gmail.com', 'password' => bcrypt('matkhau')],
            ['name' => 'phuong5', 'email' => 'phuong5@gmail.com', 'password' => bcrypt('matkhau')],
            ['name' => 'phuong6', 'email' => 'phuong6@gmail.com', 'password' => bcrypt('matkhau')]
        ]);
    }
}
