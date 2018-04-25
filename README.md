# canvasasciifier

A \<pre\> text React component which renders ascii from a canvas.

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![node version][node-image]][node-url]
[![npm download][download-image]][download-url]

[npm-image]: http://img.shields.io/npm/v/@jworkshop/canvasasciifier.svg
[npm-url]: http://npmjs.org/package/@jworkshop/canvasasciifier
[travis-image]: https://img.shields.io/travis/JWorkshop/canvasasciifier.svg
[travis-url]: https://travis-ci.org/JWorkshop/canvasasciifier
[node-image]: https://img.shields.io/badge/node.js-%3E=_0.10-green.svg
[node-url]: http://nodejs.org/download/
[download-image]: https://img.shields.io/npm/dm/@jworkshop/canvasasciifier.svg
[download-url]: https://npmjs.org/package/@jworkshop/canvasasciifier

## install

[![NPM](https://nodei.co/npm/@jworkshop/canvasasciifier.png)](https://nodei.co/npm/@jworkshop/canvasasciifier)

## Usage

```javascript
import React, { Component } from "react";
import ReactDOM from "react-dom";

import CanvasAsciifier from "@jworkshop/canvasasciifier";

import "./style.css";

class Example extends Component {
  someFunction() {
    const { myCanvas, myAsciifier } = this;

    /** Get the pre element with the generated ascii text. */
    myAsciifier.getTextElement();

    /** Update the pre element with generated ascii text. */
    asciifier.update(myCanvas);

    /** Generate ascii text from the canvas image data. */
    let asciiCode = myAsciifier.generateAsciiCode(myCanvas);
  }

  render() {

    return (
      <canvas
        ref={myCanvas => this.myCanvas = myCanvas}
      />
      <CanvasAsciifier
        ref={myAsciifier => this.myAsciifier = myAsciifier}
        className="className"
        style={ ... }
        textClassName="textClassName"
        textStyle={ ... }
        invert={true}
        asciiData={[" ", ".", ",", ";", "|", "*", "%", "@", "X", "#", "W", "M"]}
      />
    );
  }
}

ReactDOM.render(<Test />, document.getElementById("root"));
```
