import React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';


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
    let evalList = props.evaluations;
    // let numTabs = evalList.length;
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  console.log(evalList[0].data);
  console.log(evalList[0].data.dataset.name);

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        
          <div>
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="primary"
              textColor="primary"
              variant="fullWidth"
              aria-label="full width tabs example"
            >
              {evalList.map((evaluation, index) => 
                  <Tab key={index}
                  label={evaluation.data.name} {...a11yProps(index)} />
              )}
            </Tabs>
          </div>
      </AppBar>
        
          <div>
            <SwipeableViews
              axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
              index={value}
              onChangeIndex={handleChangeIndex}
            >
                {evalList.map((evaluation, idx) => 
                    <TabPanel key={idx} value={value} index={idx} dir={theme.direction}>
                    <div className="container-fluid">
                      <div className="row">
                        <div className="col">
                          <p><strong>Name: </strong>{evaluation.data.name}</p>
                        </div>
                        <div className="col">
                          <p><strong>Model Type: </strong>{evaluation.data.model_type}</p>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col">
                          <p><strong>Status: </strong></p>
                        </div>
                        <div className="col">
                          <p><strong>Date Created: </strong>{evaluation.data.date_created}</p>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col">
                          <p><strong>Dataset: </strong>{evaluation.data.dataset.name}</p>
                        </div>
                        <div className="col">
                          <p><strong>Model: </strong>{evaluation.data.model.name}</p>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col">
                          <p><strong>Rows, Columns: </strong>{evaluation.data.dataset.metadata.number_of_rows}, {evaluation.data.dataset.metadata.number_of_columns}</p>
                        </div>
                        <div className="col">
                          <p><strong>Dataset Size: </strong>{evaluation.data.dataset.metadata.memory} bytes</p>
                        </div>
                      </div>
                    </div>
                  </TabPanel>
                )}
            </SwipeableViews>
              
          </div>

    </div>
  );
}
