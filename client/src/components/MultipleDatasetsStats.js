import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import { Grid, Paper, Box } from '@material-ui/core';
import DetailsComp from '../comparisonComps/Details';
import MultipleDatasetsStatsPlots from './MultipleDatasetsStatsPlots';
import MultipleDatasetsStatsTables from './MultipleDatasetsStatsTables';

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  console.log(props);
  console.log(children);
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={10}>
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
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '77%',
    backgroundColor: 'rgb(219,219,219)',
  },
}));

export default function SimpleTabs(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  console.log(props.evalList);
  return (
    <Grid container spacing={2} className={classes.root}>
      <Grid item xs={12}>
        <Paper elevation={5}>
          <DetailsComp c={0} evaluations={props.evalList} />
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Paper elevation={5}>
          <AppBar position="static">
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="simple tabs example"
            >
              <Tab label="Tables" {...a11yProps(0)} />
              <Tab label="Line Charts" {...a11yProps(1)} />
            </Tabs>
          </AppBar>
          <TabPanel value={value} index={0}>
            <MultipleDatasetsStatsTables evalList={props.evalList} />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <MultipleDatasetsStatsPlots evalList={props.evalList} />
          </TabPanel>
        </Paper>
      </Grid>
    </Grid>
  );
}
