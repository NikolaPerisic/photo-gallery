import React from "react";

class ErrorBoundary extends React.Component {
  state = {
    hasError: false,
    error: null,
    errorInfo: null
  };
  //
  componentDidCatch(error, errorInfo) {
    this.setState({
      hasError: true,
      error: error,
      errorInfo: errorInfo
    });
  }
  render() {
    if (this.state.error) {
      return (
        <div>
          <h1>Ooops, something went wrong :(</h1>
          <p>Error: {this.state.error.toString()}</p>
          <p>Location: {this.state.errorInfo.componentStack}</p>
        </div>
      );
    } else {
      return this.props.children;
    }
  }
}

export default ErrorBoundary;
