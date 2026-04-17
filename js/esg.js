$(function () {

  // AOS 초기화
  AOS.init();

  const observerOptions = {
    threshold: 0.3
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counter = entry.target;

        observer.unobserve(counter); // 1회만 실행

        setTimeout(() => {
          startCount(counter);
        }, 700);
      }
    });
  }, observerOptions);

  // ease 함수
  const easeInOutCubic = (t) => {
    return t < 0.5
      ? 4 * t * t * t
      : 1 - Math.pow(-2 * t + 2, 3) / 2;
  };

  // 카운트 함수
  function startCount(counter) {
    const target = +counter.getAttribute('data-count');
    const unit = counter.getAttribute('data-unit') || '';
    const duration = 2500;
    const startTime = performance.now();

    const updateCount = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = easeInOutCubic(progress);

      counter.textContent = Math.floor(eased * target) + unit;

      if (progress < 1) {
        requestAnimationFrame(updateCount);
      } else {
        counter.textContent = target + unit;
      }
    };

    requestAnimationFrame(updateCount);
  }

  // 카운터 등록
  function initCounters() {
    const counters = document.querySelectorAll('.esg-content.active .count');
    counters.forEach(counter => observer.observe(counter));
  }

  // 탭 활성화
  function activateTab(tab) {
    // 콘텐츠
    $(".esg-content").removeClass("active");
    $(".esg-" + tab + "-content").addClass("active");

    // 메뉴 active
    $(".esg-title-wrap li").removeClass("active");
    $('.esg-title-wrap a[data-tab="' + tab + '"]')
      .parent()
      .addClass("active");

    // 카운터 재실행
    initCounters();
  }

  // 초기 실행
  activateTab("report");

  // 클릭 이벤트
  $(".esg-title-wrap a").on("click", function (e) {
    e.preventDefault();

    const tab = $(this).data("tab");

    activateTab(tab);
  });

  // 서큘러 순차 액션
  let circularLoopRunning = false;

  function startCircularLoop() {
    if (circularLoopRunning) return;
    circularLoopRunning = true;

    const items = document.querySelectorAll('.circular-item');
    if (!items.length) return;

    // 모바일 → 전체 보여주기
    if (window.innerWidth < 768) {
      return;
    }

    let current = 0;

    function loop() {
      items.forEach(item => item.classList.remove('active'));

      items[current].classList.add('active');

      current = (current + 1) % items.length;

      setTimeout(loop, 1500); // 속도 조절
    }

    loop();
  }

  function initCircularAnimation() {
    const stage = document.querySelector('.circular-stage');
    if (!stage) return;

    const circularObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {

          startCircularLoop(); // 👈 루프 시작

          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    circularObserver.observe(stage);
  }

  // 실행
  initCircularAnimation();
});