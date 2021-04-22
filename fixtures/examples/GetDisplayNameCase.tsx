import React from 'react';
import { SorgeNode } from '../../src';
import { getDisplayName } from '../../src/lib';
import { SorgeType } from '../../src/typings/SorgeTypes';
import { report } from '../report';

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
      <PropertyAccessor.Dot key="PropertyAccessor.Dot" />
      <Anon key="Anon" />
      {(() => 0)()}
      <ClassComponent key="ClassComponent" />
      <FunctionComponent key="FunctionComponent" />
      <Context.Provider key="Context.Provider" value="two">
        <Context.Consumer key="Context.Consumer">{(context) => <dd key={context} />}</Context.Consumer>
      </Context.Provider>
      <table key="table">
        <thead key="thead">
          <tr key="tr">
            <td key="td">
              <ul key="ul">
                <li key="li">
                  <span key="span" />
                </li>
              </ul>
            </td>
          </tr>
        </thead>
      </table>
    </SorgeNode>
  );
}

const PropertyAccessor = {
  Dot: function DotNotation() {
    return null;
  },
};
const Anon = () => null;

class ClassComponent extends React.Component {
  public render = () => <div key="divInClassComponent" />;
}

function FunctionComponent() {
  return <div key="divInFunctionComponent" />;
}

const Context = React.createContext<string>('one');
