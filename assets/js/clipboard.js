// 클립보드 복사
function copyHTML(tgt) {
	// Get references to the button and the target area
	var copyButton = this;
	var targetArea = document.getElementById(tgt);

	// Add a click event listener to the button
	copyButton.addEventListener('click', function () {
		// Create a new HTML element (e.g., a <div> element) that represents the HTML tag you want to copy
		var htmlTag = targetArea.innerHTML;

		// Create a new textarea element and set its value to the HTML tag
		var textArea = document.createElement('textarea');
		textArea.value = htmlTag;
		document.body.appendChild(textArea);

		// Select the text in the text area and copy it to the clipboard
		textArea.select();
		document.execCommand('copy');

		// Remove the text area element
		document.body.removeChild(textArea);

		// Append the copied HTML tag to the target area
		targetArea.innerHTML = htmlTag;
	});
}
