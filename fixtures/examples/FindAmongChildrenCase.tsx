import React from 'react';
import { findAmongChildren } from '../../src/lib';
import { SorgeNode } from '../../src';
import { SorgeType } from '../../src/typings/SorgeTypes';
import { report } from '../report';

export const events: Array<keyof SorgeType> = [];

const onMount = (needleName: string) => (fiber) => {
  const found = findAmongChildren(fiber, (fiberChild) => fiberChild.key === needleName);
  report('mount', 'FindAmongChildrenCase', null, {
    key: fiber.key,
    needle: found ? found.key : found,
  });
};

export default function () {
  return (
    <SorgeNode
      key="sorge"
      onMount={(fiber) => {
        const found = findAmongChildren(fiber, (fiberChild) => fiberChild.key === 'needle_2');
        report('mount', 'FindAmongChildrenCase_2', null, {
          key: fiber.key,
          needle: found ? found.key : found,
        });
      }}
    >
      <table key="table">
        <SorgeNode
          key="sorge"
          onMount={(fiber) => {
            const found = findAmongChildren(fiber, (fiberChild) => fiberChild.key === 'needle_1');
            report('mount', 'FindAmongChildrenCase_1', null, {
              key: fiber.key,
              needle: found ? found.key : found,
            });
          }}
        >
          <thead key="thead">
            <tr key="tr">
              <td key="td">
                <ul key="ul">
                  <li key="li">
                    <span key="needle_1" />
                  </li>
                </ul>
              </td>
            </tr>
          </thead>
        </SorgeNode>
        <tbody key="tbody">
          <tr key="tr">
            <td key="td">
              <ul key="needle_2">
                <li key="li">
                  <span key="span" />
                </li>
              </ul>
            </td>
          </tr>
        </tbody>
      </table>
    </SorgeNode>
  );
}
