<!doctype html>
<html lang="<?php echo e(str_replace('_', '-', app()->getLocale())); ?>">
    <head>
    <?php echo $__env->make('includes.head', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?>

        
    </head>
    <body>
    
        <div class="flex-center full-height">
        

          <div class="content">
          <header class="row">
        <?php echo $__env->make('includes.header', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?>
    </header>
              <div class="title m-b-md">
                  < ECP GAP Test - Feb 2020>
              </div>

          </div>

          
        </div>
        <footer class="row">
        <?php echo $__env->make('includes.footer', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?>
    </footer>
    </body>
</html>
<?php /**PATH /home/vagrant/LaravelProjects/gapTest/resources/views/welcome.blade.php ENDPATH**/ ?>