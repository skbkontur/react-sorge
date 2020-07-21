import React from 'react';
import { findAmongParents } from '../../src/lib';
import { SorgeNode } from '../../src';
import { SorgeType } from '../../src/typings/SorgeTypes';
import { report } from '../report';

export const events: Array<keyof SorgeType> = [];

export default function () {
  return (
    <table key="needle_2">
      <thead key="thead">
        <tr key="needle_1">
          <td key="td">
            <ul key="ul">
              <li key="li">
                <SorgeNode
                  key="sorge"
                  onMount={(fiber) => {
                    const found = findAmongParents(fiber, (fiberParent) => fiberParent.key === 'needle_1');
                    report('mount', 'FindAmongParentsCase', null, {
                      key: fiber.key,
                      needle: found ? found.key : found,
                    });
                  }}
                >
                  <span key="span" />
                </SorgeNode>
              </li>
            </ul>
          </td>
        </tr>
      </thead>
      <tbody key="tbody">
        <tr key="tr">
          <td key="td">
            <ul key="ul">
              <SorgeNode
                key="sorge"
                onMount={(fiber) => {
                  const found = findAmongParents(fiber, (fiberParent) => fiberParent.key === 'needle_2');
                  report('mount', 'FindAmongParentsCase', null, {
                    key: fiber.key,
                    needle: found ? found.key : found,
                  });
                }}
              >
                <li key="li">
                  <span key="span" />
                </li>
              </SorgeNode>
            </ul>
          </td>
        </tr>
      </tbody>
    </table>
  );
}
