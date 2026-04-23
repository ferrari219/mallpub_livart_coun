$(document).ready(function(e) {

	if(
		$("#series_name") !== null &&
		$("#series_name") !== undefined
	){
    //해당 id 값 있는 경우만 실행


	//숫자만 입력 가능
	$(".closet_cont input").keyup(function(e){
		var inputVal = $(this).val();
		$(this).val(inputVal.replace(/[^0-9]/gi,''));
	});

	$("#call_input_text").click(function() {
		var series_txt = $("#series_name").html();
		var width_txt = $("#width_input").val();
		var height_txt = $("#height_input").val();
		var deep_txt = $("#deep_input").val();
		var common_img = "<img src='http://mall.hyundailivart.co.kr/UserFiles/Image/00_pd/on/99/closet_cal/common/result_";
		var nutee_img = "<img src='http://mall.hyundailivart.co.kr/UserFiles/Image/00_pd/on/99/closet_cal/nutee/";
		var eliaBasic_img = "<img src='http://mall.hyundailivart.co.kr/UserFiles/Image/00_pd/on/99/closet_cal/eliaBasic/";
		var eliaPlus_img = "<img src='http://mall.hyundailivart.co.kr/UserFiles/Image/00_pd/on/99/closet_cal/eliaPlus/";
		var puritaPlus_img = "<img src='http://mall.hyundailivart.co.kr/UserFiles/Image/00_pd/on/99/closet_cal/puritaPlus/";

		//빈값 확인
		if ($("#width_input").val().replace(/\s/g,"").length==0) {
			$("#result").css("display","block").html(common_img+"null.jpg' />");
			return false;
		}
		else if ($("#deep_input").val().replace(/\s/g,"").length==0) {
			$("#result").css("display","block").html(common_img+"null.jpg' />");
			return false;
		}
		else if ($("#height_input").val().replace(/\s/g,"").length==0) {
			$("#result").css("display","block").html(common_img+"null.jpg' />");
			return false;
		}

		if (height_txt >= 2285 && deep_txt >= 650){
			if (width_txt >=2400){
				//뉴트
				if (series_txt == "01"){
					if (width_txt < 2500){
						$("#result").css("display","block").html(nutee_img+"01.jpg' />");
					}
					else if (width_txt < 2600){
						$("#result").css("display","block").html(nutee_img+"02.jpg' />");
					}
					else if (width_txt < 2700){
						$("#result").css("display","block").html(nutee_img+"03.jpg' />");
					}
					else if (width_txt < 2800){
						$("#result").css("display","block").html(nutee_img+"04.jpg' />");
					}
					else if (width_txt < 2900){
						$("#result").css("display","block").html(nutee_img+"05.jpg' />");
					}
					else if (width_txt < 3000){
						$("#result").css("display","block").html(nutee_img+"06.jpg' />");
					}
					else if (width_txt < 3100){
						$("#result").css("display","block").html(nutee_img+"07.jpg' />");
					}
					else if (width_txt < 3200){
						$("#result").css("display","block").html(nutee_img+"08.jpg' />");
					}
					else if (width_txt < 3300){
						$("#result").css("display","block").html(nutee_img+"09.jpg' />");
					}
					else if (width_txt < 3400){
						$("#result").css("display","block").html(nutee_img+"10.jpg' />");
					}
					else if (width_txt < 3500){
						$("#result").css("display","block").html(nutee_img+"11.jpg' />");
					}
					else if (width_txt < 3600){
						$("#result").css("display","block").html(nutee_img+"12.jpg' />");
					}
					else if (width_txt < 3700){
						$("#result").css("display","block").html(nutee_img+"13.jpg' />");
					}
					else if (width_txt < 3800){
						$("#result").css("display","block").html(nutee_img+"14.jpg' />");
					}
					else if (width_txt < 3900){
						$("#result").css("display","block").html(nutee_img+"15.jpg' />");
					}
					else{
						$("#result").css("display","block").html(nutee_img+"16.jpg' />");
					}
				}
				//엘리아베이직
				else if (series_txt == "02"){
					if (width_txt < 2600){
						$("#result").css("display","block").html(eliaBasic_img+"01.jpg' />");
					}
					else if (width_txt < 2800){
						$("#result").css("display","block").html(eliaBasic_img+"02.jpg' />");
					}
					else if (width_txt < 3000){
						$("#result").css("display","block").html(eliaBasic_img+"03.jpg' />");
					}
					else if (width_txt < 3200){
						$("#result").css("display","block").html(eliaBasic_img+"04.jpg' />");
					}
					else if (width_txt < 3400){
						$("#result").css("display","block").html(eliaBasic_img+"05.jpg' />");
					}
					else if (width_txt < 3600){
						$("#result").css("display","block").html(eliaBasic_img+"06.jpg' />");
					}
					else if (width_txt < 3800){
						$("#result").css("display","block").html(eliaBasic_img+"07.jpg' />");
					}
					else{
						$("#result").css("display","block").html(eliaBasic_img+"08.jpg' />");
					}
				}
				//엘리아플러스
				else if (series_txt == "03"){
					if (width_txt < 2600){
						$("#result").css("display","block").html(eliaPlus_img+"01.jpg' />");
					}
					else if (width_txt < 2800){
						$("#result").css("display","block").html(eliaPlus_img+"02.jpg' />");
					}
					else if (width_txt < 3000){
						$("#result").css("display","block").html(eliaPlus_img+"03.jpg' />");
					}
					else if (width_txt < 3200){
						$("#result").css("display","block").html(eliaPlus_img+"04.jpg' />");
					}
					else if (width_txt < 3400){
						$("#result").css("display","block").html(eliaPlus_img+"05.jpg' />");
					}
					else if (width_txt < 3600){
						$("#result").css("display","block").html(eliaPlus_img+"06.jpg' />");
					}
					else if (width_txt < 3800){
						$("#result").css("display","block").html(eliaPlus_img+"07.jpg' />");
					}
					else{
						$("#result").css("display","block").html(eliaPlus_img+"08.jpg' />");
					}
				}			
				//퓨리타플러스
				else if (series_txt == "04"){
					if (width_txt < 2600){
						$("#result").css("display","block").html(puritaPlus_img+"01.jpg' />");
					}
					else if (width_txt < 2800){
						$("#result").css("display","block").html(puritaPlus_img+"02.jpg' />");
					}
					else if (width_txt < 3000){
						$("#result").css("display","block").html(puritaPlus_img+"03.jpg' />");
					}
					else if (width_txt < 3200){
						$("#result").css("display","block").html(puritaPlus_img+"04.jpg' />");
					}
					else if (width_txt < 3400){
						$("#result").css("display","block").html(puritaPlus_img+"05.jpg' />");
					}
					else if (width_txt < 3600){
						$("#result").css("display","block").html(puritaPlus_img+"06.jpg' />");
					}
					else if (width_txt < 3800){
						$("#result").css("display","block").html(puritaPlus_img+"07.jpg' />");
					}
					else{
						$("#result").css("display","block").html(puritaPlus_img+"08.jpg' />");
					}
				}
			}
			else{
				$("#result").css("display","block").html(common_img+"width.jpg' />");
			}
		}
		else if (height_txt >= 2285 && deep_txt < 650){
			$("#result").css("display","block").html(common_img+"deep.jpg' />");
		}
		else if (height_txt < 2285 && deep_txt >= 650){
			$("#result").css("display","block").html(common_img+"height.jpg' />");
		}
		else{
			$("#result").css("display","block").html(common_img+"hi_de.jpg' />");
		}
	});

//엔터키 이벤트
	$(".closet_cont input").keypress(function(e){
		if (e.which == 13) {
			$("#call_input_text").click();
			//return false;
		};
	});
}
});