<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Store;              //connection to the model
use App\Http\Resources\Store as StoreResource;
use Validator;
 
class StoreController extends Controller
{
    public function index()
    {
        //$store = Store::all();
        //return response()->json($store, 200);

        $stores = Store::all();
    
        return $this->sendResponse(StoreResource::collection($stores), $stores->count());
    }

    public function show($id)
    {
        if(is_int($id)) {
            return $this->sendError('Bad request.', 400);
        }

        $store = Store::find($id);
  
        if (is_null($store)) {
            return $this->sendError('Record not found');
        }
   
        return $this->sendResponse(new StoreResource($store), 1);
    
        //return $this->sendResponse(StoreResource::collection($store), 'Store retrieved successfully.');
    }

    public function store(Request $request)
    {

        $input = $request->all();
   
        $validator = Validator::make($input, [
            'name' => 'required',
            'address' => 'required'
        ]);

        //print_r($input);
        //die;
   
        if($validator->fails()){
            return $this->sendError('Bad request.', 400);       
        }
   
        $store = Store::create($input);

        return $this->sendResponse(new StoreResource($store), 'Store created successfully.');
    }

    public function update(Request $request, Store $store)
    {
        $input = $request->all();
   
        $validator = Validator::make($input, [
            'name' => 'required',
            'address' => 'required'
        ]);
            
   
        if($validator->fails()){
            return $this->sendError('Bad request', 400);       
        }
        
        $store = Store::find($input['id']);
        //$store->id = $input['id'];
        $store->name = $input['name'];
        $store->address = $input['address'];
        $store->save();
   
        return $this->sendResponse(new StoreResource($store), 'Store updated successfully.');
    }

    public function delete($id)
    {
        if(is_int($id)) {
            return $this->sendError('Bad request.', 400);
        }

        $store->delete();

        //return response()->json(null, 204);
        return $this->sendResponse([], 'Store deleted successfully.');
    }

    public function softDelete($id)
    {
        if(is_int($id)) {
            return $this->sendError('Bad request.', 400);
        }

        $store = Store::destroy($id);
        if ($store) {
            $response = ['success' => true ];
        } else {
            $response = $this->sendError("Record not found.", 404);

        }
        return response($response);
    }

    /**
     * success response method.
     *
     * @return \Illuminate\Http\Response
     */
    private function sendResponse($result, $count)
    {
        if ($count > 1) {
            $st = "Stores";
        } else {
            $st = "Store";
        }
    	$response = [
            
            $st    => $result,
            'success' => true,
            'total_elements' => $count,

            
        ];


        return response()->json($response, 200);
        //return response()->json($result, 200);
    }


    /**
     * return error response.
     *
     * @return \Illuminate\Http\Response
     */
    private function sendError($error, $code = 404)
    {
    	return [
            'error_code' => $code,
            'error_msg' => $error,
            'success' => false,
        ];
    }
}