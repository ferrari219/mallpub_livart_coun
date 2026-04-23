var timer;
// 통합몰 반짝특가용 CountDownTimer
// 데이터 형식 '04/07/2020 10:20 AM' // 월/일/년 시:분 AM
function SwiperCountDownTimer(mode, dt, id) {
	var end = new Date(dt);
	var _second = 1000;
	var _minute = _second * 60;
	var _hour = _minute * 60;
	var _day = _hour * 24;

	function showSwiperCountRemaining() {
		var now = new Date();
		var distance = end - now;
		if (distance < 0) {
			clearInterval(timer);
			return;
		}
		var days = Math.floor(distance / _day);
		var hours = Math.floor((distance % _day) / _hour);
		// var minutes = '0' + Math.floor((distance % _hour) / _minute);
		// var seconds = '0' + Math.floor((distance % _minute) / _second);
		var innerHTML;
		if (mode == 'open') {
			// 오픈 이후
			hours = hours < 10 ? '0' + hours : hours;
			if (days < 1) {
				innerHTML = '<span class="groupbuy-item-goal__num"><strong>' + hours + '</strong>시간 남음</span>';
			} else {
				innerHTML = '<strong class="groupbuy-item-goal__day">' + days + '</strong>일 ';
				innerHTML += '<span class="groupbuy-item-goal__num"><strong>' + hours + '</strong>시간 남음</span>';
			}
		} else {
			// 오픈 전
			hours = hours < 10 ? '0' + hours : hours;
			if (days < 1) {
				innerHTML = '<span class="groupbuy-item-goal__num"><strong>' + hours + '</strong>시간 남음</span>';
			} else {
				innerHTML = '시작까지 <strong class="groupbuy-item-goal__day">' + days + '</strong>일 ';
				innerHTML += '<span class="groupbuy-item-goal__num"><strong>' + hours + '</strong>시간 남음</span>';
			}
		}
		$(id).html(innerHTML);
	}
	clearInterval(timer);
	showSwiperCountRemaining();
	timer = setInterval(showSwiperCountRemaining, 1000);
}

function showSwiperDateFormat(dt) {
	var dformat = dt.split('-');
	var days = Number(dformat[0]);
	var hours = Number(dformat[1]);
	hours = hours < 10 ? '0' + hours : hours;
	if (days < 1) {
		if (hours < 1) {
			innerHTML = '<span class="groupbuy-item-goal__num"><strong>마감임박</span>';
		} else {
			innerHTML = '<span class="groupbuy-item-goal__num"><strong>' + hours + '</strong>시간 남음</span>';
		}
	} else {
		innerHTML = '<strong class="groupbuy-item-goal__day">' + days + '</strong>일 ';
		innerHTML += '<span class="groupbuy-item-goal__num"><strong>' + hours + '</strong>시간 남음</span>';
	}
	$('.timesale-header__d').html(innerHTML);
}
// 통합몰 메인 반짝특가용 슬라이드
function loadSwiperTimesale01(el) {
	var swiperList = $(el + ' .swiper-slide');
	if (swiperList.length > 1) {
		var swiperObj = new Swiper(el + ' .swiper-container', {
			loop: true,
			simulateTouch: false,
			autoplay: {
				delay: 3000,
			},
			pagination: {
				el: el + ' .swiper-pagination',
				type: 'progressbar',
			},
			navigation: {
				nextEl: el + ' .swiper-button-next',
				prevEl: el + ' .swiper-button-prev',
			},
			paginationClickable: true,
			centeredSlides: true,
			slidesPerView: 'auto',
			spaceBetween: 0,
			on: {
				init: function () {
					var swiper = this;
					$this = $(el);
					var duplicateNum = $this.find('.swiper-slide-duplicate').length;
					var totalNum = swiper.slides.length - duplicateNum;
					var bulletNum;
					for (var i = 1; i <= totalNum; i++) {
						if (i === 1) {
							// add active class if it is the first bullet
							bulletNum = '0' + i;
							bulletNum = bulletNum.slice(-2);
							$(el + ' .swiper-pagination-bullet-wrap').append('<span class="swiper-pagination-number swiper-pagination-number-active slide' + i + '">' + bulletNum + '</span>');
						} else {
							bulletNum = '0' + i;
							bulletNum = bulletNum.slice(-2);
							$(el + ' .swiper-pagination-bullet-wrap').append('<span class="swiper-pagination-number slide' + i + '">' + bulletNum + '</span>');
						}
					}
				},
				slideChangeTransitionStart: function () {
					// Get current slide from fraction pagination number
					var $this = $(el);
					var currentNum = $this.find('.swiper-slide-active').data('swiper-slide-index') + 1;
					var bullets = $(el + ' .swiper-pagination-number');
					// Remove active class from all bullets
					bullets.removeClass('swiper-pagination-number-active');
					// Check each bullet element if it has slideNumber class
					$.each(bullets, function (index, value) {
						var slideClass = 'slide' + (index + 1);
						if (currentNum >= index + 1) {
							$(this).addClass('swiper-pagination-number-active');
						}
					});
					// 반짝특가용 카운트다운 타이머 추가 : 200702
					var dateFormat = $this.find('.swiper-slide-active').children('.product-item').data('format');
					showSwiperDateFormat(dateFormat);
					// var activeOpen = $this.find('.swiper-slide-active').children('.product-item').data('open');
					// SwiperCountDownTimer(activeOpen, activeTimer, el + ' .timesale-header__d');
				},
				slideChangeTransitionEnd: function () {
					var swiper = this;
					var $this = $(el + ' .swiper-container');
					var sButton = $this.find('.swiper-button-pause');
					if (sButton.length) {
						if (sButton.is('.__state-swiper-pause')) {
							swiper.autoplay.start();
						}
					}
				},
			},
		});

		$(document).on('click', el + ' .swiper-button-pause', function () {
			if ($(this).is('.__state-swiper-play')) {
				$(this).removeClass('__state-swiper-play').addClass('__state-swiper-pause').find('i').removeClass('icon-control-play').addClass('icon-control-pause');
				swiperObj.autoplay.start();
			} else {
				$(this).removeClass('__state-swiper-pause').addClass('__state-swiper-play').find('i').removeClass('icon-control-pause').addClass('icon-control-play');
				swiperObj.autoplay.stop();
			}
		});
	} else {
		swiperList.show();
	}
}

function loadSwiperTimesale02(el) {
	var swiperList = $(el + ' .swiper-slide');
	if (swiperList.length > 1) {
		var swiperObj = new Swiper(el + ' .swiper-container', {
			loop: true,
			simulateTouch: false,
			pagination: {
				el: el + ' .swiper-pagination',
				type: 'progressbar',
			},
			navigation: {
				nextEl: el + ' .swiper-button-next',
				prevEl: el + ' .swiper-button-prev',
			},
			autoplay: {
				delay: 5000,
			},
			paginationClickable: true,
			centeredSlides: true,
			spaceBetween: 0,
			speed: 0,
			slidesPerView: 3,
			on: {
				init: function () {
					var swiper = this;
					var currentNum;
					var $this = $(el + ' .swiper-container');
					var duplicateNum = $this.find('.swiper-slide-duplicate').length;
					var totalNum = swiper.slides.length - duplicateNum;
					// swiper loop 상태에 따라 current index : 200818
					if (swiper.params.loop) {
						currentNum = $this.find('.swiper-slide-active').data('swiper-slide-index') + 1; // loop : true 일 경우
					} else {
						currentNum = this.activeIndex + 1; // loop : false 일 경우
					}
					totalNum = '0' + totalNum;
					currentNum = '0' + currentNum;
					$(el + ' .swiper-pagination-total').text(totalNum.slice(-2));
					$(el + ' .swiper-pagination-current').text(currentNum.slice(-2));
					$(el + ' .swiper-slide')
						.removeClass('swiper-slide-best')
						.children('div')
						.addClass('product-item--medium')
						.removeClass('product-item--xxlarge');
					$(el + ' .swiper-slide-prev')
						.addClass('swiper-slide-best')
						.children('div')
						.removeClass('product-item--medium')
						.addClass('product-item--xxlarge');
				},
				slideChangeTransitionStart: function () {
					var swiper = this;
					var currentNum;
					var $this = $(el + ' .swiper-container');
					var duplicateNum = $this.find('.swiper-slide-duplicate').length;
					var totalNum = swiper.slides.length - duplicateNum;
					// swiper loop 상태에 따라 current index : 200818
					if (swiper.params.loop) {
						currentNum = $this.find('.swiper-slide-active').data('swiper-slide-index') + 1; // loop : true 일 경우
					} else {
						currentNum = this.activeIndex + 1; // loop : false 일 경우
					}
					totalNum = '0' + totalNum;
					currentNum = '0' + currentNum;
					$(el + ' .swiper-pagination-total').text(totalNum.slice(-2));
					$(el + ' .swiper-pagination-current').text(currentNum.slice(-2));
					$(el + ' .swiper-slide')
						.removeClass('swiper-slide-best')
						.children('div')
						.addClass('product-item--medium')
						.removeClass('product-item--xxlarge');
					$(el + ' .swiper-slide-prev')
						.addClass('swiper-slide-best')
						.children('div')
						.removeClass('product-item--medium')
						.addClass('product-item--xxlarge');
					// $('.lstore-timesale-best').empty().append($this.find('.swiper-slide-best').children('div'));
				},
			},
		});
	}
	$('.section-lstore-timesale')
		.on('mouseenter', function () {
			swiperObj.autoplay.stop();
		})
		.on('mouseleave', function () {
			swiperObj.autoplay.start();
		});
}

// Key Visual Banner PC 01 - 빅 와이드 배너(Auto Slide) + 좌측 스몰 배너(Slide)
function loadSwiperKeyvisual01(el, initialNum) {
	// 배너 순서 지정
	if (initialNum == undefined) {
		initialNum = 0;
	}
	var swiperList1 = $(el + ' .main-key-visual1 .swiper-slide'),
		swiperControlWrap = $(el + ' .main-key-visual1 .swiper-control-wrapper');
	if (swiperList1.length > 1) {
		var swiperKeyVisual = new Swiper(el + ' .main-key-visual1', {
			loop: true,
			simulateTouch: false,
			autoplay: {
				delay: 3000,
			},
			speed: 1000,
			// speed: 600,
			parallax: true,
			// grabCursor: true,
			watchSlidesProgress: true,
			mousewheelControl: false,
			keyboardControl: true,

			pagination: {
				el: el + ' .main-key-visual1 .swiper-pagination',
				type: 'progressbar',
			},
			navigation: {
				nextEl: el + ' .swiper-control-wrapper .swiper-button-next',
				prevEl: el + ' .swiper-control-wrapper .swiper-button-prev',
			},
			on: {
				slideChangeTransitionStart: function () {
					var swiper = this;
					var $this = $(el + ' .main-key-visual1');
					var duplicateNum = $this.find('.swiper-slide-duplicate').length;
					var totalNum = swiper.slides.length - duplicateNum;
					var currentNum = $this.find('.swiper-slide-active').data('swiper-slide-index') + 1;
					$this.find('.swiper-pagination-total').text(totalNum);
					$this.find('.swiper-pagination-current').text(currentNum);
				},
				slideChangeTransitionEnd: function () {
					var swiper = this;
					var $this = $(el + ' .main-key-visual1');
					var sButton = $this.find('.swiper-button-pause');
					if (sButton.length) {
						if (sButton.is('.__state-swiper-pause')) {
							swiper.autoplay.start();
						}
					}
				},
			},
			initialSlide: initialNum,
		});
	} else {
		swiperList1.show();
		swiperControlWrap.hide();
	}

	// 메인 키비주얼2 슬라이드
	var swiperList2 = $(el + ' .main-key-visual2 .swiper-slide');
	if (swiperList2.length > 1) {
		var swiperKeyVisual2 = new Swiper(el + ' .main-key-visual2 .swiper-container', {
			// speed: 0,
			loop: true,
			simulateTouch: false,
			// preloadImages: false,
			// lazy: true,
			spaceBetween: 0,
			slidesPerView: 1,
			pagination: {
				el: el + ' .main-key-visual2 .swiper-pagination-count',
				type: 'custom',
				renderCustom: function (swiper, current, total) {
					function numberAppend(d) {
						return d < 10 ? '0' + d.toString() : d.toString();
					}
					return '<span class="swiper-pagination-current">' + numberAppend(current) + '</span> /  <span class="swiper-pagination-total">' + numberAppend(total) + '</span>';
				},
			},
			navigation: {
				nextEl: el + ' .main-key-visual2 .swiper-button-next',
				prevEl: el + ' .main-key-visual2 .swiper-button-prev',
			},
		});
	} else {
		swiperList2.show();
		$(el + ' .main-key-visual2 .swiper-pagination-count').hide();
		$(el + ' .main-key-visual2 .swiper-button-prev').hide();
		$(el + ' .main-key-visual2 .swiper-button-next').hide();
	}

	$(document).on('click', el + ' .swiper-button-pause', function () {
		if ($(this).is('.__state-swiper-play')) {
			$(this).removeClass('__state-swiper-play').addClass('__state-swiper-pause').find('i').removeClass('icon-control-play').addClass('icon-control-pause');
			swiperKeyVisual.autoplay.start();
		} else {
			$(this).removeClass('__state-swiper-pause').addClass('__state-swiper-play').find('i').removeClass('icon-control-pause').addClass('icon-control-play');
			swiperKeyVisual.autoplay.stop();
		}
	});

	var swiperScroll = new Swiper('.swiperScroll', {
		direction: 'vertical',
		slidesPerView: 'auto',
		freeMode: true,
		scrollbar: {
			el: '.swiper-scrollbar',
		},
		mousewheel: true,
	});
}

// Key Visual Banner PC 02 - 3단 다이나믹 배너(Auto Slide)
function loadSwiperKeyvisual02(el) {
	var swiperList = $(el + ' .swiper-slide'),
		swiperControlWrap = $(el + ' .swiper-control-box-wrap');

	if (swiperList.length > 3) {
		var swiperObj = new Swiper(el + ' .swiper-container', {
			simulateTouch: false,
			autoplay: {
				delay: 5000,
			},
			speed: 800,
			// loop: true,
			navigation: {
				nextEl: el + ' .swiper-button-next',
				prevEl: el + ' .swiper-button-prev',
			},
			pagination: {
				el: el + ' .swiper-pagination',
				type: 'progressbar',
			},
			// centeredSlides: true,
			freeMode: true,
			spaceBetween: 50,
			slidesPerView: 3,
			slidesPerGroup: 3,
			on: {
				init: function () {
					var swiper = this;
					$this = $(el);
					var duplicateNum = $this.find('.swiper-slide-duplicate').length;
					var totalNum = swiper.slides.length - duplicateNum;
					var bulletNum,
						cntNum = 1;
					for (var i = 1; i <= totalNum; i++) {
						if (i === 1) {
							// add active class if it is the first bullet
							bulletNum = '0' + i;
							bulletNum = bulletNum.slice(-2);
							$(el + ' .swiper-pagination-bullet-wrap').append('<span class="swiper-pagination-number swiper-pagination-number-active slide' + i + '">' + bulletNum + '</span>');
						} else {
							if (i > 1 && i % 3 === 1) {
								cntNum++;
								bulletNum = '0' + cntNum; //i;
								bulletNum = bulletNum.slice(-2);
								$(el + ' .swiper-pagination-bullet-wrap').append(
									'<span class="swiper-pagination-number slide' +
										cntNum + //i +
										'">' +
										bulletNum +
										'</span>'
								);
							}
						}
					}
				},
				slideChangeTransitionStart: function () {
					var currentNum = this.activeIndex;
					// Get current slide from fraction pagination number
					var $this = $(el);
					// var currentNum = parseInt(this.activeIndex / 3) + 1;
					// var currentNum = parseInt(
					// 	$this
					// 		.find('.swiper-slide-active')
					// 		.data('swiper-slide-index') / 3
					// );
					var bullets = $(el + ' .swiper-pagination-number');
					// Remove active class from all bullets
					bullets.removeClass('swiper-pagination-number-active');
					// Check each bullet element if it has slideNumber class
					$.each(bullets, function (index, value) {
						var slideClass = 'slide' + index;
						var slideActive = Math.ceil(currentNum / 3);
						// console.log(slideActive, slideClass);
						if (slideActive >= index) {
							$(this).addClass('swiper-pagination-number-active');
						}
					});
				},
				slideChangeTransitionEnd: function () {
					var swiper = this;
					var $this = $(el + ' .swiper-container');
					var sButton = $this.find('.swiper-button-pause');
					if (sButton.length) {
						if (sButton.is('.__state-swiper-pause')) {
							swiper.autoplay.start();
						}
					}
				},
			},
		});
		//Page index
		$(document).on('click', el + ' .swiper-pagination-number', function () {
			var index = $(this).index();
			swiperObj.slideTo(index * 3 + 1);
		});
		$(document).on('click', el + ' .swiper-button-pause', function () {
			if ($(this).is('.__state-swiper-play')) {
				$(this).removeClass('__state-swiper-play').addClass('__state-swiper-pause').find('i').removeClass('icon-control-play').addClass('icon-control-pause');
				swiperObj.autoplay.start();
			} else {
				$(this).removeClass('__state-swiper-pause').addClass('__state-swiper-play').find('i').removeClass('icon-control-pause').addClass('icon-control-play');
				swiperObj.autoplay.stop();
			}
		});
	} else {
		swiperList.show();
		swiperControlWrap.hide();
	}
}

// Key Visual Banner PC 07 - 3단 다이나믹 배너(Auto Slide) - 디자인 추가
function loadSwiperKeyvisual07(el) {
	var swiperList = $(el + ' .swiper-slide'),
		swiperControlWrap = $(el + ' .swiper-control-box-wrap');
	//3의 배수가 아닐때 빈공백
	if (swiperList.length % 3 !== 0) {
		$(el + ' .swiper-wrapper').append('<div class="swiper-slide"></div>');
	}
	if (swiperList.length > 3) {
		var swiperObj = new Swiper(el + ' .swiper-container', {
			simulateTouch: false,
			autoplay: {
				delay: 5000,
			},
			speed: 800,
			// loop: true,
			navigation: {
				nextEl: el + ' .swiper-button-next',
				prevEl: el + ' .swiper-button-prev',
			},
			pagination: {
				el: el + ' .swiper-pagination',
				type: 'progressbar',
			},
			// centeredSlides: true,
			freeMode: true,
			spaceBetween: 0,
			slidesPerView: 3,
			slidesPerGroup: 3,
			on: {
				init: function () {
					var swiper = this;
					$this = $(el);
					var duplicateNum = $this.find('.swiper-slide-duplicate').length;
					var totalNum = swiper.slides.length - duplicateNum;
					var bulletNum,
						cntNum = 1;
					for (var i = 1; i <= totalNum; i++) {
						if (i === 1) {
							// add active class if it is the first bullet
							bulletNum = '0' + i;
							bulletNum = bulletNum.slice(-2);
							$(el + ' .swiper-pagination-bullet-wrap').append('<span class="swiper-pagination-number swiper-pagination-number-active slide' + i + '">' + bulletNum + '</span>');
						} else {
							if (i > 1 && i % 3 === 1) {
								cntNum++;
								bulletNum = '0' + cntNum; //i;
								bulletNum = bulletNum.slice(-2);
								$(el + ' .swiper-pagination-bullet-wrap').append(
									'<span class="swiper-pagination-number slide' +
										cntNum + //i +
										'">' +
										bulletNum +
										'</span>'
								);
							}
						}
					}
				},
				slideChangeTransitionStart: function () {
					var currentNum = this.activeIndex;
					// Get current slide from fraction pagination number
					var $this = $(el);
					// var currentNum = parseInt(this.activeIndex / 3) + 1;
					// var currentNum = parseInt(
					// 	$this
					// 		.find('.swiper-slide-active')
					// 		.data('swiper-slide-index') / 3
					// );
					var bullets = $(el + ' .swiper-pagination-number');
					// Remove active class from all bullets
					bullets.removeClass('swiper-pagination-number-active');
					// Check each bullet element if it has slideNumber class
					$.each(bullets, function (index, value) {
						var slideClass = 'slide' + index;
						var slideActive = Math.ceil(currentNum / 3);
						// console.log(slideActive, slideClass);
						if (slideActive >= index) {
							$(this).addClass('swiper-pagination-number-active');
						}
					});
				},
				slideChangeTransitionEnd: function () {
					var swiper = this;
					var $this = $(el + ' .swiper-container');
					var sButton = $this.find('.swiper-button-pause');
					if (sButton.length) {
						if (sButton.is('.__state-swiper-pause')) {
							swiper.autoplay.start();
						}
					}
				},
			},
		});
		//Page index
		$(document).on('click', el + ' .swiper-pagination-number', function () {
			var index = $(this).index();
			swiperObj.slideTo(index * 3 + 1);
			if ($(el + ' .swiper-button-pause').hasClass('__state-swiper-play')) {
				swiperObj.autoplay.stop();
			} else {
				swiperObj.autoplay.start();
			}
		});
		$(document).on('click', el + ' .swiper-button-pause', function () {
			if ($(this).is('.__state-swiper-play')) {
				$(this).removeClass('__state-swiper-play').addClass('__state-swiper-pause').find('i').removeClass('icon-control-play-w').addClass('icon-control-pause-w');
				swiperObj.autoplay.start();
			} else {
				$(this).removeClass('__state-swiper-pause').addClass('__state-swiper-play').find('i').removeClass('icon-control-pause-w').addClass('icon-control-play-w');
				swiperObj.autoplay.stop();
			}
		});
	} else {
		swiperList.show();
		swiperControlWrap.hide();
	}
}

// Key Visual Banner PC 08 - 빅 와이드 배너(Auto Slide) + 헤더
function loadSwiperKeyvisual08(el, initialNum) {
	// 배너 순서 지정
	if (initialNum == undefined) {
		initialNum = 0;
	}
	var swiperList1 = $(el + ' .main-key-visual8 .swiper-slide'),
		swiperControlWrap = $(el + ' .main-key-visual8 .swiper-control-wrapper'),
		swiperControlBox = $(el + ' .swiper-control-box'),
		isPausedByUser = false;

	if (swiperList1.length > 1) {
		var swiperKeyVisual = new Swiper(el + ' .main-key-visual8', {
			loop: true,
			simulateTouch: false,
			autoplay: false, // 초기에는 끔 (init에서 조건에 따라 시작/멈춤)
			speed: 600,
			parallax: true,
			watchSlidesProgress: true,
			mousewheelControl: false,
			keyboardControl: true,

			pagination: {
				el: el + ' .main-key-visual8 .swiper-pagination',
				type: 'progressbar',
			},
			navigation: {
				nextEl: el + ' .swiper-control-wrapper .swiper-button-next',
				prevEl: el + ' .swiper-control-wrapper .swiper-button-prev',
			},
			on: {
				// 초기화 시 현재/총 페이지 표시를 채워주고 첫 슬라이드가 비디오면 처리
				init: function () {
					var swiper = this;
					var $this = $(el + ' .main-key-visual8');
					// pagination 숫자 세팅 (중복 슬라이드 제외)
					var duplicateNum = $this.find('.swiper-slide-duplicate').length;
					var totalNum = swiper.slides.length - duplicateNum;
					var currentIndex = $this.find('.swiper-slide-active').data('swiper-slide-index');
					var currentNum = currentIndex !== undefined ? currentIndex + 1 : 1;
					$this.find('.swiper-pagination-total').text(totalNum);
					$this.find('.swiper-pagination-current').text(currentNum);

					// 첫 슬라이드에 비디오가 있으면 재생하고 autoplay 정지
					var embedActive = document.querySelectorAll(el + ' .main-key-visual8 .swiper-slide-active video');
					if (embedActive.length > 0) {
						try {
							embedActive[0].play();
						} catch (e) {
							/* play() 실패 시 무시 */
						}
						swiper.autoplay.stop();
						swiperControlBox.hide();
					} else {
						// 이미지면 autoplay 시작 (6초)
						swiper.params.autoplay = { delay: 6000 };
						swiper.autoplay.start();
						swiperControlBox.show();
					}
				},
				// 슬라이드가 바뀔 때 페이지 숫자 갱신
				slideChangeTransitionStart: function () {
					var swiper = this;
					var $this = $(el + ' .main-key-visual8');
					var duplicateNum = $this.find('.swiper-slide-duplicate').length;
					var totalNum = swiper.slides.length - duplicateNum;
					var currentNum = $this.find('.swiper-slide-active').data('swiper-slide-index') + 1;
					$this.find('.swiper-pagination-total').text(totalNum);
					$this.find('.swiper-pagination-current').text(currentNum);
				},
				// 슬라이드 전환 끝난 후 비디오 제어 / autoplay 제어
				slideChangeTransitionEnd: function () {
					var swiper = this;
					var $this = $(el + ' .main-key-visual8');

					var embed = document.querySelectorAll(el + ' .main-key-visual8 .embed-container');
					var cnt = embed.length;
					var embedActive = document.querySelectorAll(el + ' .main-key-visual8 .swiper-slide-active video');

					//동영상 제어
					if (embedActive.length > 0) {
						swiper.autoplay.stop();
						try {
							embedActive[0].play();
						} catch (e) {
							/* play 실패 무시 */
						}
					} else {
						if (!isPausedByUser) {
							swiper.params.autoplay = { delay: 6000 };
							swiper.autoplay.start();
						}

						// 모든 동영상 초기화
						for (var i = 0; i < cnt; i++) {
							var vdo = $(el + ' .main-key-visual8 video')[i];
							if (vdo) {
								vdo.currentTime = 0;
								vdo.pause();
							}
						}
					}
				},
			},
			initialSlide: initialNum,
		});

		$(document).on('click', el + ' .swiper-button-pause', function () {
			if ($(this).is('.__state-swiper-play')) {
				isPausedByUser = false;
				$(this).removeClass('__state-swiper-play').addClass('__state-swiper-pause').find('i').removeClass('icon-control-play-w').addClass('icon-control-pause-w');
				swiperKeyVisual.autoplay.start();
			} else {
				isPausedByUser = true;
				$(this).removeClass('__state-swiper-pause').addClass('__state-swiper-play').find('i').removeClass('icon-control-pause-w').addClass('icon-control-play-w');
				swiperKeyVisual.autoplay.stop();
			}
		});
	} else {
		swiperList1.show();
		swiperControlWrap.hide();
	}

	var swiperScroll = new Swiper('.swiperScroll', {
		direction: 'vertical',
		slidesPerView: 'auto',
		freeMode: true,
		scrollbar: {
			el: '.swiper-scrollbar',
		},
		mousewheel: true,
	});

	//버튼 내 동영상 제어
	$(document).on('click', el + ' .main-key-visual8 .swiper-controls-wrap .swiper-button-next, ' + el + ' .main-key-visual8 .swiper-controls-wrap .swiper-button-prev', function () {
		var embed = document.querySelectorAll(el + ' .main-key-visual8 .embed-container');
		var cnt = embed.length;
		var embedActive = document.querySelectorAll(el + ' .main-key-visual8 .swiper-slide-active video');

		if (cnt) {
			for (var i = 0; i < cnt; i++) {
				var vdo = $(el + ' .main-key-visual8 .embed-container video')[i];
				if (vdo) {
					vdo.pause();
					vdo.currentTime = 0;
				}
			}
		}
		if (embedActive.length) {
			for (var i = 0; i < cnt; i++) {
				var vdo = $(el + ' .main-key-visual8 .embed-container video')[i];
				if (vdo) {
					vdo.play();
				}
			}
			try {
				swiperKeyVisual.autoplay.stop();
			} catch (e) {
				/* noop */
			}
		}
	});
	//영상제어
	$(el + ' .main-key-visual8 .embed-container video').on('ended', function () {
		try {
			swiperKeyVisual.autoplay.start();
		} catch (e) {
			/* noop */
		}
	});
}

// Key Visual Banner PC 09 - 3단 다이나믹 배너(Auto Slide) - 헤더형
function loadSwiperKeyvisual09(el) {
	var swiperList = $(el + ' .swiper-slide'),
		swiperControlWrap = $(el + ' .swiper-control-box-wrap');
	//3의 배수가 아닐때 빈공백
	if (swiperList.length % 3 !== 0) {
		$(el + ' .swiper-wrapper').append('<div class="swiper-slide"></div>');
	}
	if (swiperList.length > 3) {
		var swiperObj = new Swiper(el + ' .swiper-container', {
			simulateTouch: false,
			autoplay: {
				delay: 5000,
			},
			speed: 800,
			// loop: true,
			navigation: {
				nextEl: el + ' .swiper-button-next',
				prevEl: el + ' .swiper-button-prev',
			},
			pagination: {
				el: el + ' .swiper-pagination',
				type: 'progressbar',
			},
			// centeredSlides: true,
			freeMode: true,
			spaceBetween: 0,
			slidesPerView: 3,
			slidesPerGroup: 3,
			on: {
				init: function () {
					var swiper = this;
					$this = $(el);
					var duplicateNum = $this.find('.swiper-slide-duplicate').length;
					var totalNum = swiper.slides.length - duplicateNum;
					var bulletNum,
						cntNum = 1;
					for (var i = 1; i <= totalNum; i++) {
						if (i === 1) {
							// add active class if it is the first bullet
							bulletNum = '0' + i;
							bulletNum = bulletNum.slice(-2);
							$(el + ' .swiper-pagination-bullet-wrap').append('<span class="swiper-pagination-number swiper-pagination-number-active slide' + i + '">' + bulletNum + '</span>');
						} else {
							if (i > 1 && i % 3 === 1) {
								cntNum++;
								bulletNum = '0' + cntNum; //i;
								bulletNum = bulletNum.slice(-2);
								$(el + ' .swiper-pagination-bullet-wrap').append(
									'<span class="swiper-pagination-number slide' +
										cntNum + //i +
										'">' +
										bulletNum +
										'</span>'
								);
							}
						}
					}
				},
				slideChangeTransitionStart: function () {
					var currentNum = this.activeIndex;
					// Get current slide from fraction pagination number
					var $this = $(el);
					// var currentNum = parseInt(this.activeIndex / 3) + 1;
					// var currentNum = parseInt(
					// 	$this
					// 		.find('.swiper-slide-active')
					// 		.data('swiper-slide-index') / 3
					// );
					var bullets = $(el + ' .swiper-pagination-number');
					// Remove active class from all bullets
					bullets.removeClass('swiper-pagination-number-active');
					// Check each bullet element if it has slideNumber class
					$.each(bullets, function (index, value) {
						var slideClass = 'slide' + index;
						var slideActive = Math.ceil(currentNum / 3);
						// console.log(slideActive, slideClass);
						if (slideActive >= index) {
							$(this).addClass('swiper-pagination-number-active');
						}
					});
				},
				slideChangeTransitionEnd: function () {
					var swiper = this;
					var $this = $(el + ' .swiper-container');
					var sButton = $this.find('.swiper-button-pause');
					if (sButton.length) {
						if (sButton.is('.__state-swiper-pause')) {
							swiper.autoplay.start();
						}
					}
				},
			},
		});
		//Page index
		$(document).on('click', el + ' .swiper-pagination-number', function () {
			var index = $(this).index();
			swiperObj.slideTo(index * 3 + 1);
			if ($(el + ' .swiper-button-pause').hasClass('__state-swiper-play')) {
				swiperObj.autoplay.stop();
			} else {
				swiperObj.autoplay.start();
			}
		});
		$(document).on('click', el + ' .swiper-button-pause', function () {
			if ($(this).is('.__state-swiper-play')) {
				$(this).removeClass('__state-swiper-play').addClass('__state-swiper-pause').find('i').removeClass('icon-control-play-w').addClass('icon-control-pause-w');
				swiperObj.autoplay.start();
			} else {
				$(this).removeClass('__state-swiper-pause').addClass('__state-swiper-play').find('i').removeClass('icon-control-pause-w').addClass('icon-control-play-w');
				swiperObj.autoplay.stop();
			}
		});
	} else {
		swiperList.show();
		swiperControlWrap.hide();
	}
}

// Key Visual Banner PC 03 - 빅와이드 배너(Slide) : 520px
function loadSwiperWideBanner03(el) {
	var swiperList = $(el + ' .swiper-slide'),
		swiperControlWrap = $(el + ' .swiper-control-box-wrap');

	if (swiperList.length > 1) {
		var swiperObj = new Swiper(el + ' .swiper-container', {
			simulateTouch: false,
			autoplay: {
				delay: 5000,
			},
			speed: 800,
			loop: true,
			navigation: {
				nextEl: el + ' .swiper-button-next',
				prevEl: el + ' .swiper-button-prev',
			},
			pagination: {
				el: el + ' .swiper-pagination',
				type: 'progressbar',
			},
			on: {
				init: function () {
					var swiper = this;
					$this = $(el);
					var duplicateNum = $this.find('.swiper-slide-duplicate').length;
					var totalNum = swiper.slides.length - duplicateNum;
					var bulletNum;
					for (var i = 1; i <= totalNum; i++) {
						if (i === 1) {
							// add active class if it is the first bullet
							bulletNum = '0' + i;
							bulletNum = bulletNum.slice(-2);
							$(el + ' .swiper-pagination-bullet-wrap').append('<span class="swiper-pagination-number swiper-pagination-number-active slide' + i + '">' + bulletNum + '</span>');
						} else {
							bulletNum = '0' + i;
							bulletNum = bulletNum.slice(-2);
							$(el + ' .swiper-pagination-bullet-wrap').append('<span class="swiper-pagination-number slide' + i + '">' + bulletNum + '</span>');
						}
					}
				},
				slideChangeTransitionStart: function () {
					// Get current slide from fraction pagination number
					var $this = $(el);
					var currentNum = $this.find('.swiper-slide-active').data('swiper-slide-index') + 1;
					var bullets = $(el + ' .swiper-pagination-number');
					// Remove active class from all bullets
					bullets.removeClass('swiper-pagination-number-active');
					// Check each bullet element if it has slideNumber class
					$.each(bullets, function (index, value) {
						var slideClass = 'slide' + (index + 1);
						if (currentNum >= index + 1) {
							$(this).addClass('swiper-pagination-number-active');
						}
					});
				},
				slideChangeTransitionEnd: function () {
					var swiper = this;
					var $this = $(el + ' .swiper-container');
					var sButton = $this.find('.swiper-button-pause');
					if (sButton.length) {
						if (sButton.is('.__state-swiper-pause')) {
							swiper.autoplay.start();
						}
					}
				},
			},
		});
		$(document).on('click', el + ' .swiper-button-pause', function () {
			if ($(this).is('.__state-swiper-play')) {
				$(this).removeClass('__state-swiper-play').addClass('__state-swiper-pause').find('i').removeClass('icon-control-play').addClass('icon-control-pause');
				swiperObj.autoplay.start();
			} else {
				$(this).removeClass('__state-swiper-pause').addClass('__state-swiper-play').find('i').removeClass('icon-control-pause').addClass('icon-control-play');
				swiperObj.autoplay.stop();
			}
		});
	} else {
		swiperList.show();
		swiperControlWrap.hide();
	}
}

// Key Visual Banner PC 04 - 빅와이드 배너(Slide) + Bullet
function loadSwiperWideBanner04(el) {
	var swiperList = $(el + ' .swiper-slide'),
		swiperControlWrap = $(el + ' .swiper-controls-wrap');

	if (swiperList.length > 1) {
		var swiperObj = new Swiper(el + ' .swiper-container', {
			simulateTouch: false,
			autoplay: {
				delay: 3000,
			},
			speed: 1000,
			loop: true,
			navigation: {
				nextEl: el + ' .swiper-button-next',
				prevEl: el + ' .swiper-button-prev',
			},
			pagination: {
				el: el + ' .swiper-pagination',
				clickable: true,
			},
		});
	} else {
		swiperList.show();
		swiperControlWrap.hide();
	}
}

// 메인컬렉션PC02-스와이퍼
function loadSwiperWideBanner05(el) {
	var swiperList = $(el + ' .swiper-slide'),
		swiperControlWrap = $(el + ' .swiper-controls-wrap');

	if (swiperList.length > 1) {
		var swiperObj = new Swiper(el + ' .swiper-container', {
			simulateTouch: false,
			speed: 800,
			loop: true,
			navigation: {
				nextEl: el + ' .swiper-button-next',
				prevEl: el + ' .swiper-button-prev',
			},
			pagination: {
				el: el + ' .swiper-pagination',
				clickable: true,
			},
		});
	} else {
		swiperList.show();
		swiperControlWrap.hide();
	}
}

// S : 메인키비쥬얼PC5-좌1단+우3단
function loadSwiperKeyvisual05(el) {
	var swiperListV01 = $(el + ' .main-keyvisual5__left .swiper-slide'),
		swiperControlWrapV01 = $(el + ' .main-keyvisual5__left .section-category-control-wrap');
	//컨텐츠의 갯수가 1개 이하일때 swiper를 호출하지 않는다.
	if (swiperListV01.length > 1) {
		var swiperKeyVisualLeft = new Swiper(el + ' .main-keyvisual5__left .swiper-container', {
			loop: true,
			simulateTouch: false,
			autoplay: {
				delay: 3000,
			},
			speed: 1000,
			navigation: {
				nextEl: el + ' .main-keyvisual5__left .swiper-button-next',
				prevEl: el + ' .main-keyvisual5__left .swiper-button-prev',
			},
			pagination: {
				el: el + ' .main-keyvisual5__left .swiper-pagination',
				type: 'fraction',
			},
		});

		$(document)
			.on('click', el + ' .main-keyvisual5__left .swiper-button-pause', function () {
				if ($(this).hasClass('__state-swiper-play')) {
					$(this).removeClass('__state-swiper-play').addClass('__state-swiper-pause').find('i').removeClass('icon-swiper-play-w').addClass('icon-swiper-pause-w');
					swiperKeyVisualLeft.autoplay.start();
				} else {
					$(this).removeClass('__state-swiper-pause').addClass('__state-swiper-play').find('i').removeClass('icon-swiper-pause-w').addClass('icon-swiper-play-w');
					swiperKeyVisualLeft.autoplay.stop();
				}
			})
			.on('click', el + ' .main-keyvisual5__left .swiper-button-prev, ' + el + ' .main-keyvisual5__left .swiper-button-next', function () {
				var isPause01 = $(this).closest('.section-category-control-wrap').find('.swiper-button-pause');
				if (isPause01.hasClass('__state-swiper-play')) {
					isPause01.removeClass('__state-swiper-play').addClass('__state-swiper-pause').find('i').removeClass('icon-swiper-play-w').addClass('icon-swiper-pause-w');
				}
				swiperKeyVisualLeft.autoplay.start();
			});
	} else {
		swiperListV01.show();
		swiperControlWrapV01.hide();
	}
	// 메인 키비주얼2 슬라이드
	var swiperKeyVisualRight = new Swiper(el + ' .main-keyvisual5__right .swiper-container', {
		loop: true,
		simulateTouch: false,
		direction: 'vertical',
		slidesPerView: 3,
		spaceBetween: 0,
		navigation: {
			nextEl: el + ' .main-keyvisual5__right .swiper-button-next',
			prevEl: el + ' .main-keyvisual5__right .swiper-button-prev',
		},
	});
}
// E : 메인키비쥬얼PC5-좌1단+우3단

// Key Visual Banner PC 06 - 삼성브랜드관 메인 배너, 탭
function loadSwiperKeyvisual06(el, initialNum) {
	// 배너 순서 지정
	if (initialNum == undefined) {
		initialNum = 0;
	}
	//탭
	var swiperList2 = $(el + ' .tab-swiper-container .swiper-slide');
	if (swiperList2.length > 1) {
		var swiperKeyVisual2 = new Swiper(el + ' .tab-swiper-container .swiper-container', {
			// speed: 0,
			loop: true,
			// simulateTouch: false,
			// preloadImages: false,
			// lazy: true,
			slidesPerView: 9,
			centeredSlides: true,
			spaceBetween: 10,
			navigation: {
				nextEl: el + ' .tab-swiper-container .swiper-button-next',
				prevEl: el + ' .tab-swiper-container .swiper-button-prev',
			},
		});
	} else {
		swiperList2.show();
		$(el + ' .tab-swiper-container .swiper-pagination-count').hide();
		$(el + ' .tab-swiper-container .swiper-button-prev').hide();
		$(el + ' .tab-swiper-container .swiper-button-next').hide();
	}

	$(document).on('click', el + ' .swiper-button-pause', function () {
		if ($(this).is('.__state-swiper-play')) {
			$(this).removeClass('__state-swiper-play').addClass('__state-swiper-pause').find('i').removeClass('icon-control-play').addClass('icon-control-pause');
			swiperKeyVisual.autoplay.start();
		} else {
			$(this).removeClass('__state-swiper-pause').addClass('__state-swiper-play').find('i').removeClass('icon-control-pause').addClass('icon-control-play');
			swiperKeyVisual.autoplay.stop();
		}
	});

	var swiperScroll = new Swiper('.swiperScroll', {
		direction: 'vertical',
		slidesPerView: 'auto',
		freeMode: true,
		scrollbar: {
			el: '.swiper-scrollbar',
		},
		mousewheel: true,
	});
}

// Key Visual Banner PC 11 - 3단 메인 배너
function loadSwiperKeyvisual11(el) {
	var swiperList = $(el + ' .swiper-slide'),
		swiperControlWrap = $(el + ' .swiper-control-box-wrap');

	// 3의 배수가 아닐때 빈공백
	while (swiperList.length % 3 !== 0) {
		$(el + ' .swiper-wrapper').append('<div class="swiper-slide"></div>');
		swiperList = $(el + ' .swiper-slide');
	}

	if (swiperList.length > 3) {
		var swiperObj = new Swiper(el + ' .swiper-container', {
			simulateTouch: false,
			watchSlidesProgress: true,
			mousewheelControl: false,
			keyboardControl: true,
			autoplay: {
				delay: 5000,
			},
			speed: 800,
			navigation: {
				nextEl: el + ' .swiper-button-next',
				prevEl: el + ' .swiper-button-prev',
			},
			pagination: {
				el: el + ' .swiper-pagination',
				type: 'progressbar',
			},
			on: {
				init: function () {
					var swiper = this;
					var totalNum = Math.ceil((swiper.slides.length - swiper.params.loopAdditionalSlides * 2) / 3);
					totalNum = '0' + totalNum;
					$(el + ' .swiper-pagination-total').text(totalNum);
					$(el + ' .swiper-pagination-current').text('01');
				},
				slideChange: function () {},
			},
			freeMode: true,
			spaceBetween: 50,
			slidesPerView: 3,
			slidesPerGroup: 3,
		});

		// 재생/일시정지 버튼 이벤트
		$(document).on('click', el + ' .swiper-button-pause', function () {
			if ($(this).hasClass('__state-swiper-play')) {
				$(this).removeClass('__state-swiper-play').addClass('__state-swiper-pause').find('i').removeClass('icon-control-play').addClass('icon-control-pause');
				swiperObj.autoplay.start();
			} else {
				$(this).removeClass('__state-swiper-pause').addClass('__state-swiper-play').find('i').removeClass('icon-control-pause').addClass('icon-control-play');
				swiperObj.autoplay.stop();
			}
		});
	} else {
		swiperList.show();
		swiperControlWrap.hide();
	}
}

// WideBanner
function loadSwiperWideBanner05(el) {
	var swiperList = $(el + ' .swiper-slide');
	if (swiperList.length > 1) {
		var swiperObj = new Swiper(el + ' .swiper-container', {
			loop: true,
			navigation: {
				nextEl: el + ' .swiper-button-next',
				prevEl: el + ' .swiper-button-prev',
			},
			spaceBetween: 0,
			slidesPerView: 'auto',
			on: {
				init: function () {
					$('.section-branch .tab-block-item').on('click', function () {
						var idx = $(this).index();
						swiperObj.slideToLoop(idx);
					});
				},
				slideChangeTransitionStart: function () {
					var loopIndex = $(el + ' .swiper-slide-active').attr('data-swiper-slide-index');
					$('.section-branch .tab-block-item').removeClass('is-active').eq(loopIndex).addClass('is-active');
				},
			},
		});
	}
}

// 통합몰 메인 베스트 아이템 슬라이드
function loadSwiperBest01(el) {
	var swiperList = $(el + ' .swiper-slide');
	if (swiperList.length > 1) {
		var swiperObj = new Swiper(el + ' .swiper-container', {
			loop: true,
			simulateTouch: false,
			// autoplay: {
			// 	delay: 3000,
			// },
			pagination: {
				el: el + ' .swiper-pagination',
				type: 'progressbar',
			},
			navigation: {
				nextEl: el + ' .swiper-button-next',
				prevEl: el + ' .swiper-button-prev',
			},
			// autoplay: {
			// 	delay: 3000000,
			// },
			paginationClickable: true,
			centeredSlides: true,
			spaceBetween: 0,
			slidesPerView: 1,
			on: {
				slideChangeTransitionStart: function () {
					var swiper = this;
					var $this = $(el);
					var duplicateNum = $this.find('.swiper-slide-duplicate').length;
					var totalNum = swiper.slides.length - duplicateNum;
					var currentNum = $this.find('.swiper-slide-active').data('swiper-slide-index') + 1;
					totalNum = '0' + totalNum;
					currentNum = '0' + currentNum;
					$this.find('.swiper-pagination-total').text(totalNum.slice(-2));
					$this.find('.swiper-pagination-current').text(currentNum.slice(-2));
				},
			},
		});
	} else {
		swiperList.show();
	}
}

// 기획전 슬라이드
function loadSwiperExhibition01(el) {
	var swiperList = $(el + ' .swiper-slide');
	if (swiperList.length > 1) {
		var swiperObj = new Swiper(el + ' .swiper-container', {
			loop: true,
			simulateTouch: false,
			autoplay: {
				delay: 3000,
			},
			pagination: {
				el: el + ' .swiper-pagination',
				type: 'progressbar',
			},
			navigation: {
				nextEl: el + ' .swiper-button-next',
				prevEl: el + ' .swiper-button-prev',
			},
			paginationClickable: true,
			on: {
				init: function () {
					var swiper = this;
					$this = $(el);
					var duplicateNum = $this.find('.swiper-slide-duplicate').length;
					var totalNum = swiper.slides.length - duplicateNum;
					var bulletNum;
					for (var i = 1; i <= totalNum; i++) {
						if (i === 1) {
							// add active class if it is the first bullet
							bulletNum = '0' + i;
							bulletNum = bulletNum.slice(-2);
							$(el + ' .swiper-pagination-bullet-wrap').append('<span class="swiper-pagination-number swiper-pagination-number-active slide' + i + '">' + bulletNum + '</span>');
						} else {
							bulletNum = '0' + i;
							bulletNum = bulletNum.slice(-2);
							$(el + ' .swiper-pagination-bullet-wrap').append('<span class="swiper-pagination-number slide' + i + '">' + bulletNum + '</span>');
						}
					}
				},
				slideChangeTransitionStart: function () {
					// Get current slide from fraction pagination number
					var $this = $(el);
					var currentNum = $this.find('.swiper-slide-active').data('swiper-slide-index') + 1;
					var bullets = $(el + ' .swiper-pagination-number');
					// Remove active class from all bullets
					bullets.removeClass('swiper-pagination-number-active');
					// Check each bullet element if it has slideNumber class
					$.each(bullets, function (index, value) {
						var slideClass = 'slide' + (index + 1);
						if (currentNum >= index + 1) {
							$(this).addClass('swiper-pagination-number-active');
						}
					});
				},
			},
		});
		$(document)
			.on('mouseenter', el, function () {
				swiperObj.autoplay.stop();
			})
			.on('mouseleave', el, function () {
				swiperObj.autoplay.start();
			});
	} else {
		swiperList.show();
	}
}

// 기획전 3단 슬라이드
function loadSwiperExhibition03(el) {
	var swiperList = $(el + ' .swiper-slide'),
		swiperControlWrap = $(el + ' .swiper-controls-wrap');

	if (swiperList.length > 3) {
		var swiperObj = new Swiper(el + ' .swiper-container', {
			simulateTouch: false,
			speed: 800,
			loop: true,
			navigation: {
				nextEl: el + ' .swiper-button-next',
				prevEl: el + ' .swiper-button-prev',
			},
			spaceBetween: 53,
			slidesPerView: 3,
			slidesPerGroup: 3,
			on: {
				init: function () {
					if (swiperList.length < 4) {
						swiperControlWrap.hide();
					}
				},
			},
		});
	} else {
		swiperList.show();
		swiperControlWrap.hide();
	}
}

// 기획전 와이드배너 + 4단 슬라이드
function loadSwiperExhibition04(el) {
	var swiperList = $(el + ' .swiper-slide');
	if (swiperList.length > 1) {
		var swiperObj = new Swiper(el + ' .swiper-container', {
			loop: true,
			simulateTouch: false,
			autoHeight: true,
			navigation: {
				nextEl: el + ' .swiper-button-next',
				prevEl: el + ' .swiper-button-prev',
			},
			on: {
				init: function () {},
			},
		});
	} else {
		$(el + ' .swiper-controls-wrap').hide();
	}
}
// 기획전 와이드 1단 슬라이드 배너
function loadSwiperWide01(el) {
	var swiperList = $(el + ' .swiper-slide'),
		swiperControlWrap = $(el + ' .section-category-control-wrap');

	if (swiperList.length > 1) {
		var swiperObj = new Swiper(el + ' .swiper-container', {
			simulateTouch: false,
			autoplay: {
				delay: 4000,
			},
			loop: true,
			navigation: {
				nextEl: el + ' .swiper-button-next',
				prevEl: el + ' .swiper-button-prev',
			},
			pagination: {
				el: el + ' .swiper-pagination',
				type: 'fraction',
			},
		});
	} else {
		swiperList.show();
		swiperControlWrap.hide();
	}

	$(document)
		.on('click', el + ' .swiper-button-pause', function () {
			if ($(this).is('.__state-swiper-play')) {
				$(this).removeClass('__state-swiper-play').addClass('__state-swiper-pause').find('i').removeClass('icon-play').addClass('icon-pause');
				swiperObj.autoplay.start();
			} else {
				$(this).removeClass('__state-swiper-pause').addClass('__state-swiper-play').find('i').removeClass('icon-pause').addClass('icon-play');
				swiperObj.autoplay.stop();
			}
		})
		.on('click', el + ' .swiper-button-prev,' + el + ' .swiper-button-next', function () {
			var isPlayControl = $(this).closest('.section-category-control-wrap').find('.swiper-button-pause');
			if (isPlayControl.is('.__state-swiper-play')) {
				isPlayControl.removeClass('__state-swiper-play').addClass('__state-swiper-pause').find('i').removeClass('icon-play').addClass('icon-pause');
			}
			swiperObj.autoplay.start();
		});
}

// 기획전 와이드 2단 슬라이드 배너
function loadSwiperWide02(el) {
	var swiperList = $(el + ' .swiper-slide'),
		swiperControlWrap = $(el + ' .section-category-control-wrap');

	if (swiperList.length > 1) {
		var swiperObj = new Swiper(el + ' .swiper-container', {
			loop: true,
			simulateTouch: false,
			spaceBetween: 0,
			slidesPerView: 2,
			slidesPerGroup: 2,
			autoplay: {
				delay: 4000,
			},
			navigation: {
				nextEl: el + ' .swiper-button-next',
				prevEl: el + ' .swiper-button-prev',
			},
			pagination: {
				el: el + ' .swiper-pagination',
				type: 'fraction',
			},
		});
	} else {
		swiperList.show();
		swiperControlWrap.hide();
	}

	$(document)
		.on('click', el + ' .swiper-button-pause', function () {
			if ($(this).is('.__state-swiper-play')) {
				$(this).removeClass('__state-swiper-play').addClass('__state-swiper-pause').find('i').removeClass('icon-play').addClass('icon-pause');
				swiperObj.autoplay.start();
			} else {
				$(this).removeClass('__state-swiper-pause').addClass('__state-swiper-play').find('i').removeClass('icon-pause').addClass('icon-play');
				swiperObj.autoplay.stop();
			}
		})
		.on('click', el + ' .swiper-button-prev,' + el + ' .swiper-button-next', function () {
			var isPlayControl = $(this).closest('.section-category-control-wrap').find('.swiper-button-pause');
			if (isPlayControl.is('.__state-swiper-play')) {
				isPlayControl.removeClass('__state-swiper-play').addClass('__state-swiper-pause').find('i').removeClass('icon-play').addClass('icon-pause');
			}
			swiperObj.autoplay.start();
		});
}

// 일반 autoplay 용 4단 슬라이드
function loadSwiperAutoCol4(el) {
	var swiperList = $(el + ' .swiper-slide'),
		swiperControl1 = $(el + ' .swiper-button-prev'),
		swiperControl2 = $(el + ' .swiper-button-next');

	if (swiperList.length > 4) {
		var swiperObj = new Swiper(el + ' .swiper-container', {
			loop: true,
			navigation: {
				nextEl: el + ' .swiper-button-next',
				prevEl: el + ' .swiper-button-prev',
			},
			autoplay: {
				delay: 3000,
			},
			paginationClickable: true,
			spaceBetween: 28,
			slidesPerView: 4,
			slidesPerGroup: 4,
		});
		$(document)
			.on('mouseenter', el, function () {
				swiperObj.autoplay.stop();
			})
			.on('mouseleave', el, function () {
				swiperObj.autoplay.start();
			});
	} else {
		swiperList.show();
		swiperControl1.hide();
		swiperControl2.hide();
	}
}

// autoplay 가 아닌 고정 3단 슬라이드
function loadSwiperCol2(el) {
	var swiperList = $(el + ' .swiper-slide');

	if (swiperList.length > 1) {
		var swiperObj = new Swiper(el + ' .swiper-container', {
			loop: true,
			navigation: {
				nextEl: el + ' .swiper-button-next',
				prevEl: el + ' .swiper-button-prev',
			},
			paginationClickable: true,
			spaceBetween: 16,
			slidesPerView: 2,
		});
	}
}

// autoplay 가 아닌 고정 3단 슬라이드
function loadSwiperCol3(el) {
	var swiperList = $(el + ' .swiper-slide');

	if (swiperList.length > 1) {
		var swiperObj = new Swiper(el + ' .swiper-container', {
			loop: true,
			navigation: {
				nextEl: el + ' .swiper-button-next',
				prevEl: el + ' .swiper-button-prev',
			},
			paginationClickable: true,
			spaceBetween: 53,
			slidesPerView: 3,
			slidesPerGroup: 3,
		});
	}
}

// autoplay 가 아닌 고정 5단 슬라이드
function loadSwiperCol5(el) {
	var swiperList = $(el + ' .swiper-slide');

	if (swiperList.length > 5) {
		var swiperObj = new Swiper(el + ' .swiper-container', {
			loop: true,
			navigation: {
				nextEl: el + ' .swiper-button-next',
				prevEl: el + ' .swiper-button-prev',
			},
			paginationClickable: true,
			spaceBetween: 29,
			slidesPerView: 5,
			slidesPerGroup: 5,
		});
	}
}

// autoplay 가 아닌, 1개씩 넘어가는 고정 5단 슬라이드
function loadSwiperCol5_2(el) {
	var swiperList = $(el + ' .swiper-slide'),
		swiperControlWrap = $(el + ' .swiper-controls-wrap');

	if (swiperList.length > 5) {
		var swiperObj = new Swiper(el + ' .swiper-container', {
			// loop: true,
			navigation: {
				nextEl: el + ' .swiper-button-next',
				prevEl: el + ' .swiper-button-prev',
			},
			paginationClickable: true,
			spaceBetween: 10,
			slidesPerView: 5,
			// slidesPerGroup: 1,
		});
	} else {
		swiperControlWrap.hide();
		$(el + ' .swiper-container').addClass('flex-swiper');
		$(el + ' .swiper-wrapper').css({
			display: 'grid',
			'grid-template-columns': 'repeat(5, 1fr)',
			gap: '10px',
		});
	}
}

// autoplay 가 아닌, 무한루프가 아닌 고정 3단 슬라이드
function loadSwiperCol3_1(el) {
	var swiperList = $(el + ' .swiper-slide');
	swiperControlWrap = $(el + ' .swiper-controls-wrap');

	if (swiperList.length > 3) {
		var swiperObj = new Swiper(el + ' .swiper-container', {
			loop: false,
			navigation: {
				nextEl: el + ' .swiper-button-next',
				prevEl: el + ' .swiper-button-prev',
			},
			paginationClickable: true,
			spaceBetween: 53,
			slidesPerView: 3,
			slidesPerGroup: 3,
			// centeredSlides: true,
		});
	} else {
		swiperList.show();
		swiperControlWrap.hide();
		$('.swiper-wrapper').css({
			'justify-content': 'center',
			'padding-left': '53px',
		});
	}
}
// 1개씩 넘어가는 3단 슬라이드
function loadSwiperCol3_2(el) {
	var swiperList = $(el + ' .swiper-slide');

	if (swiperList.length > 1) {
		var swiperObj = new Swiper(el + ' .swiper-container', {
			loop: true,
			navigation: {
				nextEl: el + ' .swiper-button-next',
				prevEl: el + ' .swiper-button-prev',
			},
			paginationClickable: true,
			spaceBetween: 53,
			slidesPerView: 3,
			slidesPerGroup: 1,
		});
	}
}

// autoplay 가 아닌 고정 4단 슬라이드
function loadSwiperCol4(el) {
	var swiperList = $(el + ' .swiper-slide'),
		swiperControlWrap = $(el + ' .swiper-controls-wrap');

	if (swiperList.length > 4) {
		var swiperObj = new Swiper(el + ' .swiper-container', {
			loop: true,
			autoHeight: true,
			navigation: {
				nextEl: el + ' .swiper-button-next',
				prevEl: el + ' .swiper-button-prev',
			},
			paginationClickable: true,
			spaceBetween: 30,
			slidesPerView: 4,
			slidesPerGroup: 4,
		});
	} else {
		swiperList.show();
		swiperControlWrap.hide();
	}
}

// 배너 전체 보기 팝업용 멀티 컬럼 슬라이드
function loadSwiperMultiCol01(el) {
	var swiperList = $(el + ' .swiper-slide');
	swiperControlWrap = $(el + ' .paging-container');

	if (swiperList.length > 4) {
		var swiperObj = new Swiper(el + ' .swiper-container', {
			loop: false,
			navigation: {
				nextEl: el + ' .swiper-button-next',
				prevEl: el + ' .swiper-button-prev',
			},
			pagination: {
				el: el + ' .swiper-pagination',
				type: 'progressbar',
			},
			// slidesPerView: 4,
			// slidesPerGroup: 4,
			// spaceBetween: 0,
			slidesPerView: 2,
			slidesPerColumn: 2,
			spaceBetween: 30,
			on: {
				init: function () {
					var swiper = this;
					$this = $(el);
					var totalNum = (swiper.slides.length % 4) + 2;
					var currentNum = swiper.activeIndex + 1;
					totalNum = '0' + totalNum;
					currentNum = '0' + currentNum;
					$this.find('.swiper-pagination-total').text(totalNum.slice(-2));
					$this.find('.swiper-pagination-current').text(currentNum.slice(-2));
				},
				slideChangeTransitionStart: function () {
					var swiper = this;
					$this = $(el);
					var totalNum = (swiper.slides.length % 4) + 2;
					var currentNum = swiper.activeIndex + 1;
					totalNum = '0' + totalNum;
					currentNum = '0' + currentNum;
					$this.find('.swiper-pagination-total').text(totalNum.slice(-2));
					$this.find('.swiper-pagination-current').text(currentNum.slice(-2));
				},
			},
		});
	} else {
		swiperList.show();
		swiperControlWrap.hide();
	}
}

// 이미지 카테고리
function loadSwiperImageCategory(el) {
	var swiperList = $(el + ' .swiper-slide'),
		swiperControlWrap = $(el + ' .section-category-control-wrap');
	//컨텐츠의 갯수가 1개 이하일때 swiper를 호출하지 않는다.
	if (swiperList.length > 8) {
		var swiperObj = new Swiper(el + ' .swiper-container', {
			simulateTouch: false,
			// loop: true,
			slidesPerView: 8,
			slidesPerGroup: 8,
			spaceBetween: 0,
			navigation: {
				nextEl: el + ' .swiper-button-next',
				prevEl: el + ' .swiper-button-prev',
			},
		});
	} else {
		var swiperWrap = $(el + ' .swiper-container').addClass('is-controlwrap');
		swiperList.show();
		swiperControlWrap.hide();
	}
}
// 이미지 카테고리2
function loadSwiperImageCategory2(el) {
	var swiperList = $(el + ' .swiper-slide'),
		swiperControlWrap = $(el + ' .section-category-control-wrap');
	//컨텐츠의 갯수가 1개 이하일때 swiper를 호출하지 않는다.
	if (swiperList.length > 10) {
		var swiperObj = new Swiper(el + ' .swiper-container', {
			simulateTouch: false,
			// loop: true,
			slidesPerView: 11,
			slidesPerGroup: 11,
			spaceBetween: 0,
			navigation: {
				nextEl: el + ' .swiper-button-next',
				prevEl: el + ' .swiper-button-prev',
			},
		});
	} else {
		var swiperWrap = $(el + ' .swiper-container').addClass('is-controlwrap');
		swiperList.show();
		swiperControlWrap.hide();
	}
}

// 신상품
function loadSwiperNewArrival(el) {
	var swiperList = $(el + ' .swiper-slide'),
		swiperControl = $(el + ' .swiper-controls-wrap'),
		swiperControl1 = $(el + ' .paging-box');
	// console.log('swiper : ', swiperList.length);
	if (swiperList.length > 1) {
		var swiperObj = new Swiper(el + ' .swiper-container', {
			loop: true,
			autoHeight: true,
			pagination: {
				el: el + ' .swiper-pagination',
				type: 'progressbar',
			},
			navigation: {
				nextEl: el + ' .swiper-button-next',
				prevEl: el + ' .swiper-button-prev',
			},
			autoplay: false,
			paginationClickable: true,
			centeredSlides: true,
			spaceBetween: 0,
			slidesPerView: 1,
			on: {
				init: function () {
					var totalNum = swiperList.length < 10 ? '0' + swiperList.length : swiperList.length;
					$(el + ' .swiper-pagination-count .swiper-pagination-current').text('01');
					$(el + ' .swiper-pagination-count .swiper-pagination-total').text(totalNum);
				},
				slideChangeTransitionStart: function () {
					var loopIndex = parseInt($(el + ' .swiper-slide-active').attr('data-swiper-slide-index')) + 1,
						currentIndex = this.activeIndex + 1,
						currentNum = this.params.loop === false ? (currentIndex < 10 ? '0' + currentIndex : currentIndex) : loopIndex < 10 ? '0' + loopIndex : loopIndex;

					$(el + ' .swiper-pagination-count .swiper-pagination-current').text(currentNum);
				},
			},
		});
	} else {
		swiperList.show();
		swiperControl.hide();
		swiperControl1.empty();
	}
}

// 베스트 후기 3단
function loadSwiperBestReviewCol3(el) {
	var swiperList = $(el + ' .swiper-slide');
	if (swiperList.length) {
		var swiperObj = new Swiper(el + ' .swiper-container', {
			loop: true,
			autoplay: false,
			/* autoplay: {
				delay: 3000,
			}, */
			pagination: false,
			navigation: {
				nextEl: el + ' .swiper-button-next',
				prevEl: el + ' .swiper-button-prev',
			},
			spaceBetween: 53,
			slidesPerView: 'auto',
			centeredSlides: true,
		});
	}
	$('.section-best-review')
		.on('mouseenter', function () {
			//swiperObj.autoplay.stop();
		})
		.on('mouseleave', function () {
			//swiperObj.autoplay.start();
		});
}

// 베스트 후기 4단
function loadSwiperBestReviewCol4(el) {
	var swiperList = $(el + ' .swiper-slide');
	if (swiperList.length) {
		var swiperObj = new Swiper(el + ' .swiper-container', {
			loop: true,
			autoplay: false,
			/* autoplay: {
				delay: 3000,
			}, */
			pagination: false,
			navigation: {
				nextEl: el + ' .swiper-button-next',
				prevEl: el + ' .swiper-button-prev',
			},
			// spaceBetween: 40,
			spaceBetween: 0,
			slidesPerView: 'auto',
			centeredSlides: true,
		});
	}
	$('.section-best-review')
		.on('mouseenter', function () {
			//swiperObj.autoplay.stop();
		})
		.on('mouseleave', function () {
			//swiperObj.autoplay.start();
		});
}

// 미디어 쇼핑 빅 영상 이미지 + 3단 상품 유닛
function loadSwiperMediaShopping(el) {
	var swiperList = $(el + ' .swiper-slide');
	if (swiperList.length) {
		var swiperObj = new Swiper(el + ' .swiper-container', {
			loop: true,
			navigation: {
				nextEl: el + ' .swiper-button-next',
				prevEl: el + ' .swiper-button-prev',
			},
			autoplay: {
				delay: 3000,
			},
			paginationClickable: true,
			spaceBetween: 28,
			slidesPerView: 4,
		});
	}
}

// VR TOUR - 다이나믹 컨텐츠 배너 : 3D 플립 스와이프 slider
function loadSwiper3dDynamicBanner(el) {
	var swiperList = $(el + ' .swiper-slide');
	if (swiperList.length) {
		var swiperObj = new Swiper(el + ' .swiper-container', {
			loop: true,
			autoHeight: true,
			navigation: {
				nextEl: el + ' .swiper-button-next',
				prevEl: el + ' .swiper-button-prev',
			},
			// autoplay: {
			// 	delay: 3000,
			// },
			effect: 'coverflow',
			coverflowEffect: {
				rotate: 0,
				stretch: 40,
				depth: 100,
				modifier: 1,
				// slideShadows: true,
			},
			paginationClickable: true,
			// spaceBetween: 28,
			slidesPerView: 3,
			centeredSlides: true,
		});
	}
}

// autoplay 가 아닌 고정 3단 슬라이드
function loadSwiperSingle(el) {
	var swiperList = $(el + ' .swiper-slide'),
		swiperControl = $(el + ' .swiper-controls-wrap');

	if (swiperList.length > 1) {
		var swiperObj = new Swiper(el + ' .swiper-container', {
			loop: true,
			navigation: {
				nextEl: el + ' .swiper-button-next',
				prevEl: el + ' .swiper-button-prev',
			},
			paginationClickable: true,
			spaceBetween: 5,
			slidesPerView: 1,
		});
	} else {
		swiperList.show();
		swiperControl.hide();
	}
}
// 메인 모듈에서 더보기 클릭시 내용 추가와 함께 스크롤 다운 : 200818
// $(document).on('click', '.button-mainmodule-more', function (e) {
// 	e.preventDefault();
// 	var $pos = $(document).scrollTop();
// 	// innerHtml = '<div style="height:500px; background:#ccc"></div>';
// 	// $('.product-item-medium-lists').append(innerHtml);
// 	$('html, body').animate({ scrollTop: $pos + 1 }, 10);
// });

//top banner 모듈 : 200908
$(document)
	.on('click', '.button-open-top-banner', function (e) {
		e.preventDefault();
		var thisT = $(this).closest('.top-banner');
		if (thisT.hasClass('is-active')) {
			thisT.removeClass('is-active');
			thisT.find('.top-banner-area').slideUp('fast');
		} else {
			thisT.addClass('is-active');
			thisT.find('.top-banner-area').slideDown('fast');
		}
	})
	.on('click', '.button-close-top-banner', function (e) {
		e.preventDefault();
		$(this).closest('.top-banner-list').hide();
	});

// 미디어쇼핑 동영상 플레이 : 200909
$(document)
	.on('click', '.button-media-video', function () {
		$(this).hide().closest('.thumb-video').children('.embed-container').show();
	})
	.on('click', '.button-media-video-close', function () {
		$(this).closest('.thumb-video').children('.embed-container').hide();
		$(this).closest('.thumb-video').children('.button-media-video').show();
	});

// 공간 솔루션 : 200910
localStorage.dataSolution = '';
localStorage.dataSolutionName = '원하시는 공간을 설정해주세요.';
// 공간솔루션 툴팁 위치값 배열
var solutionTipLoc = [
	[65, 121],
	[188, 196],
	[207, 285],
	[65, 333],
	[90, 282],
	[0, 185],
];
$(document)
	.on('mouseenter', '.section-solution .svg-link-item', function () {
		var $thisTip = $('.section-solution .solution-tooltip');
		var thisSol = $(this).data('solution');
		var thisName = $(this).data('name');

		$('.section-solution .solution-img-bg').removeClass('is-active');
		$('.section-solution .solution-img-bg__' + thisSol).addClass('is-active');
		// $thisTip.css(solutionTipLoc[thisSol + 1]).text(thisName);
		var topStr = solutionTipLoc[thisSol - 1][0] + 'px';
		var leftStr = solutionTipLoc[thisSol - 1][1] + 'px';
		$thisTip.css({ top: topStr, left: leftStr }).text(thisName);
	})
	.on('mouseleave', '.section-solution .solution-img-wrap', function () {
		var $thisTip = $('.section-solution.solution-tooltip');
		var thisSol = localStorage.dataSolution;
		var thisName = localStorage.dataSolutionName;
		var topStr, leftStr;
		if (thisSol == '' || thisSol == undefined) {
			thisSol = 1;
			topStr = solutionTipLoc[5][0] + 'px';
			leftStr = solutionTipLoc[5][1] + 'px';
		} else {
			topStr = solutionTipLoc[thisSol - 1][0] + 'px';
			leftStr = solutionTipLoc[thisSol - 1][1] + 'px';
		}
		if (thisName == '' || thisName == undefined) {
			thisName = '원하시는 공간을 설정해주세요.';
		}
		$('.solution-img-bg').removeClass('is-active');
		$('.solution-img-bg__' + thisSol).addClass('is-active');
		$thisTip.css({ top: topStr, left: leftStr }).text(thisName);
	})
	.on('click', '.section-solution .svg-link-item', function () {
		localStorage.dataSolution = $(this).data('solution');
		localStorage.dataSolutionName = $(this).data('name');
		$('.solution-title > span').removeClass('is-active');
		$('.solution-title__' + localStorage.dataSolution).addClass('is-active');
		$('.solution-option-item > div').removeClass('is-active');
		$('#solution-option-item__' + localStorage.dataSolution)
			.addClass('is-active')
			.find('.button')
			.eq(0)
			.addClass('is-active')
			.siblings('.button')
			.removeClass('is-active');
		$('.solution-option-brand > div').removeClass('is-active');
		$('#solution-option-brand__' + localStorage.dataSolution)
			.addClass('is-active')
			.find('.button')
			.eq(0)
			.addClass('is-active')
			.siblings('.button')
			.removeClass('is-active');
	})
	.on('click', '.section-solution .solution-option-menu .button', function () {
		$(this).addClass('is-active').siblings('.button').removeClass('is-active');
		if ($(this).attr('data-sub') != '' && $(this).attr('data-sub') != undefined) {
			$('.solution-option-brand > div').removeClass('is-active');
			$('#solution-option-brand__' + $(this).data('sub'))
				.addClass('is-active')
				.find('.button')
				.eq(0)
				.addClass('is-active')
				.siblings('.button')
				.removeClass('is-active');
		}
		if ($(this).attr('data-solution') != '' && $(this).attr('data-solution') != undefined) {
			$('.solution-option-brand > div').removeClass('is-active');
			$('#solution-option-brand__' + $(this).data('solution'))
				.addClass('is-active')
				.find('.button')
				.eq(0)
				.addClass('is-active')
				.siblings('.button')
				.removeClass('is-active');
		}
	});

// 커뮤니티-오픈하우스 상단 아이콘 리스트
$(document).on('click', '.icon-category-item > a', function (e) {
	e.preventDefault();
	$(this).closest('.icon-category-lists').find('.icon-category-item > a').removeClass('is-active');
	$(this).addClass('is-active');
});

// 윙배너 스크롤 포지션
function setWingBannerScroll(el, top) {
	$el = $(el);
	var footer_top = $('#footer').offset().top;
	var scroll_top = $(window).scrollTop();
	if (top === undefined || top == '') {
		top = 810;
	}
	if ($('.top-banner').length) {
		var topBannerH = $('.top-banner').outerHeight();
		console.log('topBannerH :', topBannerH);
		top += topBannerH;
	}
	var topPx = top + 'px';

	if (scroll_top < top - 20) {
		$el.css({ position: 'absolute', top: topPx });
	} else {
		$el.css({ position: 'fixed', top: '20px' });
	}
}

$(function () {
	// 와이드 이미지를 중앙 정렬 시킴 : 201027
	if ($('.top-banner-default').length) {
		var topBannerDefault = $('.top-banner-default');
		var imgSrc = topBannerDefault.find('img').attr('src');
		topBannerDefault.children('img').css({ visibility: 'hidden' });
		topBannerDefault.css({ 'background-image': 'url(' + imgSrc + ')' });
	}
	if ($('.top-banner-area').length) {
		var topBannerArea = $('.top-banner-area');
		var imgSrc = topBannerArea.find('img').attr('src');
		topBannerArea.children('img').css({ visibility: 'hidden' });
		topBannerArea.css({ 'background-image': 'url(' + imgSrc + ')' });
	}
});

// 집테리어 간편견적
function loadSwiperSelectImg(el) {
	var swiperList = $(el + ' .swiper-slide'),
		swiperControlWrap = $(el + ' .section-control-wrap');

	if (swiperList.length > 1) {
		var swiperObj = new Swiper(el + ' .swiper-container', {
			// autoplay: {
			// 	delay: 5000,
			// },
			// simulateTouch: false,
			speed: 800,
			slidesPerView: 1.1,
			spaceBetween: 10,
			// loop: true,
			// navigation: {
			// 	nextEl: el + ' .swiper-button-next',
			// 	prevEl: el + ' .swiper-button-prev',
			// },
			// pagination: {
			// 	el: el + ' .swiper-pagination',
			// 	clickable: true,
			// },
		});
	} else {
		swiperList.show();
		swiperControlWrap.hide();
	}
	swiperList.on('click', function (e) {
		e.preventDefault();
		$(this).addClass('is-active').siblings().removeClass('is-active');
	});
}

function loadSwiperSelectImg2(el) {
	var swiperList = $(el + ' .swiper-slide'),
		swiperControlWrap = $(el + ' .section-control-wrap');

	if (swiperList.length > 1) {
		var swiperObj = new Swiper(el + ' .swiper-container', {
			// autoplay: {
			// 	delay: 5000,
			// },
			// simulateTouch: false,
			speed: 800,
			slidesPerView: 2.2,
			spaceBetween: 10,
			// loop: true,
			// navigation: {
			// 	nextEl: el + ' .swiper-button-next',
			// 	prevEl: el + ' .swiper-button-prev',
			// },
			// pagination: {
			// 	el: el + ' .swiper-pagination',
			// 	clickable: true,
			// },
		});
	} else {
		swiperList.show();
		swiperControlWrap.hide();
	}
	swiperList.find('.product-item__image, .product-item__content').on('click', function (e) {
		e.preventDefault();
		$(this).parent().parent().addClass('is-active').siblings().removeClass('is-active');
	});
}

function loadSwiperSelectImg5(el) {
	var swiperList = $(el + ' .swiper-slide'),
		swiperControlWrap = $(el + ' .section-control-wrap');

	if (swiperList.length > 5) {
		var swiperObj = new Swiper(el + ' .swiper-container', {
			// autoplay: {
			// 	delay: 5000,
			// },
			// simulateTouch: false,
			speed: 800,
			slidesPerView: 5.3,
			spaceBetween: 10,
			// loop: true,
			// navigation: {
			// 	nextEl: el + ' .swiper-button-next',
			// 	prevEl: el + ' .swiper-button-prev',
			// },
			// pagination: {
			// 	el: el + ' .swiper-pagination',
			// 	clickable: true,
			// },
		});
	} else {
		swiperList.css({ 'flex-shrink': '1', 'margin-right': '14px', width: '185px' });
		swiperList.last().css({ 'margin-right': '0' });
		swiperControlWrap.hide();
	}
	swiperList.find('.product-item__image, .product-item__content').on('click', function (e) {
		e.preventDefault();
		$(this).parent().parent().addClass('is-active').siblings().removeClass('is-active');
	});
}

// 공방 분리 슬라이더
function gongSeparatedSwiper(sliderControlSelector, swiperContainerSelector, slidesPerView, spaceBetween) {
	var swiperContainer = $(swiperContainerSelector);
	var swiperControlWrap = $(sliderControlSelector);

	var swiperList = swiperContainer.find('.swiper-slide');

	var slidesToAdd = slidesPerView - (swiperList.length % slidesPerView);
	if (slidesToAdd !== slidesPerView) {
		for (var i = 0; i < slidesToAdd; i++) {
			swiperContainer.find('.swiper-wrapper').append('<div class="swiper-slide empty-slide"></div>');
		}
		swiperList = swiperContainer.find('.swiper-slide');
	}

	if (swiperList.length > slidesPerView) {
		var swiperObj = new Swiper(swiperContainer[0], {
			spaceBetween: spaceBetween,
			loop: false,
			autoHeight: true,
			navigation: {
				nextEl: swiperControlWrap.find('.swiper-button-next')[0],
				prevEl: swiperControlWrap.find('.swiper-button-prev')[0],
			},
			pagination: {
				el: swiperControlWrap.find('.swiper-pagination-count')[0],
				type: 'custom',
				renderCustom: function (swiper, current, total) {
					swiperControlWrap.find('.swiper-pagination-current').text(current < 10 ? +current : current);
					swiperControlWrap.find('.swiper-pagination-total').text(total < 10 ? +total : total);
				},
			},
			slidesPerView: slidesPerView,
			slidesPerGroup: slidesPerView,
			on: {
				init: function () {
					var swiper = this;
					var totalNum = Math.ceil((swiper.slides.length - swiper.params.loopAdditionalSlides * 2) / slidesPerView);
					swiperControlWrap.find('.swiper-pagination-total').text(totalNum);
					swiperControlWrap.find('.swiper-pagination-current').text(1);
				},
				slideChange: function () {
					var swiper = this;
					var currentNum = Math.ceil(swiper.activeIndex / swiper.params.slidesPerGroup + 1);
					swiperControlWrap.find('.swiper-pagination-current').text(currentNum < 10 ? +currentNum : currentNum);
				},
			},
		});
	} else {
		swiperContainer.find('.swiper-wrapper').css({
			display: 'flex',
			gap: `${spaceBetween}px`,
			justifyContent: 'center',
		});

		swiperList.css({
			flex: `0 0 calc(${100 / slidesPerView}% - ${spaceBetween - spaceBetween / slidesPerView}px)`,
		});

		swiperControlWrap.hide();
	}
}
