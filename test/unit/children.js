import reactify from '../../src/index';
import React from 'react';
import ReactDOM from 'react-dom';

let x = 0;
function createComponent() {
  class Component extends HTMLElement {}
  window.customElements.define(`x-children-${x++}`, Component);
  return reactify(Component, { React, ReactDOM });
}

describe('children', () => {
  it('should pass on children', () => {
    const Comp = createComponent();
    const comp = ReactDOM.render(<Comp><child /></Comp>, window.fixture);
    expect(ReactDOM.findDOMNode(comp).firstChild.tagName).to.equal('CHILD');
  });
});
