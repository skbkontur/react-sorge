import React from 'react';
import { findAssociatedNode } from '../../src/lib';
import { SorgeNode } from '../../src';
import { SorgeType } from '../../src/typings/SorgeTypes';
import { report } from '../report';

export const events: Array<keyof SorgeType> = [];

const refs = {
  div: null,
  span: null,
  input: null,
  table: null,
  tr: null,
  td: null,
  svg: null,
};

const ref = (out) => (el) => (refs[out] = el);

export default function () {
  return (
    <SorgeNode
      onMount={(fiber) =>
        report('mount', 'FindAssociatedNodeCase', null, {
          tag: fiber.key,
          found: findAssociatedNode(fiber) === refs[fiber.key],
        })
      }
    >
      <div key="div" ref={ref('div')} />
      <span key="span" ref={ref('span')} />
      <input key="input" ref={ref('input')} />
      <table key="table" ref={ref('table')}>
        <tr key="tr" ref={ref('tr')}>
          <td key="td" ref={ref('td')}>
            <svg key="svg" ref={ref('svg')} viewBox="0 0 0 0" fill="none" xmlns="http://www.w3.org/2000/svg" />
          </td>
        </tr>
      </table>
    </SorgeNode>
  );
}
