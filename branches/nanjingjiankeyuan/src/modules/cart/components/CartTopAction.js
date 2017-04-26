import React, { Component } from 'react';

class CartTopAction extends Component {

  constructor(props) {
    super(props);
    this.state = {
      status: 0
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.status != this.state.status) {
      this.setState({
        status: nextProps.status
      });
    }
  }

  onClick = () => {
    const nextStatus = this.state.status == 1 ? 0 : 1
    this.setState({
      status: nextStatus
    })
    this.props.onChange(nextStatus);
  }

  render() {
    return <div onClick={this.onClick}>
      {
        this.state.status == 1? '完成':'编辑' 
      }
    </div>
  }
}

export default CartTopAction;
