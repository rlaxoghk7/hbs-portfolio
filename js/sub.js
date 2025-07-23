/* *******************************************************
 * filename : sub.js
 * description : 서브컨텐츠에만 사용되는 JS
 * date : 2021-06-14
******************************************************** */


$(document).ready(function  () {
	/* ************************
	* Func : 서브 Visual Active 클래스 붙이기
	* addClassName () 필요
	************************ */
	setTimeout(function  () {
		addClassName($("#visual"), "active");
	},200);

	/* ************************
	* Func : 모달팝업 플러그인 사용
	* MagnificPopup.js 필요
	************************ */
	if ($.exists(".popup-gallery")) {
		magnificPopup($(".popup-gallery"));
	}

	/* ************************
	* Func : 일정 가로사이즈 아래부터 scroll 사용하기
	* mCustomScrollbar.js, customScrollX() 필요
	************************ */
	/* 서브 Scrollbar object  */
	$(".custom-scrollbar-wrapper").each(function  () {
		if ( $("html").attr("lang") == "ko" ) {
			var dragTxt = "좌우로 드래그 해주세요.";
		}else {
			var dragTxt = "Drag left and right.";
		}
		$(this).append("<div class='custom-scrollbar-cover'><div class='scroll-cover-txt'><i class='xi-touch'></i><p>"+dragTxt+"</p></div></div>");
		var $scrollObject = $(this).find(".scroll-object-box");
		if ($.exists($scrollObject)) {
			customScrollX($scrollObject);
		}
		$(this).on("touchmove click",function  () {
			$(this).find(".custom-scrollbar-cover").fadeOut(200);
		});
	});

	/* ************************
	* Func : 서브 상단 메뉴 FIXED
	* getWindowWidth(), checkOffset(), toFit() 필요
	************************ */
	if ($.exists(".fixed-sub-menu")) {
		var $fixedSubMenu = $(".fixed-sub-menu");
		var topMenuStart =  checkOffset($fixedSubMenu);
		$(window).resize(function  () {
			if ( getWindowWidth() > mobileWidth ) {
				topMenuStart =  checkOffset($fixedSubMenu);
			}else {
				$fixedSubMenu.removeClass("top-fixed");
			}
		});
		window.addEventListener('scroll', toFit(function  () {
			if ( getWindowWidth() > mobileWidth ) {
				objectFixed($fixedSubMenu, topMenuStart, "top-fixed");
			}else {
				$fixedSubMenu.removeClass("top-fixed");
			}
		}, {
		}),{ passive: true })
	}

	/* ************************
	* Func : 컨텐츠 메뉴 FIXED 및 클릭시 해당영역 이동
	* getScrollTop(), getWindowWidth(), checkOffset(), toFit(), checkFixedHeight(), moveScrollTop() 필요
	************************ */
	if ($.exists(".cm-fixed-tab-container-JS")) {
		var $fixedMoveTab = $(".cm-fixed-tab-list-JS");		// fixed되는 메뉴 클래스
		var $moveTabItem = $fixedMoveTab.find("li");
		var menuCount= $moveTabItem.size();
		var nav = [];
		
		$(window).on('load', function  () {
			checkStartOffset();
			nav = checkTopOffset();
		});
		$(window).on('resize', function  () {
			checkStartOffset();
			nav = checkTopOffset();
		}); 		
		
		// 탭이 붙기 시작하는 지점 체크
		function checkStartOffset () {
			var fixedStartPoint =  $(".cm-fixed-tab-container-JS").offset().top - checkFixedHeight();	
			return fixedStartPoint;
		}		

		// 해당되는 각각의 영역 상단값 측정
		function checkTopOffset () {
			var arr = [];
			for(var i=0;i < menuCount;i++){
				arr[i]=$($moveTabItem.eq(i).children("a").attr("href")).offset().top;
			}
			return arr;
		}
		
		// 스크롤 0일때 상단fixed되는 높이값 체크
		function checkFixedObjectHeight () {
			var fixedObjectTotalHeight = 0;
			for (var i=0; i<$(".top-fixed-object").length; i++) {
				var fixedObjectTotalHeight = fixedObjectTotalHeight + $(".top-fixed-object").eq(i).outerHeight();
			}
			return fixedObjectTotalHeight;
		}

		// 스크롤 event 
		window.addEventListener('scroll', toFit(function  () {
			// 메뉴fixed
			// objectFixed($fixedMoveTab, checkStartOffset(), "top-fixed");

			if ( getScrollTop() >  checkStartOffset() ) {
				$fixedMoveTab.addClass("top-fixed");
			}else if ( getScrollTop() <  (checkStartOffset() + $fixedMoveTab.height()) ) {
				$fixedMoveTab.removeClass("top-fixed");
			}

			$moveTabItem.each(function  (idx) {
				var eachOffset = nav[idx] -  checkFixedHeight();
				if( getScrollTop() >= eachOffset ){
					$moveTabItem.removeClass('selected');
					$moveTabItem.eq(idx).addClass('selected');
					// 모바일 드롭메뉴일때
					if ($.exists($moveTabItem.parents(".cm-drop-menu-box-JS"))) {
						$fixedMoveTab.find(".cm-drop-open-btn-JS > span").text($moveTabItem.eq(idx).find("em").text());
					}
				};
			});
			}, {
		}),{ passive: true })
		
		// 클릭 event 
		$moveTabItem.find("a").click(function  () {
			var goDivOffset = $($(this).attr("href")).offset().top - checkFixedHeight() +1;	// 이동해야할 지점
			if ( getScrollTop()  < checkStartOffset()) {
				if ( getScrollTop() == 0 ) {
					var goDiv = goDivOffset - checkFixedObjectHeight();
				}else {
					var goDiv = goDivOffset - $fixedMoveTab.height();
				}
			}else {
				var goDiv = goDivOffset;
			}
			setTimeout(function  () {
				moveScrollTop(goDiv);
			});

			// 모바일 드롭메뉴일때
			if ($.exists($(this).parents(".cm-drop-menu-box-JS")) ) {
				if ( getWindowWidth () < $fixedMoveTab.data("drop-width")+1 ) {
					$fixedMoveTab.find("ul").slideUp();
				}
			}
			 
			return false;
		});
	}

	/* ************************
	* Func : 에디터관련
	************************ */
	if ($.exists(".editor")) {
		/* 테이블 스크롤넣기 */ 
		$(".editor table").each(function  () {
			$(this).wrap("<div class='editor-table-box'></div>");
		});
		
		/* iframe 태그 감싸기 */ 
		$(".editor iframe").each(function  () {
			var iframeSrc = $(this).attr("src");
			var findStr = "https://www.youtube.com/embed"; 

			if (iframeSrc.indexOf(findStr) != -1) {
			  $(this).wrap("<div class='editor-iframe-box'></div>");
			}
		});
	}

	/* ************************
	* Func : 매출 포트폴리오 그래프
	************************ */
	var $chart = $('.portfolio-graph-box');

	$chart.each(function() {
		var $this = $(this);
		var circle = $this.find('.circle-result');
		var percentVal = $this.data('value');
	  
		circle.each(function() {
			var radius = $(this)[0].r.baseVal.value;
			var circumference = radius * 2 * Math.PI;
			var offset = circumference - (100 / 100 * (circumference));
			
			$(this)[0].style.strokeDasharray = `${circumference} ${circumference}`;
			$(this)[0].style.strokeDashoffset = 948.271;
		  });
		// 스크롤 event 
		window.addEventListener('scroll', toFit(function  () {
			$(".portfolio-graph-item").each(function() {
				var $graphItem = $(this);
				var $graphItemOffset = $(this).offset().top;
				$(".portfolio-graph-info-inner li").each(function () {
					var $graphItemGraph = $(this).find(".graph span");
					var $graphItemGraphResult = $graphItemGraph.data("value");
					if ( getScrollTop() > $graphItemOffset - 400) {
						if (!$graphItem.hasClass("effect-end")) {
							setTimeout(function(){
								setProgress($(".portfolio-graph-item.effect-end").find($this), percentVal);
								$graphItem.addClass("effect-end");
								$(".portfolio-graph-item.effect-end").find($graphItemGraph).css("width", $graphItemGraphResult+"%");
							}, 200);
						}
					}
				});
			});
			}, {
		}),{ passive: true });
	})

	function setProgress(el, percent) {   
		var circle = el.find('.circle-result');
		var amountDeg = (percent/100) * 270;

		circle.each(function() {
			var radius = $(this)[0].r.baseVal.value;
			var circumference = radius * 2 * Math.PI;
			var offset = circumference - (percent / 100 * (-circumference));

			$(this)[0].style.strokeDashoffset = offset;
		});
	}

	/* ************************
	* Func : 인사제도 아코디언
	************************ */
	// 아코디언 Width
	if ($.exists(".accordion-list")) {
		function accordion_width () {
			$(".accordion-list").each(function  () {
				$accordionList = $(this);
				$accordionItem = $(this).find(".accordion-item");		// 아코디언 각각의 class
				itemTotalWidth = $accordionList.outerWidth();		// 아코디언 전체 width
				itemBoxLength = $accordionItem.length;		// 아코디언 갯수
				mobileWidth = 800;
				// itemWidth = 158; 		// 아코디언 각각 width
				if ( $(window).width() > 1220 ) {
					itemWidth = 112.3
				}else {
					itemWidth = 90
				}
				activeWidth =  itemTotalWidth - (itemWidth * (itemBoxLength-1));
				
				// console.log("Total width : " + itemTotalWidth + "px, None Active width :  " + itemWidth + "px, Active width :  " + activeWidth + "px");
				
				if ( $(window).width() > mobileWidth ) {
					$accordionItem.each(function  () {
						$accordionItem.not(".active").css("width", itemWidth );
						$accordionList.find(".accordion-item.active").css("width", activeWidth );
					});
				}else {
					$accordionItem.removeAttr("style");
				}
			});
		}
		accordion_width();
		$(window).on('resize', accordion_width);
		
		// 1024 PC버전 마우스오버시
		$accordionItem.on("mouseover",function  () {
			if ( $(window).width() > mobileWidth && !$(this).is(".active")) {
				$(this).addClass("active").stop().animate({"width": activeWidth },600,"swing");
				$accordionItem.not($(this)).removeClass("active").stop().animate({"width":itemWidth},600,"swing"); 
			}
		});

		// 1024이하 모바일버전 클릭시
		$accordionItem.on("click",function  () {
			if ( $(window).width() <  mobileWidth+1 ) {
				$(".accordion-list .accordion-item").not($(this)).removeClass("active");
				$(this).addClass("active");
			}
		});
	}
		
		$('.num-counter-box .num').counterUp({
			delay: 30,
			time: 1000
		});
});

var options = {
		useEasing: true,
		useGrouping: true,
		separator: ",",
		decimal: "."
	};
	var options_separator = {
		useEasing: true,
		useGrouping: true,
		separator: "",
		decimal: "."
	};
	function countUpAnimation () {
		var countObj = $("[data-countUp]");	// count 될 object 추가
		countObj.each(function(index) {
			numValue = $(countObj[index]).text();
			numSpeed = 3;	// 각각 커스텀할 경우 data-speed 추가
			numIntType = parseInt(numValue.replace(/,/g , ''));

			// Speed Custom
			if ( $(countObj[index]).data("speed") ) {
				delay = $(countObj[index]).data("speed");
			}else {
				delay = numSpeed;
			}

			// Check Type
			if ( numValue.indexOf(",") != -1 ) {
				isSeparator = options;
			}else {
				isSeparator = options_separator;
			}

			var upAnimation = new CountUp(countObj[index], 0, numIntType, 0, delay, isSeparator);
			upAnimation.start();
		});
	}
	
	countUpAnimation();

/* ************************
* 온라인 제보하기 
************************ */
$(".agree-view-btn").click(function () {
	$(".accusation-con01-agree-box02").show();
	$(".disabled-form").attr("disabled", false);
});
$(".agree-block-btn").click(function () {
	$(".accusation-con01-agree-box02").hide();
	$(".disabled-form").attr("disabled", true);
	$(".disabled-form[type=checkbox]").prop('checked', false);
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
