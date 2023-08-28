<?php

namespace App\Http\Controllers\api\v1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Validator;
use App\Models\Cards;
class PostCards extends Controller
{
    public function addData(Request $request){
        $input = $request->all();
        $validator = Validator::make($input, [
            'cardtitle' => 'required',
            'list_id' => 'required',
        ]);

        $input['description'] = 'ok';
        $input['order'] = 'ok';
        $input['due_date'] = '2001-04-24';
        $input['label'] = 'ok';

        if($validator->fails()){
            return response()->json($validator->errors(), 422);
        }

        $add = Cards::create($input);

        if($add){
            return response()->json([
                'success' => true,
                'message' => 'Successfully request card'
            ], 201);
        }

        return response()->json([
            'success' => false
        ], 409);
    }

    public function getData(){
        $getDatas = Cards::join('lists','lists.id','=','cards.list_id')
                          ->get([
                            'cards.*',
                            'lists.title as list_title'
                          ]);

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
        $cardtitle = $request->input('cardtitle');
        $description = $request->input('description');
        $order = $request->input('order');        
        $due_date = $request->input('due_date');
        $list_id = $request->input('list_id');
        $label = $request->input('label');

        $edit = Cards::find($id);
        $edit->cardtitle = $cardtitle;
        $edit->description = $description;
        $edit->order = $order;
        $edit->due_date = $due_date;
        $edit->list_id = $list_id;
        $edit->label = $label;

        $edit->save();

        if($edit){
            return response()->json([
                'success' => true,
                'message' => 'Successfully edit card',
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
                'message' => 'Successfully delete card'
            ], 201);
        }

        return response()->json([
            'success' => false,
        ], 409);
    }
}
