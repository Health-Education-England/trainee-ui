import React from "react";

interface IProps {
  scrollType?: "auto" | "smooth";
}
export default class ScrollToHere extends React.Component<IProps> {
  elementRef = React.createRef<HTMLDivElement>();

  componentDidMount() {
    if (this.elementRef.current !== null) {
      this.elementRef.current.scrollIntoView({
        behavior: this.props.scrollType || "auto"
      });
    }
  }

  render() {
    return <div ref={this.elementRef}></div>;
  }
}
