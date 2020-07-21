import React from 'react';
import { Sorge } from '../../src/Sorge';

export const events: Array<keyof typeof Sorge> = ['mount', 'update'];

const Context = React.createContext<string>('empty');

const ContextConsumer = () => {
  return <Context.Consumer key="Context.Consumer">{context => <span key={context} />}</Context.Consumer>;
};

class ContextType extends React.Component {
  public static contextType = Context;
  public render() {
    return <span key={this.context} />;
  }
}

export default () => {
  return (
    <Context.Provider value="context" key="Context.Provider">
      <ContextConsumer key="ContextConsumer" />
      <ContextType key="ContextType" />
    </Context.Provider>
  );
};
