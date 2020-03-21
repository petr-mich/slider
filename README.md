# Module "Slider"

## Description 
Simple slider module on JavaScript ES5/ES6.

## Usage
### ES5:

```js
var slider = new window.Slider({
  elem: document.querySelector(css),
  line: document.querySelector(css),
  thumb: document.querySelector(css),
  volume: document.querySelector(css),
  resultHandler: function(ratio) {
  	// handle ratio:
  	// ...
  }
})
```

### ES6:

```js
const slider = new Slider({
  elem: document.querySelector(css),
  line: document.querySelector(css),
  thumb: document.querySelector(css),
  volume: document.querySelector(css),
  resultHandler(ratio) {
  	// handle ratio:
  	// ...
  }
})
```
