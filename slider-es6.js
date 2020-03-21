export default class Slider {
	constructor({elem, line, thumb, volume, resultHandler, ratioDefault = 1}) {
		this._elem = elem;
		this._line = line;
		this._thumb = thumb;
		this._volume = volume;
		this._resultHandler = resultHandler;
		this._ratioDefault = ratioDefault;
		// prevent 'dragndrop' as default browser action:
		this._elem.ondragstart = () => false;
		this._thumb.addEventListener('mousedown', this.onMouseDown.bind(this));
	}

	onMouseDown(evt) {
		// prevent text selection as default browser action:
		evt.preventDefault();
		this.startDrag(evt.clientX);
	}

	startDrag(clientX) {
		this._startX = clientX;
		document.addEventListener('mousemove', this.onMouseMove = this.onMouseMove.bind(this));
		document.addEventListener('mouseup', this.onMouseUp = this.onMouseUp.bind(this));
	}

	onMouseMove(evt) {
		this.moveAt(evt.clientX);
	}

	moveAt(clientX) {
		const shiftX = this._startX - clientX;
		this._startX = clientX;
		let left = this._thumb.offsetLeft - shiftX;

		if (left < 0) {
			left = 0;
		}
		if (left > this._line.offsetWidth) {
			left = this._line.offsetWidth;
		}

		this._volume.style.width = this._thumb.style.left = `${left}px`;
		const ratio = left / this._line.offsetWidth;
		this._resultHandler(ratio);
	}

	onMouseUp() {
		this.stopDrag();
	}

	stopDrag() {
		document.removeEventListener('mousemove', this.onMouseMove);
		document.removeEventListener('mouseup', this.onMouseUp);
	}

	reset() {
		this._volume.style.width = this._thumb.style.left = `${this._line.offsetWidth * this._ratioDefault}px`;
		this._resultHandler(this._ratioDefault);
	}

	show() {
		this._elem.hidden = false;
	}

	hide() {
		this._elem.hidden = true;
	}
}
