import React, { useState } from "react";
import { Button } from "nhsuk-react-components";
interface ButtonProps {
  id?: string;
  type?: string;
  label?: string;
  clickHandler?: any;
  disableOnClick?: boolean;
}

const defaultProps: ButtonProps = {
  label: "Button",
  disableOnClick: true
};

const DebounceButton: React.FC<ButtonProps> = props => {
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const buttonHandler = () => {
    disableOnClick && setButtonDisabled(true);
    clickHandler();
  };
  const { label, clickHandler, disableOnClick, ...attrs } = { ...props };
  return (
    <Button disabled={buttonDisabled} onClick={buttonHandler} {...attrs}>
      {label}
    </Button>
  );
};
DebounceButton.defaultProps = defaultProps;
export default DebounceButton;
