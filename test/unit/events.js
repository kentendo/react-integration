import reactify from '../../src/index';
import React from 'react';
import ReactDOM from 'react-dom';

let x = 0;
function createComponent(event) {
  class Component extends HTMLElement {
    trigger() {
      this.dispatchEvent(new CustomEvent(event));
    }
  }
  window.customElements.define(`x-events-${x++}`, Component);
  //return reactify(Component, { React, ReactDOM });
  return reactify(Component);
}

describe('custom events', () => {
  it('should bind built-in events', done => {

    let count = 0;

    const Comp = createComponent('click');
    const comp = ReactDOM.render(<Comp onClick={() => count++} />, window.fixture);

    setTimeout(() => {
      ReactDOM.findDOMNode(comp).trigger();
      expect(count).to.equal(1);
      done();
    }, 1);
  }).timeout(500000);;

  it('should bind custom events', done => {
    let count = 0;
    const Comp = createComponent('test');
    const comp = ReactDOM.render(<Comp onTest={() => count++} />, window.fixture);

    setTimeout(() => {
      ReactDOM.findDOMNode(comp).trigger();
      expect(count).to.equal(1);
      done();
    }, 1);
  });

  it('should not duplicate handlers', done => {
    let count = 0;
    const Comp = createComponent('test');
    const func = () => ++count;

    // Using both ontest and onTest (case-sensitive) test case-sensitivity.
    // ontest should be just a normal prop
    const comp = ReactDOM.render(<Comp ontest={func} onTest={func} />, window.fixture);

    setTimeout(() => {
      ReactDOM.findDOMNode(comp).trigger();
      expect(count).to.equal(1);
      done();
    }, 1);
  });

  it('should preserve declared casing', done => {
    let count = 0;
    const Comp = createComponent('testThis');
    const func = () => ++count;

    const comp = ReactDOM.render(<Comp ontestThis={func} onTestThis={func} />, window.fixture);

    setTimeout(() => {
      ReactDOM.findDOMNode(comp).trigger();
      expect(count).to.equal(1);
      done();
    }, 1);
  });

  it('should handle dashes correctly', done => {
    let count = 0;
    const Comp = createComponent('test-this');
    const func = () => ++count;

    const comp = ReactDOM.render(<Comp ontest-This={func} onTest-this={func} />, window.fixture);

    setTimeout(() => {
      ReactDOM.findDOMNode(comp).trigger();
      expect(count).to.equal(1);
      done();
    }, 1);
  });

  it('should not treat `once` prop as an event', done => {
    let count = 0;
    const Comp = createComponent('ce');
    const func = () => ++count;

    const comp = ReactDOM.render(<Comp once={func} />, window.fixture);

    setTimeout(() => {
      ReactDOM.findDOMNode(comp).trigger();
      expect(count).to.equal(0);
      done();
    }, 1);
  });
});
