import React, { useContext, useState, useEffect } from 'react';
import { SorgeType } from '../../src/typings/SorgeTypes';

export const events: Array<keyof SorgeType> = ['mount', 'update'];

const Context = React.createContext<string>('useContext');

export default () => {
  const context = useContext(Context);
  const [use, setUse] = useState('useState');
  useEffect(() => setUse('useEffect'));

  return [<span key={use} />, <span key={context} />];
};
