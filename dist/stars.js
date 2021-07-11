"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// MIT License
//
// Copyright (c) 2021 AlasDiablo
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.
var Star = /*#__PURE__*/function () {
  function Star(pos, size, color) {
    _classCallCheck(this, Star);

    this.pos = pos;
    this.size = size;
    this.color = color;
  }

  _createClass(Star, [{
    key: "render",
    value: function render(ctx) {
      ctx.fillStyle = "rgba(".concat(this.color.red, ", ").concat(this.color.green, ", ").concat(this.color.blue, ", ", 0.7);
      ctx.fillRect(this.pos.x, this.pos.y, this.size, this.size);
    }
  }, {
    key: "dynamicRender",
    value: function dynamicRender(ctx, delta) {
      ctx.fillStyle = "rgba(".concat(this.color.red, ", ").concat(this.color.green, ", ").concat(this.color.blue, ", ").concat(0.7 + delta);
      ctx.fillRect(this.pos.x, this.pos.y, this.size, this.size);
    }
  }]);

  return Star;
}(); // eslint-disable-next-line no-unused-vars


function stars(htmlElement, density) {
  var _ref = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
      red = _ref.red,
      blue = _ref.blue,
      white = _ref.white,
      width = _ref.width,
      height = _ref.height,
      animated = _ref.animated,
      size = _ref.size;

  var get = function get(target, defaultValue) {
    return target !== undefined ? target : defaultValue;
  };

  var redIn = get(red, true);
  var blueIn = get(blue, true);
  var whiteIn = get(white, true);
  var boundingClientRect = htmlElement.getBoundingClientRect();
  var widthIn = get(width, boundingClientRect.width);
  var heightIn = get(height, boundingClientRect.height);
  var sizeIn = get(size, 1); // eslint-disable-next-line no-unused-vars

  var animatedIn = get(animated, true);
  var canvas = document.createElement("canvas");
  var ctx = canvas.getContext("2d");
  canvas.width = widthIn;
  canvas.height = heightIn;

  var getPos = function getPos() {
    var getRandomInRange = function getRandomInRange(from, to) {
      return Math.floor(Math.random() * (to - from) + from);
    };

    return {
      x: getRandomInRange(0, widthIn),
      y: getRandomInRange(0, widthIn)
    };
  };

  var createStar = function createStar(colorSelector, white, blue, red) {
    // white
    if (colorSelector >= white.lower && colorSelector <= white.upper && whiteIn) {
      var color = Math.floor(Math.random() * 255 + 1);
      var star = new Star(getPos(), sizeIn, {
        red: color,
        green: color,
        blue: color
      });
      stars.push(star);
    } // blue
    else if (colorSelector >= blue.lower & colorSelector <= blue.upper && blueIn) {
        var _color = Math.floor(Math.random() * 255 + 1);

        var _star = new Star(getPos(), sizeIn, {
          red: 0,
          green: 0,
          blue: _color
        });

        stars.push(_star);
      } // red
      else if (colorSelector >= red.lower && colorSelector <= red.upper && redIn) {
          var _color2 = Math.floor(Math.random() * 255 + 1);

          var _star2 = new Star(getPos(), sizeIn, {
            red: _color2,
            green: 0,
            blue: 0
          });

          stars.push(_star2);
        }
  };

  var stars = [];

  for (var i = 0; i < (widthIn + heightIn) / sizeIn * density; i += sizeIn) {
    var whiteMinus = !whiteIn ? -20 : 0;
    var blueMinus = !blueIn ? -2 : 0;
    var redMinus = !redIn ? -2 : 0;
    var colorSelectorMinus = whiteMinus + blueMinus + redMinus;
    var colorSelector = Math.floor(Math.random() * (24 + colorSelectorMinus) + 1);
    createStar(colorSelector, {
      lower: 1,
      upper: 20
    }, {
      lower: 21 + whiteMinus,
      upper: 22 + whiteMinus
    }, {
      lower: 23 + whiteMinus + blueMinus,
      upper: 24 + whiteMinus + blueMinus
    });
  }

  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, widthIn, heightIn);
  stars.forEach(function (star) {
    return star.render(ctx);
  });
  htmlElement.style.backgroundImage = "url(".concat(canvas.toDataURL("image/png"), ")");
}