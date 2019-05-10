<?php

use Illuminate\Database\Seeder;

class sanpham_seed extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        DB::table('sanpham')->insert([
            ['ten' => 'dép lê', 'soluong' => 100],
            ['ten' => 'áo phông', 'soluong' => 100],
            ['ten' => 'quần short', 'soluong' => 200],
            ['ten' => 'quần đùi', 'soluong' => 50],
        ]);
    }
}
