$(document).ready(function() {
  // //////////
  // READY - triggered when PJAX DONE
  // //////////

  function pageReady() {
    initSliders();
  }

  pageReady();

  // First we get the viewport height and we multiple it by 1% to get a value for a vh unit
  let vh = window.innerHeight * 0.01;
  // Then we set the value in the --vh custom property to the root of the document
  document.documentElement.style.setProperty("--vh", `${vh}px`);

  // Prevent # behavior

  $(document).on("click", '[href="#"]', function(e) {
    e.preventDefault();
  });

  // ////////
  // SLIDERS
  // ////////

  function initSliders() {
    var slider = tns({
      container: "[js-tns-slider]",
      items: 1,
      axis: "vertical",
      loop: false,
      swipeAngle: false,
      speed: 700,
      controls: false,
      nav: false,
      mouseDrag: true,
      touch: true,
      autoplayHoverPause: true,
      responsive: {
        0: {
          disable: true,
        },
        768: {
          disable: false,
        },
      },
    });

    var windowWidth = $(window).width();
    // console.log(windowWidth);

    if (windowWidth > 768) {
      let canScroll = true;
      document.addEventListener("wheel", (event) => {
        if (!canScroll) {
          return;
        }

        canScroll = false;
        setTimeout(() => {
          canScroll = true;
        }, 800);

        scrollDir = event.deltaY > 1 ? 1 : -1;

        if (scrollDir > 0) {
          slider.goTo("next");
        } else {
          slider.goTo("prev");
        }
      });
    }

    var customizedFunction = function(info, eventName) {
      var slideIndex = $(".tns-item.tns-slide-active").index();
      setTimeout(() => {
        $("[js-type-btn]")
          .eq(slideIndex)
          .click();
      }, 10);
    };

    slider.events.on("transitionEnd", debounce(customizedFunction, 100));

    $(document).on("click", "[js-type-btn]", function() {
      $("[js-type-btn]").removeClass("is-active");
      $(this).addClass("is-active");
      var color = $(this).attr("data-color");
      $(".hero__bg").removeClass("violet blue green yellow orange");
      $(".hero__bg").addClass(color);
      var index = $(this)
        .parent()
        .index();
      slider.goTo(index);
    });
  }
});
