/* *******************************************************
 * filename : main.js
 * description : 메인에만 사용되는 JS
 * date : 2021-06-15
******************************************************** */

//alert(getWindowWidth());
setTimeout(function  () {
	addClassName($("body"), "active-page");
	addClassName($("#mainEnvironment"), "active-ani");
},100);

$(document).ready(function  () {
	// fadeIn
	$(".ms-preloader").animate({"opacity":"0"},1000,"easeInOutCubic",function  () {
		$(".ms-preloader").css("visibility", "hidden");
	});

	/* ************************
	* Func : 메인 비주얼 높이 설정 및 slick 슬라이드
	* slick.js , getWindowWidth(), getWindowHeight() 필요
	************************ */
	// 메인 비주얼 높이값 설정
	if ($.exists('#mainVisual.full-height')) {
		mainVisualHeight();
		$(window).on('resize', mainVisualHeight);

		function mainVisualHeight () {
			var visual_height = getWindowHeight();
			$("#mainVisual").height(visual_height);
		}
	}

	// 메인 비주얼 active
	setTimeout(function  () {
		addClassName($("#mainVisual"), "active");
	},200);

	// 메인 비주얼 슬라이드
	var $mainVisualItem = $(".main-visual-con");
	var visualPausePlay = true;		// Pause, play 사용시 변경
	var main_visual_progress = null;

	function main_visual_state(speed){
		var $progress = $('#mainVisual').find('.main-visual-progress');
		if( main_visual_progress != null ) { main_visual_progress.kill(); }

		main_visual_progress = TweenMax.fromTo($progress, parseInt(speed/1200), {
			strokeDashoffset: '320'
		}, {
			strokeDashoffset: '0',
			ease: Power0.easeNone,
		});
	}

	$mainVisualItem.on('init', function(event, slick, currentSlide) {
		$(".main-visual-item").addClass("txt-ani");
		$(".main-visual-item").eq(0).addClass("first active-item");
		setTimeout(function  () {
			main_visual_state(5200);
		});
	});
	$mainVisualItem.on('beforeChange', function(event, slick, currentSlide, nextSlide) {	
		$(".main-visual-item").removeClass("first active-item");
		$(this).find(".main-visual-item").eq(nextSlide).addClass("active-item");
		clearInterval(main_visual_state);
		setTimeout(function  () {
			main_visual_state(5200);
		});
	});

	// 메인 비주얼 슬라이드
	$mainVisualItem.slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: false,
		fade: true,
		dots:true,
		autoplay: true,
		speed:2000,
		infinite:true,
		autoplaySpeed: 4000,
		easing: 'easeInOutQuint',
		pauseOnHover:false,
		zIndex:1,
	});

	// 일시정지, 재생버튼 사용시
	if ( visualPausePlay ) {
		$(document).on("click",".slick-pause-btn",function  () {
			$mainVisualItem.slick("slickPause");
			$(this).hide();
			$(".slick-play-btn").show();
			clearInterval(main_visual_state);
		});
		$(document).on("click",".slick-play-btn",function  () {
			$mainVisualItem.slick("slickPlay");
			$(this).hide();
			$(".slick-pause-btn").show();
			setTimeout(function  () {
				main_visual_state(5200);
			});
		});
	}

	
	/* ************************
	* Func : 오브젝트 move
	************************ */
	/* if (getWindowWidth() > tabletWidth) {
		$(".move-object-con").on('mousemove', function(e) {
			if ( getWindowWidth() > 801 ) {
				var $this_object1 =$(this).find(".prd-img01"); 
				var $this_object2 =$(this).find(".prd-img02"); 
				var w = $(window).width();
				var h = $(window).height();
				var offsetX = 0.1 - e.pageX / w;
				var offsetY = 0.1 - e.pageY / h;
				var offsetX2 = 0.1 + e.pageX / w;
				var offsetY2 = 0.1 + e.pageY / h;
	
				$this_object1.each(function(i, el) {
					var offset = parseInt($(el).data('offset'));
					var translate = "translate3d(" + Math.round(offsetX2 * offset) + "px," + Math.round(offsetY2 * offset) + "px, 0px)";
	
					$(el).css({
						'-webkit-transform': translate,
						'transform': translate,
						'moz-transform': translate
					});
				});
				$this_object2.each(function(i, el) {
					var offset = parseInt($(el).data('offset'));
					var translate = "translate3d(" + Math.round(offsetX * offset) + "px," + Math.round(offsetY * offset) + "px, 0px)";
	
					$(el).css({
						'-webkit-transform': translate,
						'transform': translate,
						'moz-transform': translate
					});
				});
			}
		});	
	}*/
	
	/* ************************
	* 퀵메뉴 타이틀 고정
	************************ */
	if ($.exists(".main-quick-con")) {
		$(window).resize(function(){
			if (getWindowWidth() > 1024) {
				mainQuickFixed ();
			}
		})
		if (getWindowWidth() > 1024) {
			mainQuickFixed ();
		}
		
		window.addEventListener('scroll', toFit(function  () {
			mainQuickFixed();
		}, {
		}),{ passive: true })

		function mainQuickFixed () {
			var $fixedContainer = $(".main-quick-con");
			var $moveContainer = $(".main-quick-right");
			
			if ( getWindowWidth() > tabletWidth ) {
				var fixedStart = $fixedContainer.offset().top - 20;
				var absoluteStart = $fixedContainer.offset().top + $fixedContainer.outerHeight() - $moveContainer.outerHeight() - 100;
			}
			if($(window).scrollTop() > fixedStart){
				if ( $(window).scrollTop() > absoluteStart ) {
					$moveContainer.removeClass("fixed").addClass("absolute");
				}else {
					$moveContainer.removeClass("absolute").addClass("fixed");
				}
			} else {
				$moveContainer.removeClass("absolute").removeClass("fixed");
			}
		}
	}
	

	/* ************************
	* Func : 퀵메뉴 이동 효과
	************************ */
	$(window).on("load",function(){
		if ( getWindowWidth() > 1024 ) {
			$(window).scroll(function(e){
				parallaxScroll();
			});
		}
		$(window).resize(function  () {
			if ( getWindowWidth() > 1024 ) {
				$(window).scroll(function(e){
					parallaxScroll();
				});
			}
		});
	});
	
	function parallaxScroll(){
		var scrolled = $(window).scrollTop();
		$('.main-quick-list').css('margin-top', ((scrolled*.1))+'px');
		// $('.main-quick-list.list02').css('margin-top',((scrolled*.01))+'px');
		$('.main-quick-right.fixed').css('margin-top',((scrolled*.01))+'px');
		$('.main-quick-right').css('margin-top',((scrolled*.01))+'px');
		$('.main-tit-box').css('margin-top',((scrolled*.05))+'px');


	}


	/* ************************
	* Func : 메인 갤러리 슬라이드
	* slick.js 필요
	************************ */
	var $mainCustomerItem = $('.main-customer-list');
	var main_customer_progress = null;

	function main_customer_state(speed){
		var $progress = $('.main-customer-progress').find('span');
		if( main_customer_progress != null ) { main_customer_progress.kill();}

		main_customer_progress = TweenMax.fromTo($progress, parseInt(speed/1200), {
			width: '0%'
		}, {
			width: '100%',
			ease: Power0.easeNone,
		});
	}

	$mainCustomerItem.on('init', function(event, slick, currentSlide) {
		setTimeout(function  () {
			main_customer_state(3400);
		});
	});
	$mainCustomerItem.on('beforeChange', function(event, slick, currentSlide, nextSlide) {	
		clearInterval(main_customer_state);
		setTimeout(function  () {
			main_customer_state(4200);
		});
	});
	
	$mainCustomerItem.slick({
		slidesToShow: 3,
		slidesToScroll: 1,
		arrows: true,
		fade: false,
		dots:false,
		autoplay: false,
		speed:800,
		infinite:true,
		autoplaySpeed: 3000,
		easing: 'easeInOutQuint',
		pauseOnHover:false,
		prevArrow: '.main-customer-prev',
		nextArrow: '.main-customer-next',
		responsive: [
					{
					  breakpoint: 1536,
					  settings: {
						slidesToShow: 2,
						slidesToScroll: 1
					  }
					},
					{
					  breakpoint: 801,
					  settings: {
						slidesToShow: 1,
						slidesToScroll: 1
					  }
					}
				  ]
	});

	

// 팝업
// 팝업 열기 함수
  function openBrandPopup(brand){
    const $popup = $('.brand_layer_popup');
    $popup.addClass('on')
      .find('.ly_' + brand).addClass('active')
      .siblings().removeClass('active');

    $popup.find('.layer_close').focus();
    $('body').addClass('lock');
  }

  // 팝업 닫기 함수
  function closeBrandPopup(){
    const activeBrand = $('.layer_con.active').data('brand');
    $('.brand_layer_popup').removeClass('on');
    $(`.brand_box button[data-brand = "${activeBrand}"]`).focus();
    // $('.brand_box button[data-brand = "' + activeBrand + '"]').focus()
    $('body').removeClass('lock');
  }	

  // url에 브랜드 id가 있으면 팝업 자동 오픈
  if (brandId) {
    openBrandPopup(brandId);
  }
  
  // 브랜드 버튼 클릭시 팝업 오픈
  $('.brand_box').on('click', function (){
    const brand = $(this).data('brand');
    openBrandPopup(brand);
  });

  // 닫기 버튼 클릭시 팝업 닫기
  $('.layer_close').on('click', closeBrandPopup);

  // 바깥 영역 클릭시 팝업 오픈
  $('.brand_layer_popup').on('click', function (e){
    if (!$(e.target).closest('.layer_con').length) {
      $(this).removeClass('on');
      $('body').removeClass('lock')
    }
  });



	/* ************************
	* Func : 해당영역갔을때 슬라이드 autoPlay
	* wayPoint.js 필요
	************************ */
	// 해당영역갔을때 슬라이드 autoPlay
	if ($.exists('.start-autoplay-scroll-object')) {
		$(".start-autoplay-scroll-object").slick("slickPause");
		$(".start-autoplay-scroll-object").waypoint(function  () {
			$(this).slick("slickPlay");
		}, { 
			offset: "90%",
		});
	}
});


document.addEventListener("DOMContentLoaded", function () {
  const product = document.getElementById('quote-product');
  const spec1 = document.getElementById('quote-spec1');
  const spec2 = document.getElementById('quote-spec2');
  const quantity = document.getElementById('quote-quantity');
  const total = document.getElementById('quote-total');

  function calculate() {
    const p = parseInt(product.value);
    const s1 = parseInt(spec1.value);
    const s2 = parseInt(spec2.value);
    const q = parseInt(quantity.value) || 0;

    const result = (p + s1 + s2) * q;
    total.textContent = `총 견적: ${result.toLocaleString()}원`;
  }

  product.addEventListener('change', calculate);
  spec1.addEventListener('change', calculate);
  spec2.addEventListener('change', calculate);
  quantity.addEventListener('input', calculate);
});

// family site 열고 닫기
const langOpen ='열기';
const langClose ='닫기';
$('.link_open').on('click', function(){
  const $this = $(this);//현재 클릭한 요소를 변수에 저장
  const isOpen = $this.attr('title') === langOpen; //현재 상태가 "열기" 상태인지 확인
  $this
      .attr('title', isOpen ? langClose : langOpen) //상태에 따라 title을 "닫기" 또는 "열기"로 변환
      .toggleClass('on', isOpen)//열기 상태면'on' 클래스 추가, 닫기면 제거
      .siblings('ul').toggleClass('active', isOpen)//형제 ul에 'active' 클래스 토글
})

//하단 현재 년도 출력
//document.getElementById('this_year').textContent = new Date().getFullYear()
$('#this_year').text(new Date().getFullYear());

