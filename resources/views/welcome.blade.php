<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
    @include('includes.head')

        
    </head>
    <body>
    
        <div class="flex-center full-height">
        

          <div class="content">
          <header class="row">
        @include('includes.header')
    </header>
              <div class="title m-b-md">
                  < ECP GAP Test - Feb 2020>
              </div>

          </div>

          
        </div>
        <footer class="row">
        @include('includes.footer')
    </footer>
    </body>
</html>
