import reactify from '../../src/index';

let x = 0;
function createComponent() {

  class Component extends HTMLElement {
    get prop() {
      return 'prop';
    }
    foo() {
      return 'bar';
    }
    getProp() {
      return this.prop;
    }
    get getter() {
      throw new Error('should not throw when reactifying');
    }
  }

  window.customElements.define(`x-webcomponent-proto-funcs-${x++}`, Component);
  return reactify(Component);
}

describe('Webcomponent prototype functions', () => {
  it('should be callable on React component', () => {
    const Comp = createComponent();
    expect(Comp.prototype.foo()).to.equal('bar');
  });

  it('should return prop', () => {
    const Comp = createComponent();
    expect(Comp.prototype.getProp()).to.equal('prop');
  });

  it('should not invoke getters', () => {
    // If this functionality fails, calling createComponent() should cause the error to be thrown.
    const Comp = createComponent();

    // We expect it to throw here to make sure we've written our test correctly.
    expect(() => Comp.prototype.getter).to.throw();
  });
});
