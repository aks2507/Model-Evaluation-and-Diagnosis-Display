// import React from 'react';
// import PropTypes from 'prop-types';
// import { makeStyles } from '@material-ui/core/styles';
// import AppBar from '@material-ui/core/AppBar';
// import Tabs from '@material-ui/core/Tabs';
// import Tab from '@material-ui/core/Tab';
// import Typography from '@material-ui/core/Typography';
// import {Box, Menu, MenuItem, Button} from '@material-ui/core';

// function MenuPanel(props) {
//   const { children, value, index, ...other } = props;

//   return (
//     <div
//       hidden={value !== index}
//       {...other}
//     >
//       {value === index && (
//         <Box p={3}>
//           <Typography>{children}</Typography>
//         </Box>
//       )}
//     </div>
//   );
// }

// MenuPanel.propTypes = {
//   children: PropTypes.node,
//   index: PropTypes.any.isRequired,
//   value: PropTypes.any.isRequired,
// };

// const useStyles = makeStyles((theme) => ({
//   root: {
//     flexGrow: 1,
//     backgroundColor: theme.palette.background.paper,
//   },
// }));

// export default function SimpleTabs() {
//     const [anchorEl, setAnchorEl] = React.useState(null);

//     const handleClick = (event) => {
//       setAnchorEl(event.currentTarget);
//     };
  
//     const handleClose = (event, newValue) => {
//       setAnchorEl(null);
//       handleChange(newValue);
//     };
//   const classes = useStyles();
//   const [value, setValue] = React.useState(0);

//   const handleChange = (newValue) => {
//     setValue(newValue);
//   };

//   return (
//     <div className={classes.root}>
//       <AppBar position="static">
//       <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
//         Open Menu
//       </Button>
//         <Menu 
//             anchorEl={anchorEl}
//             keepMounted
//             open={Boolean(anchorEl)}
//             onClose={handleClose}
//         >
//           <MenuItem onClick={handleClose(0)}>Item 1</MenuItem>
//           <MenuItem onClick={handleClose(1)}>Item 2</MenuItem>
//           <MenuItem onClick={handleClose(2)}>Item 3</MenuItem>
//         </Menu>
//       </AppBar>
//       <MenuPanel value={value} index={0}>
//         Item One
//       </MenuPanel>
//       <MenuPanel value={value} index={1}>
//         Item Two
//       </MenuPanel>
//       <MenuPanel value={value} index={2}>
//         Item Three
//       </MenuPanel>
//     </div>
//   );
// }

import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import {MenuItem, Box, Typography} from '@material-ui/core';
function MenuPanel(props) {
  const { children, value, index } = props;

  return (
    <div
      hidden={value !== index}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

export default function SimpleMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [value, setValue] = React.useState(-1);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (value) => {
    setAnchorEl(null);
    setValue(value);
  };

  return (
    <div>
      <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
        Open Menu
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose(0)}>Profile</MenuItem>
        <MenuItem onClick={handleClose(1)}>My account</MenuItem>
      </Menu>
      <div>
          <MenuPanel value={value} index={0} >
              Item 1
          </MenuPanel>
          <MenuPanel value={value} index={1}>
              Item 2
          </MenuPanel>
      </div>
    </div>
  );
}