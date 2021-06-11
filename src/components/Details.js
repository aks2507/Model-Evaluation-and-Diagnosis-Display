import React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: "100%",
    margin: "auto",
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

export default function Details(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        {props.area === 1 ? (
          <div>
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="primary"
              textColor="primary"
              variant="fullWidth"
              aria-label="full width tabs example"
            >
              <Tab label="Details" {...a11yProps(0)} />
              <Tab label="Tags" {...a11yProps(1)} />
            </Tabs>
          </div>
        ) : (
          <div>
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="primary"
              textColor="primary"
              variant="fullWidth"
              aria-label="full width tabs example"
            >
              <Tab label="Details" {...a11yProps(0)} />
              <Tab label="Tags" {...a11yProps(1)} />
              <Tab label="Area under Curve" {...a11yProps(2)} />
            </Tabs>
          </div>
        )}
      </AppBar>
        {props.area === 1 ? (
          <div>
            <SwipeableViews
              axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
              index={value}
              onChangeIndex={handleChangeIndex}
            >
              <TabPanel value={value} index={0} dir={theme.direction}>
                <div className="container-fluid">
                  <div className="row">
                    <div className="col">
                      <p><strong>Name: </strong>{props.name}</p>
                    </div>
                    <div className="col">
                      <p><strong>Model Type: </strong>{props.model_type}</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col">
                      <p><strong>Status: </strong></p>
                    </div>
                    <div className="col">
                      <p><strong>Date Created: </strong>{props.date_created}</p>
                    </div>
                  </div>
                </div>
              </TabPanel>
              <TabPanel value={value} index={1} dir={theme.direction}>
                <ul>
                  <li>Tag1</li>
                  <li>Tag2</li>
                  <li>Tag3</li>
                  <li>Tag4</li>
                </ul>
              </TabPanel>
            </SwipeableViews>
          </div>
        ) : (
          <div>
            <SwipeableViews
              axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
              index={value}
              onChangeIndex={handleChangeIndex}
            >
              <TabPanel value={value} index={0} dir={theme.direction}>
                <div className="container-fluid">
                  <div className="row">
                    <div className="col">
                      <p><strong>Name: </strong>{props.name}</p>
                    </div>
                    <div className="col">
                      <p><strong>Model Type: </strong>{props.model_type}</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col">
                      <p><strong>Status: </strong></p>
                    </div>
                    <div className="col">
                      <p><strong>Date Created: </strong>{props.date_created}</p>
                    </div>
                  </div>
                </div>
              </TabPanel>
              <TabPanel value={value} index={1} dir={theme.direction}>
                <div className="container-fluid">
                  <div className="row">
                    <List>
                      <ListItemText primary="Tag1" />
                      <ListItemText primary="Tag2"/>
                      <ListItemText primary="Tag3"/>
                      <ListItemText primary="Tag4"/>
                    </List>
                  </div>
                </div>
              </TabPanel>
              <TabPanel value={value} index={2} dir={theme.direction}>
                <div className="container-fluid">
                  <div className="row">
                    <p>{props.area_under_curve}</p>
                  </div>
                </div>
              </TabPanel>
            </SwipeableViews>
          </div>
        )}

    </div>
  );
}
