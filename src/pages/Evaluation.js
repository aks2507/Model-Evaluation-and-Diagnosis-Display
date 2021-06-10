import React, { useState, useEffect} from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
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
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    height: "100%",
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
    width: 280,
    height: "100%",
  },
}));

export default function Evaluation(props) {
  const eval_id = props.match.params.eval_id;
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [payload, setPayload] = useState({})
  const [search, setSearch] = useState(true);
  useEffect(() => {
    if(search){
      axios.get('/evaluate/'+eval_id)
          .then(response => setPayload(response.data));
        setSearch(false);
    }
  });

  console.log(payload);

  return (
    <div className={classes.root}>

        {payload.model_type === "regression" ? (
          <div className={classes.root}>
            <Tabs
              orientation="vertical"
              variant="scrollable"
              value={value}
              onChange={handleChange}
              aria-label="Vertical tabs example"
              className={classes.tabs}
            >
              <Tab label="Metrics" {...a11yProps(0)} />
              <Tab label="Model Information" {...a11yProps(1)} />
              <Tab label="Feature Importance" {...a11yProps(2)} />
              <Tab label="Class Imbalence" {...a11yProps(3)} />
            </Tabs>
          </div>
        ) : (
          <div className={classes.root}>
            <Tabs
              orientation="vertical"
              variant="scrollable"
              value={value}
              onChange={handleChange}
              aria-label="Vertical tabs example"
              className={classes.tabs}
            >
              <Tab label="Metrics" {...a11yProps(0)} />
              <Tab label="ROC-AUC Curve" {...a11yProps(1)} />
              <Tab label="Precision-Recall Curve" {...a11yProps(2)} />
              <Tab label="Confusion Matrix" {...a11yProps(3)} />
              <Tab label="Model Information" {...a11yProps(4)} />
              <Tab label="Feature Importance" {...a11yProps(5)} />
              <Tab label="Class Imbalence" {...a11yProps(6)} />
            </Tabs>
          </div>
        )}

      {payload.model_type === "regression" ? (
        <div className={classes.root}>
          <TabPanel value={value} index={0}>
            Item One
          </TabPanel>
          <TabPanel value={value} index={1}>
            Item Two
          </TabPanel>
          <TabPanel value={value} index={2}>
            Item Three
          </TabPanel>
          <TabPanel value={value} index={3}>
            Item Four
          </TabPanel>
        </div>
      ) : (
        <div className={classes.root}>
          <TabPanel value={value} index={0}>
            Item One
          </TabPanel>
          <TabPanel value={value} index={1}>
            Item Two
          </TabPanel>
          <TabPanel value={value} index={2}>
            Item Three
          </TabPanel>
          <TabPanel value={value} index={3}>
            Item Four
          </TabPanel>
          <TabPanel value={value} index={4}>
            Item Five
          </TabPanel>
          <TabPanel value={value} index={5}>
            Item Six
          </TabPanel>
          <TabPanel value={value} index={6}>
            Item Seven
          </TabPanel>
        </div>
      )}
    </div>
  );
}
