"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

require("./style.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var min = Math.min,
    floor = Math.floor;


var SAMPLE_SIZE = 10;
var SAMPLE_ASCII = Array(SAMPLE_SIZE).fill(Array(SAMPLE_SIZE).fill(".").join("")).join("\n");

var CanvasAsciifier = function (_Component) {
  _inherits(CanvasAsciifier, _Component);

  function CanvasAsciifier(props) {
    _classCallCheck(this, CanvasAsciifier);

    var _this = _possibleConstructorReturn(this, (CanvasAsciifier.__proto__ || Object.getPrototypeOf(CanvasAsciifier)).call(this, props));

    _this.textWidth = null;
    _this.textHeight = null;

    _this.update = _this.update.bind(_this);

    _this.state = {
      asciiCode: ""
    };
    return _this;
  }

  /** Get the pre element with the generated ascii text. */


  _createClass(CanvasAsciifier, [{
    key: "getTextElement",
    value: function getTextElement() {
      return this.asciiElement;
    }

    /** Generate ascii text from the canvas image data. */

  }, {
    key: "generateAsciiCode",
    value: function generateAsciiCode(canvasElement) {
      var calibrator = this.calibrator;
      var _props = this.props,
          invert = _props.invert,
          asciiData = _props.asciiData;

      var asciiIntervals = 255 / asciiData.length;

      this.textWidth = calibrator.offsetWidth / SAMPLE_SIZE;
      this.textHeight = calibrator.offsetHeight / SAMPLE_SIZE;

      var asciiCode = "";

      var width = canvasElement.width,
          height = canvasElement.height,
          offsetWidth = canvasElement.offsetWidth,
          offsetHeight = canvasElement.offsetHeight;


      if (width && height && offsetWidth && offsetHeight) {
        var canvasWidthScale = offsetWidth / width;
        var canvasHeightScale = offsetHeight / height;

        var widthScale = this.textWidth / canvasWidthScale;
        var heightScale = this.textHeight / canvasHeightScale;

        var context = canvasElement.getContext("2d");
        var pixels = context.getImageData(0, 0, width, height).data;

        for (var y = 0; y < height; y += heightScale) {
          for (var x = 0; x < width; x += widthScale) {
            var i = Math.round(y) * width * 4 + Math.round(x) * 4;

            /* turn RGB color to grayscale. */
            var averageValue = pixels[i] + pixels[i + 1] + pixels[i + 2];

            averageValue = averageValue / 3 * pixels[i + 3] / 255;

            /* turn RGB color to grayscale. */
            if (invert !== true) {
              averageValue = 255 - averageValue;
            }

            /* work out the index of the asciiData. */
            var index = min(floor(averageValue / asciiIntervals), asciiData.length - 1);

            asciiCode += asciiData[index];
          }

          asciiCode += "\n";
        }
      }

      return asciiCode;
    }

    /** Update the pre element with generated ascii text. */

  }, {
    key: "update",
    value: function update(canvasElement) {
      this.setState({ asciiCode: this.generateAsciiCode(canvasElement) });
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _props2 = this.props,
          className = _props2.className,
          textClassName = _props2.textClassName,
          textStyle = _props2.textStyle,
          onClick = _props2.onClick;
      var asciiCode = this.state.asciiCode;


      return _react2.default.createElement(
        "div",
        {
          className: (0, _classnames2.default)("asciifier-container", className),
          onClick: onClick
        },
        _react2.default.createElement(
          "pre",
          {
            ref: function ref(calibrator) {
              return _this2.calibrator = calibrator;
            },
            className: (0, _classnames2.default)("asciifier-text", "asciifier-calibrator", textClassName),
            style: textStyle
          },
          SAMPLE_ASCII
        ),
        _react2.default.createElement(
          "pre",
          {
            ref: function ref(asciiElement) {
              return _this2.asciiElement = asciiElement;
            },
            className: (0, _classnames2.default)("asciifier-text", textClassName),
            style: textStyle
          },
          asciiCode
        )
      );
    }
  }]);

  return CanvasAsciifier;
}(_react.Component);

CanvasAsciifier.propTypes = {
  className: _propTypes2.default.string,
  textClassName: _propTypes2.default.string,
  textStyle: _propTypes2.default.shape(),
  invert: _propTypes2.default.bool,
  asciiData: _propTypes2.default.arrayOf(_propTypes2.default.string),
  onClick: _propTypes2.default.func
};

CanvasAsciifier.defaultProps = {
  className: "",
  textClassName: "",
  textStyle: {},
  invert: false,
  asciiData: [" ", ".", ",", ";", "|", "*", "%", "@", "X", "#", "W", "M"],
  onClick: function onClick() {}
};

exports.default = CanvasAsciifier;