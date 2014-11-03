function denizHareket () {
  $(".dalga-1").css({ transform: "translateX(-100px)" });
  $(".dalga-2").css({ transform: "translateX(200px)" });
  $(".taban-1").css({ transform: "translateX(-300px)" });

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

  // animasyon sonunda sayfa kilidini kaldır
  setTimeout(function(){
    SAHNE_ANIM = false;
  }, DEFAULT_DURATION);

  // sahneler
  switch (SAHNE) {
    case 1:
      // arkaplan rengi
      // $("body").velocity({ backgroundColor: "#F0F6F7" }, { duration: DEFAULT_DURATION });

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
      // arkaplan rengi
      // $("body").velocity({ backgroundColor: "#B3E8FF" }, { duration: DEFAULT_DURATION });
      // gemiyi ve görüntüyü yesil alana yanaştır
      $("#canvas").velocity({ translateX:'-6050px', translateZ: 0 },
                          { duration: DEFAULT_DURATION, easing: "ease-in-out", queue: false });
      $(".gemi").velocity({ translateX:'6000px', scale:'1', marginBottom: "0px" },
                          { duration: DEFAULT_DURATION, queue: false, easing: [.58,.01,.58,1] });
      
      $(".sahne-4 .envanter .item").css({ opacity: 0, transform: "translateY(-30px)" });
      $(".sahne-4 .text-1").css({ opacity: 0, transform: 'translateY(-100px)' });

      setTimeout(function(){
        $(".agac-top").addClass("animation-bounce");
      }, DEFAULT_DURATION + 1000);
      break;


    case 4:
      $("#canvas").velocity({ translateX:'-8550px', translateZ: 0 },
                          { duration: DEFAULT_DURATION/3*2, easing: "ease-in-out", queue: false });
      $(".gemi").velocity({ translateX:'9000px', scale:'1', marginBottom: "0px" },
                          { duration: DEFAULT_DURATION/3*2, queue: false, easing: [.58,.01,.58,1] });

      // goruntuyu denize indir
      setTimeout(function(){
        DENIZ_GORUNEN = 90;
        var newH = $window.height() / SCALE / 100 * DENIZ_GORUNEN;
        $(".deniz").velocity({ height: newH },
          { duration: 0, easing: "ease-in-out", queue: false });
        $(".yuzey").velocity({
          "bottom": (newH)+"px",
          "height": (($window.height() / SCALE) - (newH+50))+"px",
        }, { duration: 0, easing: "ease-in-out", queue: false });

        var canvasH = $window.height() / SCALE / 100 * (DENIZ_GORUNEN-DENIZ_GORUNEN_DEFAULT);
        $("#canvas").velocity({ translateY: canvasH+"px" }, { duration: 0 });
        $("#canvas").velocity({ translateY: "0px" }, { duration: DEFAULT_DURATION, queue: false });

        // demir ve halat
        $('.gemi .halat').velocity({ height: '400px' }, { duration: DEFAULT_DURATION/3*2 });
        $('.gemi .demir').velocity({ translateY: '400px', rotateZ: '-30deg' }, { duration: DEFAULT_DURATION/3*2 });

        // demir, halat glow
        setTimeout(function(){
          $('.gemi .demir, .gemi .halat').addClass('animation-glow');
        }, DEFAULT_DURATION+500);

        // baliklar
        $(".sahne-4 .balik").velocity({ translateX: '500px', translateZ: 0 },
          { duration: 100000, easing: "linear", queue: false });
        $(".sahne-4 .balik-suru").velocity({ translateX: '1000px', translateZ: 0 },
          { duration: 100000, easing: "linear", queue: false });
        $(".sahne-4 .kaplumbaga").velocity({ translateY: '-500px', translateX: '250px', translateZ: 0 },
          { duration: 100000, easing: "linear", queue: false });          

        // envanter
        setTimeout(function(){
          $(".sahne-4 .text-1").velocity({ opacity: 1, translateY: '0px' }, { duration: DEFAULT_DURATION/3*2 });
        }, DEFAULT_DURATION/3);

        setTimeout(function(){
          var timer = 0;
          $(".sahne-4 .envanter .item").each(function(){
            timer += 75;
            setTimeout(function($item){
              $item.css({ transform: "translateY(0px)", opacity: 1 });
            }, timer, $(this));
          });
        }, DEFAULT_DURATION/3*2);

      }, DEFAULT_DURATION/3*2);
      break;


    case 5:
      // demir ve halat
      $('.gemi .demir, .gemi .halat').removeClass('animation-glow');
      $('.gemi .halat').velocity({ height: '0px' }, { duration: DEFAULT_DURATION/3*2 });
      $('.gemi .demir').velocity({ translateY: '0px', rotateZ: '0deg' }, { duration: DEFAULT_DURATION/3*2 });

      var canvasH = $window.height() / SCALE / 100 * (DENIZ_GORUNEN-DENIZ_GORUNEN_DEFAULT);
      $("#canvas").velocity({ translateY: canvasH+"px" }, { duration: DEFAULT_DURATION, queue: false });

      setTimeout(function(){
        DENIZ_GORUNEN = DENIZ_GORUNEN_DEFAULT;
        var newH = $window.height() / SCALE / 100 * DENIZ_GORUNEN;
        $(".deniz").velocity({ height: newH },
          { duration: 0, easing: "ease-in-out", queue: false });
        $(".yuzey").velocity({
          "bottom": (newH)+"px",
          "height": (($window.height() / SCALE) - (newH+50))+"px",
        }, { duration: 0, easing: "ease-in-out", queue: false });

        $("#canvas").velocity({ translateY: "0px" }, { duration: 0 });

        sonraki_sahne();
      }, DEFAULT_DURATION);
      break;

    case 6:
      // demir ve halatin glow efektini kaldir
      $('.gemi .demir, .gemi .halat').removeClass('animation-glow');

      // arkaplan rengi
      // $("body").velocity({ backgroundColor: "#F0F6F7" }, { duration: DEFAULT_DURATION/3*2 });

      $("#canvas").velocity({ translateX:'-11600px', translateZ: 0 },
                          { duration: DEFAULT_DURATION/3*2, easing: "ease-in-out", queue: false });
      $(".gemi").velocity({ translateX:'11000px', scale:'1', marginBottom: "0px" },
                          { duration: DEFAULT_DURATION/3*2, queue: false, easing: [.58,.01,.58,1] });

      setTimeout(function(){
        var offsetTop = $(".sahne-6 .form").offset().top - 30;
        if (offsetTop < 0) {
          offsetTop = (offsetTop * -1) / SCALE;
          $("#canvas").velocity({ translateY:offsetTop+'px', translateZ: 0 },
            { duration: DEFAULT_DURATION/3, easing: "ease-in-out", queue: false });      
        }

        setTimeout(function(){
          $(".sahne-6 input").first().focus();
        }, DEFAULT_DURATION/3 );
      }, DEFAULT_DURATION/3*2);
      break;

    default:
      // 1. sahneyi oynat
      $("#canvas").velocity({ translateY:'0px', translateZ: 0 },
        { duration: DEFAULT_DURATION, easing: "ease-in-out", queue: false });

      SAHNE = 1;
      $("#canvas").velocity({ translateX:'0', translateZ: 0 }, 
                          { duration: DEFAULT_DURATION, easing: "ease-in-out", queue: false });
      $(".gemi").velocity({ translateX:'0', scale:'1', marginBottom: "0px" },
                          { duration: DEFAULT_DURATION, queue: false, easing: [.58,.01,.58,1] });
      $(".sahne-1 .buzul-3").velocity({ translateX: "0px", tranzlateZ: 0 },
                          { duration: DEFAULT_DURATION, queue: false });

      // baliklar
      $(".sahne-4 .balik").velocity({ translateX: '0px', translateZ: 0 },
        { duration: 0, easing: "linear", queue: false });
      $(".sahne-4 .balik-suru").velocity({ translateX: '0px', translateZ: 0 },
        { duration: 0, easing: "linear", queue: false });
      $(".sahne-4 .kaplumbaga").velocity({ translateY: '0px', translateX: '0px', translateZ: 0 },
        { duration: 0, easing: "linear", queue: false });

      break;
  }
}

function sonraki_sahne () {
  sahne_degis( SAHNE+1 );
}

// OPTIMIZE CANVAS SIZE
var OPTIMIZED_WIDTH = 2500;
var DENIZ_GORUNEN_DEFAULT = 15;
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

// form fonksyonları
function sonraki_form (argument) {
  $(".form .sayfa-1").velocity({ translateX: "-950px", opacity: 0, translateZ: 0 }, { duration: 300, easing: "ease-in-out" });
  $(".form .sayfa-2").velocity({ translateX: "-950px", opacity: 1, translateZ: 0 }, { duration: 300, easing: "ease-in-out" });
  $(".sayfa-2 textarea").first().focus();
}
function onceki_form (argument) {
  $(".form .sayfa-1").velocity({ translateX: "0px", opacity: 1, translateZ: 0 }, { duration: 300, easing: "ease-in-out" });
  $(".form .sayfa-2").velocity({ translateX: "0px", opacity: 0, translateZ: 0 }, { duration: 300, easing: "ease-in-out" });
  $(".sayfa-1 input").first().focus();
}

// READY
$(function(){
  // initialize
  setTimeout(function(){
    denizHareket();
    gemiHareket();
    $(".sahne-1 .text-1").css({ transform: 'translateY(0px)', opacity: 1 });
    resized();
  }, 1);

  // resize oldugunda
  $(window).resize(function(){
    resized();
  });
  resized();

  // envanter yonetimi
  $('.envanter .item').on("click", function(){
    $(this).toggleClass("disabled");
    $(this).toggleClass("animation-scale-bounce");
    
    $("#envanter").val("");
    $('.envanter .item').each(function(){
      if ( ! $(this).hasClass('disabled')) {
        $("#envanter").val( $.trim($('#envanter').val() + " " + $(this).text()) );
      }
    });
  });

  // canvas controller
  $("#DENIZ_GORUNEN").val( DENIZ_GORUNEN );
  $("#OPTIMIZED_WIDTH").val( OPTIMIZED_WIDTH );
  $("#controller input").on("input", function(e){
    DENIZ_GORUNEN = $("#DENIZ_GORUNEN").val();
    OPTIMIZED_WIDTH = $("#OPTIMIZED_WIDTH").val();
    resized();
  });

  // gemiye tıklandığında sonraki sahneye gec
  $(".gemi, .sahne-4 .devam-btn").on("click", function(){
    sonraki_sahne();
  });
});