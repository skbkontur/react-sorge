import React from 'react';

interface Props {
  ttt: string;
}

interface State {
  opened: boolean;
}

class ClassComponent extends React.Component<Props, State> {
  public state = { opened: false };
  render() {
    return <div onClick={this.handleClick}>{this.state.opened ? (<div>
      opened
      <ClassComponent ttt="inner" />
    </div>) : 'closed'}</div>;
  }
  handleClick = () => {
    this.setState(prevState => ({ opened: !prevState.opened }));
  };
}

export default ClassComponent;
