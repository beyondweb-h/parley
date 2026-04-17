
// 히어로 영역 구현
$(function(){
  const vTxtItem = $(".v-txt-item");
  let current = 0;
  const speed = 4000;

  function startTextAnimation(item) {
    const txt = item.find(".txt");
    const txtS = item.find(".txt-s");

    txt.removeClass("enter exit");
    txtS.removeClass("enter exit");
    
    setTimeout(() => {
      txt.addClass("enter");
      txtS.addClass("enter");
    }, 50);

    setTimeout(() => {
      txt.removeClass("enter").addClass("exit");
      txtS.removeClass("enter").addClass("exit");
    }, speed -800);
  }

  function showNextText(){
    vTxtItem.removeClass("active");
    const next = vTxtItem.eq(current);
    next.addClass("active");
    startTextAnimation(next);

    // 인덱스 업데이트
    current = (current + 1) % vTxtItem.length;
  }

    // 초기 실행
    showNextText();
    // 자동반복
    setInterval(showNextText, speed);
});

// 컴퍼니 영역 구현
$(function(){

  const companyData = {
    company: {
      desc: "바다를 향한 새로운 정의를 통해 인류와 자연이 공존하는 지속 가능한 산업의 토대를 구축합니다.",
      img: "./images/company/company_1.jpg"
    },
    vision: {
      desc: "혁신적인 전략으로 해양 환경을 보호하고 지속 가능한 미래를 만듭니다.",
      img: "./images/company/company_2.png"
    },
    value: {
      desc: "책임과 투명성을 기반으로 새로운 환경 기준을 제시합니다.",
      img: "./images/company/company_3.jpg"
    }
  };

  let isAnimating = false;

  const $imgBox = $(".company-img-box");
  const $img = $(".company-img-box img");
  const $visual = $(".company-visual");

  /* 🔥 섹션 진입 시 최초 실행 */
  let hasPlayed = false;

  const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

      if (entry.isIntersecting && !hasPlayed) {

        hasPlayed = true;

        /* 1️⃣ 첫 버튼 활성화 */
        $(".tab-btn").removeClass("active");
        $(".tab-btn").first().addClass("active");

        /* 2️⃣ 첫 데이터 세팅 */
        const firstData = companyData.company;
        $img.attr("src", firstData.img);
        $visual.attr("data-bg", "company");
        $(".company-desc-text").text(firstData.desc);

        /* 3️⃣ 애니메이션 실행 */
        setTimeout(() => {
          $imgBox.addClass("mask-play");
        }, 300);

      }

    });

  }, {
    threshold: 0.4
  });

  /* 감시 시작 */
  observer.observe(document.querySelector(".main-section-company"));

  $(".tab-btn").on("click", function () {

    if (isAnimating) return;
    isAnimating = true;

    const tab = $(this).data("tab");
    const data = companyData[tab];
    if (!data) return;

    /* 버튼 */
    $(".tab-btn").removeClass("active");
    $(this).addClass("active");

    /* 텍스트 */
    const $text = $(".company-desc-text");
    const h = $text.outerHeight();

    $text.height(h);

    $text.stop(true,true).fadeOut(200, function(){
      $(this).text(data.desc).fadeIn(400, function(){
        $(this).height("auto");
      });
    });

    /* 이미지 변경 */
    $img.attr("src", data.img);
    $visual.attr("data-bg", tab);

    /* 🔥 핵심: 애니메이션만 다시 실행 */
    $imgBox.removeClass("mask-play");
    $imgBox[0].offsetHeight; // 강제 리플로우
    $imgBox.addClass("mask-play");

    setTimeout(() => {
      isAnimating = false;
    }, 1600);
  });

});

// 컴퍼니 영역 하단 구현 (무한 슬로건)
$(function () {
  const $track = $(".slogan-track");

  if ($track.length === 0) return;

  // 초기값
  const $item = $track.children().first();
  const cloneCount = 6;

  for (let i = 0; i < cloneCount; i++) {
    $track.append($item.clone());
  }

  let x = 0;
  const speed = 0.7;

  function animate() {
    x -= speed;
    $track.css("transform", `translateX(${x}px)`);

    const $first = $track.children().first();
    const firstWidth = $first.outerWidth(true); // margin 포함

    // 첫 요소가 다 나가면 뒤로 보내기
    if (-x >= firstWidth) {
      $track.append($first);
      x += firstWidth;
    }

    requestAnimationFrame(animate);
  }

  animate();
});

// 이노베이션 영역 모바일 클릭 구현
$(function () {

  // Animation on scllol pulgin 실행 
  AOS.init();

  const items = document.querySelectorAll('.innovation-item');

  items.forEach(item => {
    item.addEventListener('click', () => {

      if (item.classList.contains('active')) {
        item.classList.remove('active');
        return;
      }

      items.forEach(i => i.classList.remove('active'));
      item.classList.add('active');
    });
  });
});

// esg 영역
document.addEventListener("DOMContentLoaded", function () {
  const esgSlider = document.querySelector(".esg-slider");
  if (!esgSlider) return;

  const slides = esgSlider.querySelectorAll(".esg-slide");
  const buttons = esgSlider.querySelectorAll(".page-btn");

  let currentIndex = 0;

  let startX = 0;
  let startY = 0;
  let endX = 0;
  let endY = 0;
  let isPointerDown = false;

  const swipeThreshold = 20;

  function isMobileView() {
    return window.innerWidth <= 767;
  }

  function updateSlider(index) {
    if (index < 0) index = 0;
    if (index >= slides.length) index = slides.length - 1;

    currentIndex = index;

    esgSlider.classList.remove("is-slide-1", "is-slide-2", "is-slide-3");
    esgSlider.classList.add(`is-slide-${index + 1}`);

    slides.forEach((slide, i) => {
      slide.classList.remove("is-active", "is-prev", "is-next");

      if (i === index) {
        slide.classList.add("is-active");
      } else if (i < index) {
        slide.classList.add("is-prev");
      } else {
        slide.classList.add("is-next");
      }
    });

    buttons.forEach((button, i) => {
      button.classList.toggle("is-active", i === index);
    });
  }

  function handleSwipe() {
    const diffX = endX - startX;
    const diffY = endY - startY;

    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > swipeThreshold) {
      if (diffX < 0) {
        updateSlider(currentIndex + 1);
      } else {
        updateSlider(currentIndex - 1);
      }
    }
  }

  /* 도트 버튼 클릭 */
  buttons.forEach((button, index) => {
    button.addEventListener("click", function (e) {
      e.stopPropagation();
      updateSlider(index);
    });
  });

  /* 모바일 폭일 때만 드래그 */
  esgSlider.addEventListener("pointerdown", function (e) {
    if (!isMobileView()) return;

    /* 도트 버튼 위에서 시작한 경우는 드래그 무시 */
    if (e.target.closest(".page-btn")) return;

    /* 마우스는 왼쪽 버튼만 */
    if (e.pointerType === "mouse" && e.button !== 0) return;

    isPointerDown = true;
    startX = e.clientX;
    startY = e.clientY;
    endX = e.clientX;
    endY = e.clientY;

    if (esgSlider.setPointerCapture) {
      esgSlider.setPointerCapture(e.pointerId);
    }
  });

  esgSlider.addEventListener("pointermove", function (e) {
    if (!isMobileView()) return;
    if (!isPointerDown) return;

    endX = e.clientX;
    endY = e.clientY;
  });

  esgSlider.addEventListener("pointerup", function (e) {
    if (!isMobileView()) return;
    if (!isPointerDown) return;

    endX = e.clientX;
    endY = e.clientY;
    isPointerDown = false;

    handleSwipe();
  });

  esgSlider.addEventListener("pointercancel", function () {
    isPointerDown = false;
  });

  updateSlider(currentIndex);
});

// 뉴스 영역
$(function () {
  const $wrap = $('.news-slider-wrap');
  const $slider = $('.news-slider');

  let isDragging = false;
  let startX = 0;
  let currentTranslate = 0;
  let prevTranslate = 0;
  let maxTranslate = 0;
  let animationId = null;

  function getPositionX(e) {
    if (e.type.includes('mouse')) {
      return e.pageX;
    }
    return e.originalEvent.touches[0].clientX;
  }

  function setBounds() {
    const wrapWidth = $wrap.innerWidth();
    const sliderWidth = $slider[0].scrollWidth;
    maxTranslate = Math.max(0, sliderWidth - wrapWidth);

    if (-currentTranslate > maxTranslate) {
      currentTranslate = -maxTranslate;
      prevTranslate = currentTranslate;
      $slider.css('transform', `translateX(${currentTranslate}px)`);
    }
  }

  function animation() {
    $slider.css('transform', `translateX(${currentTranslate}px)`);
    if (isDragging) {
      animationId = requestAnimationFrame(animation);
    }
  }

  function dragStart(e) {
    isDragging = true;
    startX = getPositionX(e);
    $slider.css('transition', 'none');
    animationId = requestAnimationFrame(animation);
  }

  function dragMove(e) {
    if (!isDragging) return;

    const currentX = getPositionX(e);
    const diff = currentX - startX;
    currentTranslate = prevTranslate + diff;

    // 끝에서 살짝 저항감
    if (currentTranslate > 0) {
      currentTranslate = currentTranslate * 0.3;
    }
    if (currentTranslate < -maxTranslate) {
      const extra = currentTranslate + maxTranslate;
      currentTranslate = -maxTranslate + extra * 0.3;
    }
  }

  function dragEnd() {
    if (!isDragging) return;
    isDragging = false;
    cancelAnimationFrame(animationId);

    // 범위 안으로 정리
    if (currentTranslate > 0) currentTranslate = 0;
    if (currentTranslate < -maxTranslate) currentTranslate = -maxTranslate;

    prevTranslate = currentTranslate;
    $slider.css('transition', 'transform 0.35s ease');
    $slider.css('transform', `translateX(${currentTranslate}px)`);
  }

  setBounds();

  // 터치
  $wrap.on('touchstart', dragStart);
  $wrap.on('touchmove', dragMove);
  $wrap.on('touchend touchcancel', dragEnd);

  // 마우스
  $wrap.on('mousedown', function (e) {
    e.preventDefault();
    dragStart(e);
  });

  $(window).on('mousemove', dragMove);
  $(window).on('mouseup', dragEnd);

  // 드래그 중 이미지 선택 방지
  $wrap.on('dragstart', function (e) {
    e.preventDefault();
  });

  // 리사이즈 대응
  $(window).on('resize', function () {
    setBounds();
  });
});