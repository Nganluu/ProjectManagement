<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\SanPham;

class ControllerSanPham extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
       return  SanPham::all();
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
        // $sanpham = new SanPham();
        // $sanpham->ten = $request->input('ten');
        // $sanpham->soluong = $request->input('soluong');
        // $sanpham->save();
        // return $sanpham;
        // or return response()->json($sanpham);
        $sanpham = SanPham::create($request->all());
        return response()->json($sanpham, 201);

    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
        $sanpham = SanPham::find($id);

        return $sanpham;
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
        // $sanpham = SanPham::find($id);
        // $sanpham->update($request->all());
        // // return $sanpham;
        // return response()->json($sanpham, 200);
        $sanpham = SanPham::find($id);
        $sanpham->soluong = $request['soluong'];
        $sanpham->save();
        return response()->json($sanpham);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
        $sanpham = SanPham::find($id);
        $sanpham->delete();
        return $sanpham;
    }
}
