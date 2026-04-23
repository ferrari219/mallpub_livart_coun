// SVG sprite Custom
document.addEventListener('DOMContentLoaded', function () {
	var timestamp = new Date().getTime();
	// var svgSprite = document.getElementById('svg-sprite');
	// var svgFileUrl = `../../assets/images/sprites/i.svg?v=${timestamp}`;
	// svgSprite.data = svgFileUrl;

	var icons = document.querySelectorAll("i[class*='svg']");

	icons.forEach((icon) => {
		var iconName = Array.from(icon.classList)
			.find((cls) => cls.startsWith('i-'))
			.split('-')[1];
		var svgElement = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
		var useElement = document.createElementNS('http://www.w3.org/2000/svg', 'use');

		useElement.setAttributeNS('http://www.w3.org/1999/xlink', 'href', `../../assets/images/sprites/i.svg?v=${timestamp}#i-${iconName}`);
		svgElement.appendChild(useElement);

		svgElement.setAttribute('width', icon.style.width || '24');
		svgElement.setAttribute('height', icon.style.height || '24');

		// <i> 요소의 모든 클래스 이름을 <svg> 요소로 복사
		svgElement.setAttribute('class', icon.className);

		// svgElement.style.fill = 'red';

		icon.replaceWith(svgElement);
	});
});
