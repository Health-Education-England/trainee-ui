import React from "react";
import ReactLoading from "react-loading";

class Loading extends React.PureComponent {
  render() {
    return (
      <div>
        <ReactLoading type={"bars"} color={"black"}></ReactLoading>
      </div>
    );
  }
}

export default Loading;
