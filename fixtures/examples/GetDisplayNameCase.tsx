import React from 'react';
import { SorgeNode } from '../../src';
import { getDisplayName } from '../../src/lib';
import { SorgeType } from '../../src/typings/SorgeTypes';
import { report } from '../report';
import ClassComponent from './ClassComponent';
import Context from './Context';
import FunctionComponent from './FunctionComponent';

export const events: Array<keyof SorgeType> = [];

export default function () {
  return (
    <SorgeNode
      onMount={(fiber) => {
        report('mount', 'GetDisplayName', null, {
          key: fiber.key,
          displayName: getDisplayName(fiber),
        });
      }}
    >
      <table key="table">
        <thead key="thead">
          <tr key="tr">
            <td key="td">
              <ul key="ul">
                <li key="li">
                  <span key="span" />
                </li>
                <li key="li">
                  <ClassComponent key="ClassComponent" />
                </li>
                <li key="li">
                  <FunctionComponent key="FunctionComponent" />
                </li>
                <li key="li">
                  <Context key="Context" />
                </li>
              </ul>
            </td>
          </tr>
        </thead>
      </table>
    </SorgeNode>
  );
}
