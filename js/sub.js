$(function () {

  AOS.init();
  
  const speed = 500;

  // depth1 메뉴
  $('.depth1-lnb-btn').on('click', function (e) {
    e.preventDefault();

    const item = $(this).closest('.depth1-item');

    // depth2 전체 닫기
    $('.depth2-item')
      .removeClass('active')
      .find('.depth2-dropdown')
      .stop(true)
      .slideUp(speed);

    // depth1 닫기
    $('.depth1-item').not(item)
      .removeClass('active')
      .find('.depth1-dropdown')
      .stop(true)
      .slideUp(speed);

    // 현재 토글
    if (item.hasClass('active')) {
      item.removeClass('active');
      item.find('.depth1-dropdown')
        .stop(true)
        .slideUp(speed);
    } else {
      item.addClass('active');
      item.find('.depth1-dropdown')
        .stop(true)
        .slideDown(speed);
    }
  });


  // depth2 메뉴
  $('.depth2-lnb-btn').on('click', function (e) {
    e.preventDefault();

    const item = $(this).closest('.depth2-item');

    // depth1 전체 닫기
    $('.depth1-item')
      .removeClass('active')
      .find('.depth1-dropdown')
      .stop(true)
      .slideUp(speed);

    // depth2 닫기
    $('.depth2-item').not(item)
      .removeClass('active')
      .find('.depth2-dropdown')
      .stop(true)
      .slideUp(speed);

    // 현재 토글
    if (item.hasClass('active')) {
      item.removeClass('active');
      item.find('.depth2-dropdown')
        .stop(true)
        .slideUp(speed);
    } else {
      item.addClass('active');
      item.find('.depth2-dropdown')
        .stop(true)
        .slideDown(speed);
    }
  });



  // 바깥 클릭 시 전체 닫기
  $(document).on('click', function (e) {
    if (!$(e.target).closest('.depth1-item, .depth2-item').length) {

      $('.depth1-item, .depth2-item')
        .removeClass('active');

      $('.depth1-dropdown, .depth2-dropdown')
        .stop(true)
        .slideUp(speed);
    }
  });



  // # 임시 링크 막기
  // $("a[href='#']").on('click', function (e) {
  //   e.preventDefault();
  // });

});
