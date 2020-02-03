<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;

class AuthBasic
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {

        //Original version.
        
        if($request->getUser() != env('API_USERNAME') || $request->getPassword() != env('API_PASSWORD')) {
            $headers = array('WWW-Authenticate' => 'Basic');
            return response()->json(['success' => false, 'error' => 401, 'error_msg' => 'Not Authorized']);
        } else {
            return $next($request);
        }
        
        /*
        if($request->getUser() != env('API_USERNAME') || $request->getPassword() != env('API_PASSWORD')) {
            return $next($request);
        } else {
            

            $headers = array('WWW-Authenticate' => 'Basic');
            return response()->json(['success' => false, 'error' => 401, 'error_msg' => 'Not Authorized']);
        }
        */

    }
}
