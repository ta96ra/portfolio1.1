$(function(){
  // ナビゲーションウィンドウのクリックイベント
  $('.bi-list').click(function(){
    if($(this).hasClass('open')){
      $(this).removeClass('open');
      $('.nav-window').slideUp(300);
    }else{
      $(this).addClass('open');
      $('.nav-window').slideDown(300);
    }
  });

  // ロゴのトップのスクロール 
  $('header .logo a').click(function(){
    $('html,body').animate({
      scrollTop:0
    },500);
    });
   
  // ナビゲーションスクロール
  $('header li a').click(function(){
    var id = $(this).attr('href');
    var position = $(id).offset().top;
    $('html,body').animate({
      'scrollTop':position - 60
    },500);
  });

  // スキル、実績・制作物フェード
  var effect_btm = 300; // 画面下からどの位置でフェードさせるか(px)
  var effect_move = 50; // どのぐらい要素を動かすか(px)
  var effect_time = 800; // エフェクトの時間(ms) 1秒なら1000

    //親要素と子要素のcssを定義
  $('.scroll-fade-row').css({
      opacity: 0
  });
  $('.scroll-fade-row').children().each(function(){
      $(this).css({
          opacity: 0,
          transform: 'translateY('+ effect_move +'px)',
          transition: effect_time + 'ms'
      });
  });

    // スクロールまたはロードするたびに実行
  $(window).on('scroll load', function(){
      var scroll_top = $(this).scrollTop();
      var scroll_btm = scroll_top + $(this).height();
      var effect_pos = scroll_btm - effect_btm;

      //エフェクトが発動したとき、子要素をずらしてフェードさせる
      $('.scroll-fade-row').each( function() {
          var this_pos = $(this).offset().top;
          if ( effect_pos > this_pos ) {
              $(this).css({
                  opacity: 1,
                  transform: 'translateY(0)'
              });
              $(this).children().each(function(i){
                  $(this).delay(100 + i*200).queue(function(){
                      $(this).css({
                          opacity: 1,
                          transform: 'translateY(0)'
                      }).dequeue();
                  });
              });
          }
      });
  });

  // 実績・制作物のホバーイベント
  $('.work-item').hover(function(){
    $(this).find('h3')
      .css({
        'transform':'scale(1.125,1.125)',
        'transition-duration':'0.5s',
        'z-index':3,
      });
    $(this).find('.min-black').fadeIn(500);

  },function(){
    $(this).find('h3')
      .css({
        'transform':'scale(1,1)',
        'transition-duration':'0.5s',
        'z-index':3,
      });
    $(this).find('.min-black').fadeOut(500);
  });

  // 実績・制作物のクイックイベント（modal）
  $('.work-item').click(function(){
    $('.modal').fadeIn(500);
    var fullSrc = $(this).attr('data-src'); 
    $('.modal img').attr('src',fullSrc);
  });

  $('.modal-close').click(function(){
    $('.modal').fadeOut(500);
  });

});