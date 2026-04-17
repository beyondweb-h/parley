// 사이트맵 js
$(function () {
  // 애니메이션 On Scroll 플러그인 실행
  AOS.init();

  // 변수
  const body = "body";
  const $header = $('#pl-hd');
  const $depth1 = $('.depth1');
  const $util = $('.util-menu');
  const $gnb = $('#pl-gnb');
  const sitemap = ".pl-sitemap"; 
  const smBtn = ".btn-sitemap";
  const closeBtn = ".close-btn";
  const smMainMenu = ".sm-depth1 > a";
  const smSubMenu = ".sm-depth2";
  const btnLang = ".btn-lang";
  const btnList = ".btn-list";
  const speed = 500;

  // 🔥 모바일 체크 함수 (PC / 모바일 분리용)
  const isMobile = () => window.innerWidth < 768;

  $(function () {

    // depth1 마우스 올리면 열림
    $depth1.on('mouseenter', function () {
      $header.addClass('sub-open'); 
    });

    // 유틸 메뉴에 마우스 올리면 열림
    $util.on('mouseenter', function () {
      $header.addClass('sub-open');
    });

    // 유틸 메뉴에서 마우스 벗어나면 닫힘
    $util.on('mouseleave', function () {
      $header.removeClass('sub-open');
    });

    // 헤더 전체 영역에서 마우스가 벗어나면 닫힘
    $header.on('mouseleave', function () {
      $header.removeClass('sub-open');
    });

    // 사이트맵 열기
    $(smBtn).on('click', function (e) {
      e.preventDefault();

      $(body).addClass("fixed");
      $(sitemap).addClass("active");
      lenis.stop(); 
    });

    // 사이트맵 닫기
    $(closeBtn).on('click', function () {
      $(body).removeClass("fixed");
      $(sitemap).removeClass("active");
      lenis.start();
    });

    // 뎁스2오픈 (모바일에서만 작동)
    $(smMainMenu).on('click', function (e) {

      // PC / 태블릿은 아무 동작 안 함
      if (!isMobile()) return;

      e.preventDefault();

      const parent = $(this).parent();
      const subMenu = parent.find(".sm-depth2");

      // 다른 메뉴 닫기
      $('.sm-depth1').not(parent)
        .removeClass('active')
        .find('.sm-depth2')
        .stop(true)
        .animate({ height: 0 }, speed);

      // 현재 메뉴 열기/닫기
      if (parent.hasClass('active')) {
        parent.removeClass('active');
        subMenu.stop(true).animate({ height: 0 }, speed);
      } else {
        parent.addClass('active');

        // 실제 높이 계산
        const fullHeight = subMenu.prop('scrollHeight');
        subMenu.stop(true).animate({ height: fullHeight }, speed);
      }

    });

  });

  // 언어 선택 메뉴
  $(btnLang).click(function(){
    $(this).next(".lang-list").stop().slideToggle(speed);
  });

  // 부드러운 스크롤
  const lenis = new Lenis({
    lerp: 0.07, // < 속도 조절때만 수치 변경
    smoothWheel: true,
    smoothTouch: false // < 기본값
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  // 상태 감지 함수
  function checkFixed() {
    if (document.body.classList.contains('fixed')) {
      lenis.stop();   // 스크롤 완전 정지
    } else {
      lenis.start();  // 다시 활성화
    }
  }

  window.lenis = lenis;

  // 임시링크 문서 꼭대기로 이동하는 것 막아주기
  const blankAnchor = $("a[href='#']")
  blankAnchor.click(function(e){
    e.preventDefault();
  });

});