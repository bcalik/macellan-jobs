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
          <p><b>Macellan</b>'ın Mürettebatına Katılıp<br>Keşfe Çıkmak İster Misin?</p>
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
          <p>Bizimle Keşfe Çıkarken<br>Sana Sunacaklarımız:</p>
          <p class="small">
            27" iMac Late 2013 <br>
            Sınırsız çay, kahve<br>
            Yol masrafı <br>
            Yemek <br><br>
            Hey şey süperse devam edelim!
          </p>
        </div>
        <div class="agac"></div>
        <div class="agac-top"></div>
        <div class="yesil-alan"></div>
        <div class="yesil-alan-taban"></div>
      </div><!-- /sahne-3 -->

      <div class="sahne-4">
        <div class="text-1">
          <p>Yolculukta Kullanacağın<br>Envanterini Hazırla !</p>
        </div>

        <div class="envanter">
          <div class="sira">
            <div class="item disabled html5"><span>HTML5</span></div>
            <div class="item disabled css3 bigtext"><span>CSS3</span></div>
            <div class="item disabled less bigtext"><span>LESS</span></div>
            <div class="item disabled sass bigtext"><span>SASS</span></div>
            <div class="item disabled javascript"><span>Javascript</span></div>
            <div class="item disabled php bigtext"><span>PHP</span></div>
            <div class="item disabled laravel"><span>Laravel</span></div>
          </div>
          <div class="sira">
            <div class="item disabled mysql"><span>MySQL</span></div>
            <div class="item disabled mongodb"><span>MongoDB</span></div>
            <div class="item disabled expressjs"><span>ExpressJS</span></div>
            <div class="item disabled angularjs"><span>AngularJS</span></div>
            <div class="item disabled nodejs"><span>NodeJS</span></div>
            <div class="item disabled git bigtext"><span>Git</span></div>
            <div class="item disabled photoshop"><span>Photoshop</span></div>
            <div class="item disabled sketch"><span>Sketch</span></div>
          </div>
        </div>

        <div class="ot1 ot-1"></div>
        <div class="balik-suru suru-1"></div>
        <div class="balik-suru suru-2"></div>
        <div class="balik balik-1"></div>
        <div class="balik balik-2"></div>
        <div class="balik balik-3"></div>
        <div class="kaplumbaga kaplumbaga-1">
          <div class="sol"></div>
          <div class="govde"></div>
          <div class="sag"></div>
        </div>
      </div><!-- /sahne-4 -->

    </div><!-- /yuzey -->
    
    <div class="deniz">
      <div class="dalga-1"></div>
      <div class="dalga-2"></div>
      <div class="taban-1"></div>
      <div class="toprak"></div>
    </div><!-- /deniz -->

  </div><!-- /canvas -->

  <script src="assets/js/jquery-2.1.1.min.js"></script>
  <!-- <script src="assets/js/jquery.transit.min.js"></script> -->
  <script src="assets/js/velocity.min.js"></script>
  <script src="assets/js/main.js?v=<?=time()?>"></script>
  
</body>
</html>