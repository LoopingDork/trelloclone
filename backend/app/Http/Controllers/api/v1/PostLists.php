<?php

namespace App\Http\Controllers\api\v1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Validator;
use App\Models\Lists;
class PostLists extends Controller
{
    public function addData(Request $request){
        $input = $request->all();

        $validator = Validator::make($input, [
            'title' => 'required',
        ]);

        $input['order'] = 'oke';

        if($validator->fails()){
            return response()->json($validator->errors(), 422);
        }

        $add = Lists::create($input);

        if($add){
            return response()->json([
                'success' => true,
                'message' => 'Successfully request lists'
            ], 201);
        }

        return response()->json([
            'success' => false
        ], 409);
    }

    public function getData(){
        $getDatas = Lists::get();

        if($getDatas){
            return response()->json([
                'success' => true,
                'message' => 'Successfully get data',
                'data' => $getDatas
            ], 201);
        }
        return response()->json([
            'success' => false,
        ], 409);
    }
    public function updateData(Request $request){
        $id = $request->input('id');
        $title = $request->input('title');
        $order = $request->input('order');

        $edit = Lists::find($id);
        
        $edit->save();

        if($edit){
            return response()->json([
                'success' => true,
                'message' => 'Successfully edit lists',
                'data' => $edit
            ], 201);
        }

        return response()->json([
            'success' => false,
        ], 409);
    }

    public function destroy(Request $request){
        $id = $request->input('id');
        $hapus = Cards::find($id);
        $hapus->delete();

        if($hapus){
            return response()->json([
                'success' => true,
                'message' => 'Successfully delete lists'
            ], 201);
        }

        return response()->json([
            'success' => false,
        ], 409);
    }
}
