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
var DEFAULT_DURATION = 250;

function sahne_degis (no) {
  if (SAHNE_ANIM) return;

  // sayfayi kilitle
  SAHNE_ANIM = true;
  SAHNE = no;

  // animasyon sonunda sayfa kilidini kaldır
  setTimeout(function(){
    SAHNE_ANIM = false;
  }, DEFAULT_DURATION);

  // sahneler
  switch (SAHNE) {
    case 1:
      // gemiyi ve görüntüyü başlangıç noktasına getir
      $("#canvas").velocity({ translateX:'0', translateZ: 0 }, 
                          { duration: DEFAULT_DURATION, easing: "ease-in-out", queue: false });
      $(".gemi").velocity({ translateX:'0', scale:'1', marginBottom: "0px" },
                          { duration: DEFAULT_DURATION, queue: false, easing: [.58,.01,.58,1] });
      $(".sahne-1 .buzul-3").velocity({ translateX: "0px", tranzlateZ: 0 },
                          { duration: DEFAULT_DURATION, queue: false });
      break;

    case 2:
      // gemiyi ve görüntüyü buzul alana yanaştır
      $("#canvas").velocity({ translateX:'-2250px', translateZ: 0 }, 
                          { duration: DEFAULT_DURATION, easing: "ease-in-out", queue: false });
      $(".gemi").velocity({ translateX:'2600px', scale:'1.2', marginBottom: "120px" },
                          { duration: DEFAULT_DURATION, queue: false, easing: [.58,.01,.58,1] });
      $(".sahne-1 .buzul-3").velocity({ translateX: "-700px", tranzlateZ: 0 },
                          { duration: DEFAULT_DURATION, queue: false });

      // 3. sahneye gec
      setTimeout(function(){
        sahne_degis(3);
      }, DEFAULT_DURATION);
      break;

    case 3:
      // gemiyi ve görüntüyü yesil alana yanaştır
      $("#canvas").velocity({ translateX:'-6050px', translateZ: 0 },
                          { duration: DEFAULT_DURATION, easing: "ease-in-out", queue: false });
      $(".gemi").velocity({ translateX:'6000px', scale:'1', marginBottom: "0px" },
                          { duration: DEFAULT_DURATION, queue: false, easing: [.58,.01,.58,1] });
      setTimeout(function(){
        $(".agac-top").addClass("animation-bounce");
      }, DEFAULT_DURATION + 1000);
      break;

    case 4:
      $("#canvas").velocity({ translateX:'-8550px', translateZ: 0 },
                          { duration: DEFAULT_DURATION/2, easing: "ease-in-out", queue: false });
      $(".gemi").velocity({ translateX:'9000px', scale:'1', marginBottom: "0px" },
                          { duration: DEFAULT_DURATION/2, queue: false, easing: [.58,.01,.58,1] });

      // goruntuyu denize indir
      setTimeout(function(){
        DENIZ_GORUNEN = 90;
        var newH = $window.height() / SCALE / 100 * DENIZ_GORUNEN;
        $(".deniz").velocity({ height: newH },
          { duration: DEFAULT_DURATION/2, easing: "ease-in-out", queue: false });
        $(".yuzey").velocity({
          "bottom": (newH)+"px",
          "height": (($window.height() / SCALE) - (newH+50))+"px",
        }, { duration: DEFAULT_DURATION/2, easing: "ease-in-out", queue: false });

        // $("#canvas").velocity({ translateY:'-1000px', translateZ: 0 },
        //                      { duration: DEFAULT_DURATION/2, easing: "ease-in-out", queue: false });
      }, DEFAULT_DURATION/2);
      break;

    case 5:
      // görüntüyü denizden yukarı çıkart
      DENIZ_GORUNEN = DENIZ_GORUNEN_DEFAULT;
      var newH = $window.height() / SCALE / 100 * DENIZ_GORUNEN;
      $(".deniz").velocity({ height: newH },
        { duration: DEFAULT_DURATION/2, easing: "ease-in-out", queue: false });
      $(".yuzey").velocity({
        "bottom": (newH)+"px",
        "height": (($window.height() / SCALE) - (newH+50))+"px",
      }, { duration: DEFAULT_DURATION/2, easing: "ease-in-out", queue: false });
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
var DENIZ_GORUNEN_DEFAULT = 30;
var DENIZ_GORUNEN = DENIZ_GORUNEN_DEFAULT;
var SCALE = 0;
$window = $(window);

function resized () {
  SCALE = Math.round($window.width() / OPTIMIZED_WIDTH * 100) / 100;
  $('#canvas').velocity({ scale: SCALE, translateZ: 0 }, { duration: 0 });

  $(".deniz").height( $window.height() / SCALE / 100 * DENIZ_GORUNEN );
  $(".yuzey").css({
    "bottom": ($(".deniz").height())+"px",
    "height": (($window.height() / SCALE) - ($(".deniz").height()+50))+"px",
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