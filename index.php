<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="utf-8">
  <title>Macellan</title>

  <link rel="stylesheet" href="assets/css/fonts.css">
  <link rel="stylesheet" href="assets/css/reset.css">
  <link rel="stylesheet" href="assets/css/anims.css">
  <link rel="stylesheet" href="assets/css/main.css">

</head>
<body>
  
  <div id="controller">
    <label>Deniz Seviyesi</label>
    <input type="range" id="DENIZ_GORUNEN" max=100 min=10>
    <label>Viewport</label>
    <input type="range" id="OPTIMIZED_WIDTH" min=1500 max=7000 step=200>
  </div>

  <div id="canvas">
    
    <div class="yuzey">
      <div class="gemi"></div>

      <div class="sahne-1">
        <div class="text-1">
          <p><b>Macellan</b>'ın Mürettebatında<br>Keşfe Çıkmak İster Misin?</p>
          <p class="small">Devam etmek için gemiye tıklayın.</p>
        </div>
        <div class="buzul buzul-1"></div>
        <div class="buzul2 buzul-2"></div>
        <div class="buzul3 buzul-3"></div>
        <div class="buzul buzul-4"></div>
      </div><!-- /sahne-1 -->

      <div class="sahne-2">
        <div class="buzul4 buzul-1"></div>
        <div class="buzul buzul-2"></div>
      </div><!-- /sahne-2 -->

      <div class="sahne-3">
        <div class="text-1">
          <p>Mürettebatımıza Katıldığında<br>Sana Sunacaklarımız:</p>
          <p class="small">
            27" iMac Late 2013 <br>
            Sınırsız çay, kahve<br>
            Yol masrafı <br>
            Yemek <br>
            Hey şey süperse devam edelim!
          </p>
        </div>
        <div class="agac"></div>
        <div class="agac-top"></div>
        <div class="yesil-alan"></div>
        <div class="yesil-alan-taban"></div>
      </div>

    </div><!-- /yuzey -->
    
    <div class="deniz">
      <div class="dalga-1"></div>
      <div class="dalga-2"></div>
      <div class="taban-1"></div>
    </div><!-- /deniz -->

  </div><!-- /canvas -->

  <script src="assets/js/jquery-2.1.1.min.js"></script>
  <script src="assets/js/jquery.transit.min.js"></script>
  <script src="assets/js/velocity.min.js"></script>
  <script>

    function denizHareket () {
      $(".dalga-1").css({ transform: "translateX(-200px)" });
      $(".dalga-2").css({ transform: "translateX(200px)" });
      $(".taban-1").css({ transform: "translateX(-100px)" });

      setTimeout(function(){
        $(".dalga-1").css({ transform: "translateX(0px)" });
        $(".dalga-2").css({ transform: "translateX(0px)" });
        $(".taban-1").css({ transform: "translateX(0px)" });
      }, 5000);

      setTimeout(function(){
        denizHareket();
      }, 10000);
    }


    function gemiHareket () {
      $(".gemi").velocity({ translateY:'25px' }, { duration: 5000, easing: "ease" })
        .velocity({ translateY:'0px' }, { duration: 5000, easing: "ease" });
      
      setTimeout(function(){
        gemiHareket();
      }, 10000);
    }

    // default degerler
    var SAHNE = 1;
    var SAHNE_ANIM = false;
    var DEFAULT_DURATION = 3000;

    function sahne_degis (no) {
      if (SAHNE_ANIM) return;

      // sayfayi kilitle
      SAHNE_ANIM = true;
      SAHNE = no;

      // animasyon sonunda sayfa kilidini kaldir
      setTimeout(function(){
        SAHNE_ANIM = false;
      }, DEFAULT_DURATION);

      // sahneler
      switch (SAHNE) {
        case 1:
          $("#canvas").velocity({ translateX:'0', translateZ: 0 }, 
                              { duration: DEFAULT_DURATION, easing: "ease-in-out", queue: false });
          $(".gemi").velocity({ translateX:'0', scale:'1', marginBottom: "0px" },
                              { duration: DEFAULT_DURATION, queue: false, easing: [.58,.01,.58,1] });
          $(".sahne-1 .buzul-3").velocity({ translateX: "0px", tranzlateZ: 0 },
                              { duration: DEFAULT_DURATION, queue: false });
          break;

        case 2:
          $("#canvas").velocity({ translateX:'-2250px', translateZ: 0 }, 
                              { duration: DEFAULT_DURATION, easing: "ease-in-out", queue: false });
          $(".gemi").velocity({ translateX:'2600px', scale:'1.3', marginBottom: "170px" },
                              { duration: DEFAULT_DURATION, queue: false, easing: [.58,.01,.58,1] });
          $(".sahne-1 .buzul-3").velocity({ translateX: "-700px", tranzlateZ: 0 },
                              { duration: DEFAULT_DURATION, queue: false });

          // 3. sahneye gec
          setTimeout(function(){
            sahne_degis(3);
          }, DEFAULT_DURATION);
          break;

        case 3:
          $("#canvas").velocity({ translateX:'-6050px', translateZ: 0 },
                              { duration: DEFAULT_DURATION, easing: "ease-in-out", queue: false });
          $(".gemi").velocity({ translateX:'6000px', scale:'1', marginBottom: "0px" },
                              { duration: DEFAULT_DURATION, queue: false, easing: [.58,.01,.58,1] });
          setTimeout(function(){
            $(".agac-top").addClass("animation-bounce");
          }, DEFAULT_DURATION + 1000);
          break;

        default:
          // 1. sahneyi oynat
          SAHNE = 1;
          $("#canvas").velocity({ translateX:'0', translateZ: 0 }, 
                              { duration: DEFAULT_DURATION, easing: "ease-in-out", queue: false });
          $(".gemi").velocity({ translateX:'0', scale:'1', marginBottom: "0px" },
                              { duration: DEFAULT_DURATION, queue: false, easing: [.58,.01,.58,1] });
          $(".sahne-1 .buzul-3").velocity({ translateX: "0px", tranzlateZ: 0 },
                              { duration: DEFAULT_DURATION, queue: false });
          break;
      }
    }

    function sonraki_sahne () {
      sahne_degis( SAHNE+1 );
    }

    // OPTIMIZE CANVAS SIZE
    var OPTIMIZED_WIDTH = 2500;
    var DENIZ_GORUNEN = 30;
    $window = $(window);

    function resized () {
      var factor_x = Math.round($window.width() / OPTIMIZED_WIDTH * 100) / 100;
      $('#canvas').velocity({ scale: factor_x, translateZ: 0 }, { duration: 0 });

      $(".deniz").height( $window.height() / factor_x / 100 * DENIZ_GORUNEN );
      $(".yuzey").css({
        "bottom": ($(".deniz").height())+"px",
        "height": (($window.height() / factor_x) - ($(".deniz").height()+50))+"px",
      });
    }


    // READY
    $(function(){
      // initialize
      setTimeout(function(){
        denizHareket();
        gemiHareket();
      }, 1);

      // resize oldugunda
      $(window).resize(function(){
        resized();
      });
      resized();

      // canvas controller
      $("#DENIZ_GORUNEN").val( DENIZ_GORUNEN );
      $("#OPTIMIZED_WIDTH").val( OPTIMIZED_WIDTH );
      $("#controller input").on("input", function(e){
        DENIZ_GORUNEN = $("#DENIZ_GORUNEN").val();
        OPTIMIZED_WIDTH = $("#OPTIMIZED_WIDTH").val();
        resized();
      });

      // gemiye tıklandığında sonraki sahneye gec
      $(".gemi").on("click", function(){
        sonraki_sahne();
      });
    });

  </script>
</body>
</html>