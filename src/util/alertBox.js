import React, {Component} from 'react';

export default class AlertBox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      status: this.props.status || 0,
      className: this.props.className,
      text: this.props.text
    }
  }

  set(className, text) {
    if (!this.props.className) {
      this.setState({className});
    }
    if (!this.props.text) {
      this.setState({text});
    }
  }

  setClassAndText() {
  }

  render () {
    return (
      <div className={this.state.className}>
        {this.state.text}
      </div>
    );
  }
}