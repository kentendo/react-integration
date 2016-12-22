import '../lib/custom-elements.min';
import '../lib/shadydom.min';
//import 'babel?presets[]=es2015!../lib/native-shim';
import 'babel?presets[]=es2015!../node_modules/skatejs-web-components/dist/native-shim';
import './unit/children';
import './unit/events';
import './unit/display-name';
import './unit/errors';
import './unit/lifecycle';
import './unit/prop-types';
import './unit/props';
import './unit/webcomponent-proto-funcs';

beforeEach(() => {
  document.body.appendChild(window.fixture = document.createElement('div'));
});

afterEach(() => {
  document.body.innerHTML = '';
});
