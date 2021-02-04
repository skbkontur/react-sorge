import { getWorkTagMap } from '../../src/lib';
import { SorgeType } from '../../src/typings/SorgeTypes';

export const events: Array<keyof SorgeType> = [];

export default function () {
  window.historySorgeEvents['GetWorkTagMapCase_17.0.2'] = [getWorkTagMap('17.0.2')];
  window.historySorgeEvents['GetWorkTagMapCase_17.0.0-alpha'] = [getWorkTagMap('17.0.0-alpha')];
  window.historySorgeEvents['GetWorkTagMapCase_16.6.0-beta.0'] = [getWorkTagMap('16.6.0-beta.0')];
  window.historySorgeEvents['GetWorkTagMapCase_16.4.3-alpha'] = [getWorkTagMap('16.4.3-alpha')];
  window.historySorgeEvents['GetWorkTagMapCase_16.3.0'] = [getWorkTagMap('16.3.0')];
  return null;
}
