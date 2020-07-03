import React from 'react';
import { SorgeType } from '../../src/typings/SorgeTypes';

export const events: Array<keyof SorgeType> = ['mount'];

function FunctionComponent() {
  return (
    <FunctionComponentInner key="FunctionComponentInner">
      <li key="li">111</li>
      <li key="li">222</li>
    </FunctionComponentInner>
  );
}

const FunctionComponentInner: React.FunctionComponent = ({ children }) => {
  return <ul key="ul">{children}</ul>;
};

export default FunctionComponent;
