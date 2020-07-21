import React from 'react';
import { getWorkTagMap } from '../../src/lib';
import { SorgeType } from '../../src/typings/SorgeTypes';
import { report } from '../report';

export const events: Array<keyof SorgeType> = [];

export default function () {
  window.historySorgeEvents['GetWorkTagMapCase_1'] = [getWorkTagMap('16.6.0')];
  window.historySorgeEvents['GetWorkTagMapCase_2'] = [getWorkTagMap('16.4.3')];
  window.historySorgeEvents['GetWorkTagMapCase_3'] = [getWorkTagMap('16.4.0')];
  window.historySorgeEvents['GetWorkTagMapCase_4'] = [getWorkTagMap()];
  return null;
}
