<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Store;              //connection to the model of the store
use App\Article;            //connection to the model of the articles
use App\Http\Resources\Article as ArticleResource;
use Validator;

class ArticleController extends Controller
{
    public function index()
    {

        $articles = Article::all();
    
        return $this->sendResponse(ArticleResource::collection($articles), $articles->count());
    }

    public function show($id)
    {
        if(is_int($id)) {
            return $this->sendError('Bad request.', 400);
        }

        $article = Article::find($id);
  
        if (is_null($article)) {
            return $this->sendError('Record not found');
        }
   
        return $this->sendResponse(new ArticleResource($article), 1);
    
    }

    public function findByStore($id)
    {
        if(is_int($id)) {
            return $this->sendError('Bad request.', 400);
        }

        $article = Store::find($id)->articles;
        
        if (is_null($article)) {
            return $this->sendError('Record(s) not found');
        }

        return $this->sendResponse(ArticleResource::collection($article), $article->count());
    
    }

    public function store(Request $request)
    {

        $input = $request->all();
   
        $validator = Validator::make($input, [
            'name' => 'required',
            'description' => 'required',
            'price' => 'required',
            'total_in_shelf' => 'required',
            'total_in_vault' => 'required',
            'store_id' => 'required',
        ]);
   
        if($validator->fails()){
            return $this->sendError('Bad request.', 400);       
        }
   
        $article = Article::create($input);

        return $this->sendResponse(new ArticleResource($article), 'Article created successfully.');
    }

    public function update(Request $request, Article $article)
    {
        $input = $request->all();
   
        $validator = Validator::make($input, [
            'name' => 'required',
            'description' => 'required',
            'price' => 'required',
            'total_in_shelf' => 'required',
            'total_in_vault' => 'required',
        ]);
   
        if($validator->fails()){
            return $this->sendError('Bad request', 400);       
        }

        $article = Article::find($input['id']);
        
        $article->name = $input['name'];
        $article->description = $input['description'];
        $article->price = $input['price'];
        $article->total_in_shelf = $input['total_in_shelf'];
        $article->total_in_vault = $input['total_in_vault'];

        $article->save();
   
        return $this->sendResponse(new ArticleResource($article), 'Article updated successfully.');
    }


    public function softDelete($id)
    {
        if(is_int($id)) { 
            return $this->sendError('Bad request.', 400);
        }

        $article = Article::destroy($id);
        if ($article) {
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
            $art = "Articles";
        } else {
            $art = "Article";
        }
    	$response = [
            
            $art    => $result,
            'success' => true,
            'total_elements' => $count,
        ];


        return response()->json($response, 200);
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
