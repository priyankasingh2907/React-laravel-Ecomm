<?php

namespace App\Http\Controllers;

use App\Models\item;
use App\Http\Requests\StoreitemRequest;
use App\Http\Requests\UpdateitemRequest;
use Illuminate\Http\Request;

class ItemController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        
        return item::all();
    }

    /**
     * Show the form for creating a new resource.
     */
    public function search($key ,Request $request)
    {
        $data = $request->get('key');

$item = item::where('name', 'like', "%{$data}%") ->get();

return $item;
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $item = new item();
        $item->name=$request->input('name');
       
        $item->price=$request->input('price');
        $item->file=$request->file('file')->store('item');
        $item->description=$request->input('description');
        $item->save();
        return $item;

    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $item = item::find($id);
        return $item;
        
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit( $id)
    {
        $item = item::find($id);
        return $item;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request,  $id)
    {
        $item = item::find($id);
        $item->name=$request->input('name');
       
        $item->price=$request->input('price');
        $item->file=$request->file('file')->store('item');
        $item->description=$request->input('description');
        $item->save();
        return $item;

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy( $id)
    {
        $item = item::find($id);
        $item->delete();
        return "successfully deleted";
    }
}
