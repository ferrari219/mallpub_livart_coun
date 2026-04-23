// 뉴캐드.js PC
// 3D 옵션 선택
// 단일 선택
$('.customBg-list').on('click', 'li', function (e) {
	e.preventDefault();
	if ($(this).hasClass('is-disabled2')) {
		return false;
	}
	$(this).addClass('is-active').siblings().removeClass('is-active');
});
$('.option-list__sub--group').on('click', 'li', function (e) {
	e.preventDefault();
	if ($(this).hasClass('is-disabled2')) {
		return false;
	}
	$('.option-list__sub--group li').removeClass('is-active');
	$(this).addClass('is-active');
});
// 추가구매 상품 선택 (제품상세_ver2.html 작업 - 퍼블 확인용)
// $('.option-list__img.multiple li').on('click', function (e) {
//     const $this = $(this);
//
//     // 뒤로가기 클릭 시
//     if ($this.hasClass('depth-back')) {
//         $('.buy-more-depth1').show();
//         $('.buy-more-depth2').hide();
//         return;
//     }
//
//     const id = $this.data('id');
//
//     // depth1 클릭 시 (선택 X, 화면 전환만)
//     if ($this.closest('.buy-more-depth1').length > 0) {
//         const groupId = id; // ex) "item2"
//
//         // depth2 항목 필터링
//         $('.buy-more-depth2 li').each(function () {
//             const optionId = $(this).data('id');
//             if (!optionId) return; // 뒤로가기 li 등
//
//             if (optionId.startsWith(groupId + '-')) {
//                 $(this).show();
//             } else {
//                 $(this).hide();
//             }
//         });
//
//         // depth 전환
//         $('.buy-more-depth2').show();
//         $('.buy-more-depth1').hide();
//         return;
//     }
//
//     // depth2 클릭 시 (복수 선택)
//     if ($this.closest('.buy-more-depth2').length > 0) {
//         $this.toggleClass('is-active');
//
//         const id = $this.data('id'); // ex) item2-option1
//         const groupId = id.split('-')[0]; // item2
//
//         // 같은 그룹에 선택된 것이 하나라도 있는지 확인
//         const isGroupActive = $(`.buy-more-depth2 li[data-id^='${groupId}-']`).is('.is-active');
//
//         // depth1 항목 동기화
//         if (isGroupActive) {
//             $(`.buy-more-depth1 li[data-id='${groupId}']`).addClass('is-active');
//         } else {
//             $(`.buy-more-depth1 li[data-id='${groupId}']`).removeClass('is-active');
//         }
//     }
// });

// 3D 옵션 그룹 아코디언
$('.option-list-top button').on('click', function () {
	const $btn = $(this);
	const $btm = $btn.closest('.option-list').find('.option-list-btm');
	const $icon = $btn.find('i');

	$btn.toggleClass('is-active');

	// is-active -> slideDown, 아닐 경우 -> slideUp
	if ($btn.hasClass('is-active')) {
		$btm.addClass('is-active').stop(true, true).slideDown(200);
		$icon.removeClass('ico-plus').addClass('ico-minus');
	} else {
		$btm.removeClass('is-active').stop(true, true).slideUp(200);
		$icon.removeClass('ico-minus').addClass('ico-plus');
	}
});
// 슬라이더
var slider = document.getElementById('range-slider');
var trackHighlight = document.getElementById('range-track-highlight');
var stepValues = [0, 25, 50, 75, 100];

function getStepValue(type) {
	let value = parseInt(slider.value);
	let index = stepValues.indexOf(value);

	if (index === -1) {
		index = Math.round(value / 25);
	}

	if (type === 'plus') {
		index = Math.min(index + 1, stepValues.length - 1);
	} else {
		index = Math.max(index - 1, 0);
	}

	slider.value = stepValues[index];
	updateSlider(); // 값 변경 후 UI 반영
}

function updateSlider() {
	const max = 100; // 이미 max가 100으로 고정되어 있다면 생략 가능
	const sliderValue = parseInt(slider.value);

	const percentage = (sliderValue / max) * 100;
	trackHighlight.style.width = percentage + '%';
}

slider.addEventListener('input', updateSlider);
window.addEventListener('resize', updateSlider);
updateSlider();

$(document).ready(function () {
	// $( document ).on( 'click', '.control-bg.control-wrap.modal-button', function () {
	//     $( '.modal.header-small' ).addClass( 'is-active' );
	// } );
	// $( document ).on( 'click', '.modal-close-this.is-large, .modal-background-this ', function () {
	//     $( '.modal.header-small' ).removeClass( 'is-active' );
	// } );

	// 에어브릿지 3D 코디네이터 종료 이벤트 1
	$(document).on('click', '#modal-custom3d .modal-close.is-large', function () {
		airbridge.events.send('3d_coordinator_closed', {
			label: NewCAD.product.pcode,
			action: NewCAD.product.name,
			semanticAttributes: {
				products: [
					{
						productID: NewCAD.product.pcode,
					},
				],
			},
		});
	});

	// 에어브릿지 3D 코디네이터 종료 이벤트 2
	const modal = document.getElementById('modal-custom3d');

	if (modal.classList.contains('is-active')) {
		document.addEventListener('keydown', function (event) {
			if (event.key === 'Escape') {
				airbridge.events.send('3d_coordinator_closed', {
					label: NewCAD.product.pcode,
					action: NewCAD.product.name,
					semanticAttributes: {
						products: [
							{
								productID: NewCAD.product.pcode,
							},
						],
					},
				});
			}
		});
	}

	// 선택한 옵션
	const $optionLists = $('.choose-option-lists');
	const $showBtn = $('.choose-option-show');
	const $hideBtn = $('.choose-option-hide');

	// 상태저장 (옵션 열기에서 닫기 위해 먼저 선언)
	const $saveLists = $('.save-state-lists');
	const $saveShowBtn = $('.save-state-show');
	const $saveHideBtn = $('.save-state-hide');

	// 초기 상태 설정
	$optionLists.hide();
	$hideBtn.hide(); // 숨기기 버튼도 초기에 숨김 (리스트 열기 전이므로)

	$saveLists.hide();
	$saveHideBtn.hide();

	// 리스트 열기
	$showBtn.on('click', function () {
		// [Modify] 저장상태 열려 있으면 닫고 버튼 상태 맞춤
		$saveLists.stop(true, true).hide();
		$saveShowBtn.show();
		$saveHideBtn.hide();

		$optionLists.stop(true, true).fadeIn(300);
		$showBtn.hide();
		$hideBtn.show();
	});

	// 리스트 닫기
	$hideBtn.on('click', function () {
		$optionLists.stop(true, true).fadeOut(100, function () {
			$showBtn.show();
			$hideBtn.hide();
		});
	});

	$saveShowBtn.on('click', function () {
		// [Modify] 옵션 리스트 열려 있으면 닫고 버튼 상태 맞춤
		$optionLists.stop(true, true).hide();
		$showBtn.show();
		$hideBtn.hide();

		$saveLists.stop(true, true).fadeIn(300);
		$saveShowBtn.hide();
		$saveHideBtn.show();
	});

	$saveHideBtn.on('click', function () {
		$saveLists.stop(true, true).fadeOut(100, function () {
			$saveShowBtn.show();
			$saveHideBtn.hide();
		});
	});
});

// 배경설정 인테리어 스와이퍼
$(document).ready(function () {
	const $swiperContainer = $('.customBg-swiper');
	const $swiperControl = $swiperContainer.find('.navigation-box');
	let customBgSwiper = null;

	// 슬라이드 2개 이상일 때 Swiper 초기화
	function initCustomSwiper() {
		const slideCount = $swiperContainer.find('.swiper-slide').length;

		// 이미 초기화되어 있다면 다시 생성하지 않음
		if (customBgSwiper !== null) return;

		if (slideCount > 1) {
			customBgSwiper = new Swiper('.customBg-swiper', {
				slidesPerView: 2.3,
				spaceBetween: 10,
				speed: 800,
				navigation: {
					nextEl: '.swiper-button-next',
					prevEl: '.swiper-button-prev',
				},
				observer: true,
				observeParents: true,
			});
		} else {
			$swiperControl.hide();
		}
	}
	// 3. 페이지 로드 시 또는 모달이 열릴 때 초기화 실행
	initCustomSwiper();

	// 마우스 오버 시 네비게이션 컨트롤 표시
	$swiperContainer.on('mouseenter mouseleave', function (e) {
		const slideCount = $(this).find('.swiper-slide').length;
		if (slideCount > 2) {
			$swiperControl.stop(true, true).fadeToggle(e.type === 'mouseenter' ? 100 : 200);
		}
	});

	// 슬라이드 클릭 시 is-active 클래스 처리
	$swiperContainer.on('click', '.swiper-slide', function () {
		$(this).addClass('is-active').siblings().removeClass('is-active');
	});

	// Swiper 업데이트
	$(document).on('click', 'button[aria-controls="tabpanelBg-2"]', function () {
		if (customBgSwiper) {
			customBgSwiper.update();
			customBgSwiper.slideTo(0, 0);
		} else {
			// 첫 로드 시점에 초기화가 안 되었다면 여기서 재시도
			initCustomSwiper();
		}
	});
});

// 카메라 컨트롤 박스 토글 / 배경 팝업
$(document).ready(function () {
	const $wrap = $('.control-camera');
	const $box = $('.control-camera-box');
	const $modalBg = $('#modal-bg');
	const $bgBtn = $('.control-bg');

	// 공통 닫기
	function closeAll() {
		$box.hide();
		$modalBg.removeClass('is-active');
		$bgBtn.removeClass('is-active');
	}

	$wrap.on('click', function (e) {
		e.stopPropagation();
		const isOpening = $box.is(':hidden');
		if (isOpening) closeAll(); // 열기 직전에 다른 것들 다 닫기
		$box.toggle();
	});

	// 카메라 박스 안에 눌러도 안 닫힘
	$box.on('click', (e) => e.stopPropagation());

	// 배경 팝업
	$(document).on('click', '.control-bg', function (e) {
		e.preventDefault();
		e.stopPropagation();
		if (!$modalBg.length) return;

		const isActive = $modalBg.hasClass('is-active');

		// 열기 직전에 다른 것들 다 닫기
		if (!isActive) closeAll();

		$modalBg.toggleClass('is-active', !isActive);
		$(this).toggleClass('is-active', !isActive);
	});

	$(document).on('click', function (e) {
		const $target = $(e.target);

		// 카메라 박스 외부 클릭 시 닫기
		if (!$target.closest('.control-camera-box').length && !$target.closest('.control-camera').length) {
			$box.hide();
		}

		// 배경 팝업 외부 클릭 시 닫기
		if ($modalBg.hasClass('is-active')) {
			const isOutside = !$target.closest($modalBg).length && !$target.closest('.control-bg').length;

			if (isOutside) {
				$modalBg.removeClass('is-active');
				$bgBtn.removeClass('is-active');
			}
		}
	});
	$(document).on('click', '.modal-background-this', function () {
		$bgBtn.removeClass('is-active');
	});
});

// 튜토리얼
$(document).on('click', '.custom3d-tutorial .button', function (e) {
	e.stopPropagation();
	$(this).closest('.custom3d-tutorial').fadeOut(300);
});

// Gemini Setting: Temperature / Top 슬라이더 → 값 표시 (0.05 단위) + 칩 is-active 동기화
function updateGeminiSliderDisplay(sliderId, valueId) {
	var $slider = $('#' + sliderId);
	var $value = $('#' + valueId);
	if (!$slider.length || !$value.length) return;
	var val = parseFloat($slider.val()) || 0;
	val = Math.round(val * 20) / 20;
	$value.text(val.toFixed(2));
	var $card = $slider.closest('.gemini-side-card');
	$card.find('.gemini-chip').each(function () {
		var chipVal = parseFloat($(this).text().trim());
		if (!isNaN(chipVal) && Math.abs(chipVal - val) < 0.01) {
			$(this).addClass('is-active');
		} else {
			$(this).removeClass('is-active');
		}
	});
}
$(document).on('input change', '#gemini-temperature-slider', function () {
	updateGeminiSliderDisplay('gemini-temperature-slider', 'gemini-temperature-value');
});
$(document).on('input change', '#gemini-top-slider', function () {
	updateGeminiSliderDisplay('gemini-top-slider', 'gemini-top-value');
});

// Gemini Setting: 칩 클릭 시 슬라이더·값 반영 + 해당 칩만 is-active
$(document).on('click', '.gemini-side-card .gemini-chip', function () {
	var $chip = $(this);
	var $card = $chip.closest('.gemini-side-card');
	var chipVal = parseFloat($chip.text().trim());
	if (isNaN(chipVal)) return;
	var $slider = $card.find('.gemini-side-slider');
	var $value = $card.find('.gemini-side-value');
	if (!$slider.length || !$value.length) return;
	var min = parseFloat($slider.attr('min')) || 0;
	var max = parseFloat($slider.attr('max')) || 1;
	chipVal = Math.max(min, Math.min(max, chipVal));
	$slider.val(chipVal);
	$value.text(chipVal.toFixed(2));
	$card.find('.gemini-chip').removeClass('is-active');
	$chip.addClass('is-active');
});

// Gemini hashtag: 하나만 선택, 다시 누르면 해제 (진하게 = is-active)
$(document).on('click', '.gemini-hashtag', function () {
	var $btn = $(this);
	var $row = $btn.closest('.gemini-hashtag-row');
	if ($btn.hasClass('is-active')) {
		$btn.removeClass('is-active');
	} else {
		$row.find('.gemini-hashtag').removeClass('is-active');
		$btn.addClass('is-active');
	}
});
