import React from 'react';
import { SorgeNode } from '../../src';
import { SorgeType } from '../../src/typings/SorgeTypes';
import ClassComponent from '../examples/ClassComponent';
import { report } from '../report';

export const events: Array<keyof SorgeType> = [];

const SorgeNodeCase: React.FunctionComponent = () => {
  return (
    <div key="sorge-out">
      <SorgeNode
        onMount={report.bind(null, 'mount', 'SorgeNodeCase_1')}
        onUpdate={report.bind(null, 'update', 'SorgeNodeCase_1')}
        onUnmount={report.bind(null, 'unmount', 'SorgeNodeCase_1')}
      >
        <span key="sorge-in-1">sorge-in-1</span>
      </SorgeNode>
      <SorgeNode
        onMount={report.bind(null, 'mount', 'SorgeNodeCase_2')}
        onUpdate={report.bind(null, 'update', 'SorgeNodeCase_2')}
        onUnmount={report.bind(null, 'unmount', 'SorgeNodeCase_2')}
      >
        <ClassComponent key="sorge-in-2" />
      </SorgeNode>
    </div>
  );
};

export default SorgeNodeCase;
