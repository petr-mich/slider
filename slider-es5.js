'use strict';

window.Slider = (function() {

	return Slider;

	function Slider(options) {
		var elem = options.elem;
		var line = options.line;
		var thumb = options.thumb;
		var volume = options.volume;
		var callback = options.callback;
		var ratioDefault = options.ratioDefault || 1;
		var startX;

		this.reset = reset;
		// prevent 'dragndrop' as default browser action:
		elem.ondragstart = function() {
			return false;
		}

		thumb.addEventListener('mousedown', function(evt) {
			// prevent text selection as default browser action:
			evt.preventDefault();
			startDrag(evt.clientX);
		});

		function startDrag(clientX) {
			startX = clientX;

			document.addEventListener('mousemove', onMouseMove);
			thumb.addEventListener('mouseup', onMouseUp);
		}

		function onMouseMove(evt) {
			moveAt(evt.clientX);
		}

		function moveAt(clientX) {
			var shiftX = startX - clientX;

			startX = clientX;

			var left = thumb.offsetLeft - shiftX;

			if (left < 0) {
				left = 0;
			}
			if (left > line.offsetWidth) {
				left = line.offsetWidth;
			}

			volume.style.width = thumb.style.left = left + 'px';

			var ratio = left / line.offsetWidth;

			callback(ratio);
		}

		function onMouseUp() {
			stopDrag();
		}

		function stopDrag() {
			document.removeEventListener('mousemove', onMouseMove);
			thumb.removeEventListener('mouseup', onMouseUp);
		}

		function reset() {
			volume.style.width = thumb.style.left = line.offsetWidth * ratioDefault + 'px';
			callback(ratioDefault);
		}
	}

});
