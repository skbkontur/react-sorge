import LocaleProvider from '@skbkontur/react-ui/LocaleProvider';
import Spinner from '@skbkontur/react-ui/Spinner';
import ThemeProvider from '@skbkontur/react-ui/ThemeProvider';
import React, { Suspense } from 'react';
import SorgeNode from '../src/sorge/SorgeNode';
import FunctionComponent from './FunctionComponent';
import ClassComponent from './ClassComponent';
import { Sorge } from '../src/sorge/Sorge';

Sorge.mount.on(fiber => {
  console.log(
    'record Mount',
    fiber.stateNode instanceof HTMLElement ? fiber.stateNode : fiber.stateNode && fiber.stateNode.name,
    fiber,
  );
});

Sorge.update.on(() => {
  // console.log('record Update', ...arguments);
});

Sorge.unmount.on(() => {
  // console.log('record Unmount', ...arguments);
});

const defaultTheme = require('@skbkontur/react-ui/lib/theming/themes/DefaultTheme');
const localeCustom = { Spinner: { loading: 'wait 1' } };
const themeCustom = {
  ...defaultTheme.default,
  spinnerCaptionColor: 'red',
};

export default { title: 'Button' };

export const withText: React.FunctionComponent = () => {
  return (
    <div>
      123
      <ClassComponent ttt="ClassComponent" />
      <FunctionComponent ttt="FunctionComponent 1" />
      <FunctionComponent ttt="FunctionComponent 2" />
      <ThemeProvider value={themeCustom}>
        <LocaleProvider locale={localeCustom}>
          <Spinner />
        </LocaleProvider>
      </ThemeProvider>
      <ThemeProvider value={themeCustom}>
        <Spinner />
      </ThemeProvider>
      {FunctionComponent({ ttt: 'FunctionComponent 3()' })}
    </div>
  );
};

export const withText1: React.FunctionComponent = () => {
  return <div>222</div>;
};

const OtherComponent = React.lazy(() => import('./OtherComponent'));

class SuspenseClass extends React.Component {
  public state = { opened: false };
  render() {
    return (
      <div>
        <div onClick={this.handleClick}>{this.state.opened ? 'hide' : 'show'}</div>
        {this.state.opened && (
          <Suspense fallback={<div>Загрузка...</div>}>
            <OtherComponent />
          </Suspense>
        )}
      </div>
    );
  }
  handleClick = () => {
    this.setState(prevState => ({ opened: !prevState.opened }));
  };
}

export const withSuspense: React.FunctionComponent = () => {
  return <SuspenseClass />;
};

export const withSorgeNode: React.FunctionComponent = () => {
  return (
    <div key="out">
      <SorgeNode
        onMount={fiber => {
          console.log('SorgeNode onMount', fiber);
        }}
        onUpdate={fiber => {
          console.log('SorgeNode onUpdate', fiber);
        }}
        onUnmount={fiber => {
          console.log('SorgeNode onUnmount', fiber);
        }}
      >
        textNode
        <ClassComponent ttt="sorge node" />
      </SorgeNode>
    </div>
  );
};
