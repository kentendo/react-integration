import reactify from '../../src/index';
import React from 'react';
import ReactDOM from 'react-dom';

describe('display-name', () => {
  it('should be a PasalCased version of the tagName', () => {

    class Component extends HTMLElement {}
    window.customElements.define('x-display-name-1', Component);
    const Comp = reactify(Component, { React, ReactDOM });

    ReactDOM.render(React.createElement(Comp), window.fixture);
    expect(Comp.displayName).to.equal('XDisplayName_1');
  });
});
