import React from 'react';
import { BottomNavigationAction, BottomNavigation } from '@material-ui/core';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import NoteAddIcon from '@material-ui/icons/NoteAdd';

const BottomNavbarComponent = (props: any) => {
  const [value, setValue] = React.useState('profile');
  const handleChange = (event: any, newValue: any) => {
    setValue(newValue);
  };

  return (
    <BottomNavigation
      value={value}
      onChange={handleChange}
      className={props.className}
      showLabels
    >
      <BottomNavigationAction
        label="Profile"
        value="profile"
        icon={<AccountBoxIcon />}
      />
      <BottomNavigationAction
        label="Form-R"
        value="formr"
        icon={<NoteAddIcon />}
      />
    </BottomNavigation>
  );
};

export default BottomNavbarComponent;
