import reactify from '../../src/index';

describe('errors', () => {
  const msg = 'or passed via opts.';

  it('no custom element', () => {
      expect(() => reactify()).to.throw('Given element is not a valid constructor');
  });

  class Component1 extends HTMLElement { }
  class Component2 extends HTMLElement { }
  class Component3 extends HTMLElement { }
  class Component4 extends HTMLElement { }

  it('no react', () => {
    window.customElements.define('x-errors-1', Component1);
    window.customElements.define('x-no-errors-1', Component2);

    expect(() => reactify(Component1, { React: null })).to.throw(msg);
    expect(() => reactify(Component2)).to.not.throw(msg);
  });

  it('no react-dom', () => {
    window.customElements.define('x-errors-2', Component3);
    window.customElements.define('x-no-errors-2', Component4);

    expect(() => reactify(Component3, { ReactDOM: null })).to.throw(msg);
    expect(() => reactify(Component4)).to.not.throw(msg);
  });
});
