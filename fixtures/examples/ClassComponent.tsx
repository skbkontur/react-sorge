import React from 'react';
import { SorgeType } from '../../src/typings/SorgeTypes';

export const events: Array<keyof SorgeType> = ['mount', 'update', 'unmount'];

interface State {
  score: number;
}

export default class ClassComponent extends React.Component<{}, State> {
  state = { score: 0 };

  componentDidMount() {
    this.updateState();
  }

  render() {
    return <div key={this.state.score} />;
  }

  updateState = () => {
    this.setState(({ score }) => ({ score: score + 1 }));
  };
}
