import React from 'react';
import ReactDOM from 'react-dom';
import { SorgeType } from '../../src/typings/SorgeTypes';

export const events: Array<keyof SorgeType> = ['mountRoot', 'unmountRoot'];

export const renderCallback = (root: HTMLElement): void => {
  ReactDOM.unmountComponentAtNode(root);
};

export default () => <div />;
