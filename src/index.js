import React, { Component } from "react";
import ClassNames from "classnames";
import PropTypes from "prop-types";

import "./style.css";

const { min, floor } = Math;

class CanvasAsciifier extends Component {
  constructor(props) {
    super(props);

    this.textWidth = null;
    this.textHeight = null;

    this.update = this.update.bind(this);

    this.state = {
      asciiCode: ""
    };
  }

  /** Get the pre element with the generated ascii text. */
  getTextElement() {
    return this.asciiElement;
  }

  /** Generate ascii text from the canvas image data. */
  generateAsciiCode(canvasElement) {
    const { calibrator } = this;
    const { sampleSize, invert, asciiData } = this.props;
    const asciiIntervals = 255 / asciiData.length;

    this.textWidth = calibrator.offsetWidth / sampleSize;
    this.textHeight = calibrator.offsetHeight / sampleSize;

    const { width, height, offsetWidth, offsetHeight } = canvasElement;

    const canvasWidthScale = offsetWidth / width;
    const canvasHeightScale = offsetHeight / height;

    const widthScale = this.textWidth / canvasWidthScale;
    const heightScale = this.textHeight / canvasHeightScale;

    const context = canvasElement.getContext("2d");
    const pixels = context.getImageData(0, 0, width, height).data;

    let asciiCode = "";

    for (let y = 0; y < height; y += heightScale) {
      for (let x = 0; x < width; x += widthScale) {
        let i = Math.round(y) * width * 4 + Math.round(x) * 4;

        /* turn RGB color to grayscale. */
        let averageValue = pixels[i] + pixels[i + 1] + pixels[i + 2];

        averageValue = averageValue / 3 * pixels[i + 3] / 255;

        /* turn RGB color to grayscale. */
        if (invert !== true) {
          averageValue = 255 - averageValue;
        }

        /* work out the index of the asciiData. */
        const index = min(
          floor(averageValue / asciiIntervals),
          asciiData.length - 1
        );

        asciiCode += asciiData[index];
      }

      asciiCode += "\n";
    }

    return asciiCode;
  }

  /** Update the pre element with generated ascii text. */
  update(canvasElement) {
    this.setState({ asciiCode: this.generateAsciiCode(canvasElement) });
  }

  render() {
    const {
      className,
      style,
      textClassName,
      textStyle,
      sampleSize
    } = this.props;
    const { asciiCode } = this.state;

    return (
      <div
        className={ClassNames("asciifier-container", className)}
        style={style}
      >
        <pre
          ref={calibrator => (this.calibrator = calibrator)}
          className={ClassNames(
            "asciifier-text",
            "asciifier-calibrator",
            textClassName
          )}
          style={textStyle}
        >
          {Array(sampleSize)
            .fill(
              Array(sampleSize)
                .fill(".")
                .join("")
            )
            .join("\n")}
        </pre>
        <pre
          ref={asciiElement => (this.asciiElement = asciiElement)}
          className={ClassNames("asciifier-text", textClassName)}
          style={textStyle}
        >
          {asciiCode}
        </pre>
      </div>
    );
  }
}

CanvasAsciifier.propTypes = {
  className: PropTypes.string,
  style: PropTypes.shape(),
  textClassName: PropTypes.string,
  textStyle: PropTypes.shape(),
  sampleSize: PropTypes.number,
  invert: PropTypes.bool,
  asciiData: PropTypes.arrayOf(PropTypes.string)
};

CanvasAsciifier.defaultProps = {
  className: "",
  style: {},
  textClassName: "",
  textStyle: {},
  sampleSize: 10,
  invert: false,
  asciiData: [" ", ".", ",", ";", "|", "*", "%", "@", "X", "#", "W", "M"]
};

export default CanvasAsciifier;
