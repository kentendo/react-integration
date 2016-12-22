import reactify from '../../src/index';
import React from 'react';
import ReactDOM from 'react-dom';

describe('prop-types', () => {
  it('accepts propTypes', () => {

    class Component extends HTMLElement {}
    window.customElements.define('x-prop-types-1', Component);
    const Comp = reactify(Component, { React, ReactDOM });

    Comp.propTypes = {
      someRequiredAttr: React.PropTypes.string
    };
    expect(Comp.propTypes.someRequiredAttr).to.equal(React.PropTypes.string);
  });
});
