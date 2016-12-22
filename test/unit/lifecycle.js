import reactify from '../../src/index';
import React from 'react';
import ReactDOM from 'react-dom';

describe('lifecycle', () => {
  it('should call connectedCallback', done => {

    class Component extends HTMLElement {
      connectedCallback() {
        done();
      }
    }

    window.customElements.define(`x-lifecycle`, Component);
    const Comp = reactify(Component, { React, ReactDOM });

    const comp = ReactDOM.render(<Comp />, window.fixture);
  });
});
