import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import CssBaseline from '@material-ui/core/CssBaseline';
import useAxios from 'axios-hooks'

// Components
import Metrics from '../components/Metrics';
import FeatureImp from '../components/FeatureImp';
import ROC_AUC from '../components/ROC_AUC';

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
  leftarea: {
    backgroundColor: theme.palette.background.paper,
    display: 'inline',
    variant: 'fullWidth',
    height: "100%",
    width: "100%",
  },
}));

export default function Evaluation(props) {
  const eval_id = props.match.params.eval_id;
  console.log(eval_id);
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // Fetching the data
  let url = "/evaluate/"+eval_id;
  // console.log(url);

  const [{ data, loading, error }, refetch] = useAxios(url);
  // console.log(data);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error!</p>;

  return (
    <div className={classes.root}>

        {data.model_type === "regression" ? (
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

      {data.model_type === "regression" ? (
        <>
          <CssBaseline />
          <div className={classes.leftarea}>
            <TabPanel value={value} index={0}>
              <Metrics
                model_type={data.model_type}
                name={data.name}
                metadata={data.metadata}
                date_created={data.date_created}
              />
            </TabPanel>
            <TabPanel value={value} index={1}>
              Item Two
            </TabPanel>
            <TabPanel value={value} index={2}>
              <FeatureImp
                model_type={data.model_type}
                date_created={data.date_created}
                name={data.name}
                feature_scores={data.metadata.feature_scores}
                columns={data.metadata.columns}
              />
            </TabPanel>
            <TabPanel value={value} index={3}>
              Item Four
            </TabPanel>
          </div>
        </>
      ) : (
        <>
          <CssBaseline />
          <div className={classes.leftarea}>
            <TabPanel value={value} index={0}>
              <Metrics
                model_type={data.model_type}
                name={data.name}
                metadata={data.metadata}
                date_created={data.date_created}
              />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <ROC_AUC
                model_type={data.model_type}
                name={data.name}
                fpr={data.metadata.fpr}
                tpr={data.metadata.tpr}
                auc={data.metadata.roc_auc}
                date_created={data.date_created}
              />
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
              <FeatureImp
                model_type={data.model_type}
                date_created={data.date_created}
                name={data.name}
                feature_scores={data.metadata.feature_scores}
                columns={data.metadata.columns}
              />
            </TabPanel>
            <TabPanel value={value} index={6}>
              Item Seven
            </TabPanel>
          </div>
        </>
      )}
    </div>
  );
}