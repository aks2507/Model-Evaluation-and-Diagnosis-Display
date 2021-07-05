import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import CssBaseline from '@material-ui/core/CssBaseline';
import useAxios from 'axios-hooks';
import { Grid, Paper } from '@material-ui/core';
import Metrics from '../components/Metrics';
import FeatureImp from '../components/FeatureImp';
import ROCPrecRecall from '../components/ROC_Prec_Recall';
import CMatrix from '../components/CMatrix';
import ModelInfo from '../components/ModelInfo';
import ClassImb from '../components/ClassImb';
import Navbar from '../components/Navbar';
import DatasetInfo from '../components/DatasetInfo';
import CurvesMultiClass from '../components/CurvesMultiClass';
import RegressionPlots from '../components/RegressioPlots';
import Details from '../components/Details';
import PatchMetrics from '../components/PatchMetrics';

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
    display: 'flex',
    height: '100%',
    backgroundColor: 'rgb(219, 219, 219)',
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
    width: 280,
    height: '100%',
    backgroundColor: 'rgb(219, 219, 219)',
  },
  leftarea: {
    backgroundColor: 'rgb(219, 219, 219)',
    display: 'inline',
    variant: 'fullWidth',
    height: '100%',
    width: '100%',
  },
  nav: {
    width: '100%',
  },
}));

export default function Evaluation(props) {
  const eval_id = props.match.params.eval_id;

  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  let url = '/modelEvaluations/' + eval_id;
  const [{ data, loading, error }] = useAxios(url);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error!</p>;

  const n_classes = data.metadata.n_classes;
  let residuals = [];
  if (data.model_type === 'regression')
    residuals = data.metadata.observed.map(
      (item, index) => item - data.metadata.predicted[index]
    );

  return (
    <Grid container xs={12}>
      <Grid item xs={12} className={classes.nav}>
        <Navbar />
      </Grid>
      <Grid item xs={12}>
        <div className={classes.root}>
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
              <Tab label="Curves and Charts" {...a11yProps(1)} />
              <Tab label="Model Information" {...a11yProps(2)} />
              <Tab label="Dataset Information" {...a11yProps(3)} />
              <Tab label="Add Custom Metrics" {...a11yProps(4)} />
            </Tabs>
          </div>

          {data.model_type === 'regression' ? (
            <>
              <CssBaseline />
              <div className={classes.leftarea}>
                <TabPanel value={value} index={0}>
                  <Metrics
                    model_type={data.model_type}
                    name={data.name}
                    metadata={data.metadata}
                    date_created={data.date_created}
                    datasetinfo={data.dataset}
                    modelinfo={data.model}
                  />
                </TabPanel>
                <TabPanel value={value} index={1}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Paper elevation={5}>
                        <Details
                          area={1}
                          name={data.name}
                          model_type={data.model_type}
                          date_created={data.date_created}
                          datasetinfo={data.dataset}
                          modelinfo={data.model}
                        />
                      </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Paper elevation={5}>
                        <RegressionPlots
                          x={data.metadata.observed}
                          y={data.metadata.predicted}
                          title="Observed vs Predicted"
                        />
                      </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Paper elevation={5}>
                        <RegressionPlots
                          x={data.metadata.observed}
                          y={residuals}
                          title="Observed vs Residuals"
                        />
                      </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Paper elevation={5}>
                        <RegressionPlots
                          x={data.metadata.predicted}
                          y={residuals}
                          title="Predicted vs Residuals"
                        />
                      </Paper>
                    </Grid>
                  </Grid>
                </TabPanel>
                <TabPanel value={value} index={2}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Paper elevation={5}>
                        <Details
                          area={1}
                          name={data.name}
                          model_type={data.model_type}
                          date_created={data.date_created}
                          datasetinfo={data.dataset}
                          modelinfo={data.model}
                        />
                      </Paper>
                    </Grid>
                    <Grid item xs={12}>
                      <Paper elevation={5}>
                        <ModelInfo
                          keys={data.model.metadata.keys}
                          values={data.model.metadata.values}
                          modelName={data.model.name}
                          hyperparameters={data.model.metadata.hyperparameters}
                          standalone={1}
                        />
                      </Paper>
                    </Grid>
                  </Grid>
                </TabPanel>
                <TabPanel value={value} index={3}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <DatasetInfo
                        compare={0}
                        model_type={data.model_type}
                        name={data.name}
                        datasetinfo={data.dataset}
                        date_created={data.date_created}
                        modelinfo={data.model}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <FeatureImp
                        model_type={data.model_type}
                        date_created={data.date_created}
                        name={data.name}
                        feature_scores={data.metadata.feature_scores}
                        columns={data.metadata.columns}
                        datasetinfo={data.dataset}
                        modelinfo={data.model}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Paper elevation={5}>
                        <ClassImb
                          model_type={data.model_type}
                          name={data.name}
                          metadata={data.metadata}
                          date_created={data.date_created}
                          output_label={data.dataset.metadata.output_label}
                          datasetinfo={data.dataset}
                          modelinfo={data.model}
                        />
                      </Paper>
                    </Grid>
                  </Grid>
                </TabPanel>
                <TabPanel value={value} index={4}>
                  <Grid container spacing={2}>
                    <PatchMetrics
                      model_type={data.model_type}
                      name={data.name}
                      metadata={data.metadata}
                      date_created={data.date_created}
                      datasetinfo={data.dataset}
                      modelinfo={data.model}
                      eval_id={data.eval_id}
                    />
                  </Grid>
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
                    datasetinfo={data.dataset}
                    modelinfo={data.model}
                  />
                </TabPanel>
                <TabPanel value={value} index={1}>
                  {n_classes === 2 ? (
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <CMatrix
                          model_type={data.model_type}
                          date_created={data.date_created}
                          name={data.name}
                          cmatrix={data.metadata.confusion_matrix}
                          datasetinfo={data.dataset}
                          modelinfo={data.model}
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                        <Paper elevation={5}>
                          <ROCPrecRecall
                            curve={0}
                            model_type={data.model_type}
                            name={data.name}
                            x={data.metadata.fpr}
                            y={data.metadata.tpr}
                            auc={data.metadata.roc_auc}
                            date_created={data.date_created}
                            datasetinfo={data.dataset}
                            modelinfo={data.model}
                          />
                        </Paper>
                      </Grid>
                      <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                        <Paper elevation={5}>
                          <ROCPrecRecall
                            curve={1}
                            model_type={data.model_type}
                            name={data.name}
                            x={data.metadata.recall_curve}
                            y={data.metadata.precision_curve}
                            auc={data.metadata.precision_recall_auc}
                            date_created={data.date_created}
                            datasetinfo={data.dataset}
                            modelinfo={data.model}
                          />
                        </Paper>
                      </Grid>
                    </Grid>
                  ) : (
                    <Grid container spacing={2} sm={12} md={12} lg={12} xl={12}>
                      <Grid item xs={12}>
                        <CMatrix
                          model_type={data.model_type}
                          date_created={data.date_created}
                          name={data.name}
                          cmatrix={data.metadata.confusion_matrix}
                          datasetinfo={data.dataset}
                          modelinfo={data.model}
                        />
                      </Grid>
                      <Grid xs={12} sm={12} md={12} lg={6} xl={6}>
                        <Paper elevation={5}>
                          <CurvesMultiClass
                            fpr={data.metadata.fpr}
                            tpr={data.metadata.tpr}
                            auc={data.metadata.roc_auc}
                            n_classes={data.metadata.n_classes}
                            c={0}
                          />
                        </Paper>
                      </Grid>
                      <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                        <Paper elevation={5}>
                          <CurvesMultiClass
                            fpr={data.metadata.precision_curve}
                            tpr={data.metadata.recall_curve}
                            auc={data.metadata.precision_recall_auc}
                            n_classes={data.metadata.n_classes}
                            c={1}
                          />
                        </Paper>
                      </Grid>
                    </Grid>
                  )}
                </TabPanel>
                <TabPanel value={value} index={2}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Paper elevation={5}>
                        <Details
                          area={1}
                          name={data.name}
                          model_type={data.model_type}
                          date_created={data.date_created}
                          datasetinfo={data.dataset}
                          modelinfo={data.model}
                        />
                      </Paper>
                    </Grid>
                    <Grid item xs={12}>
                      <Paper elevation={5}>
                        <ModelInfo
                          keys={data.model.metadata.keys}
                          values={data.model.metadata.values}
                          modelName={data.model.name}
                          hyperparameters={data.model.metadata.hyperparameters}
                          standalone={1}
                        />
                      </Paper>
                    </Grid>
                  </Grid>
                </TabPanel>
                <TabPanel value={value} index={3}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <DatasetInfo
                        compare={0}
                        model_type={data.model_type}
                        name={data.name}
                        datasetinfo={data.dataset}
                        date_created={data.date_created}
                        modelinfo={data.model}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <FeatureImp
                        model_type={data.model_type}
                        date_created={data.date_created}
                        name={data.name}
                        feature_scores={data.metadata.feature_scores}
                        columns={data.metadata.columns}
                        datasetinfo={data.dataset}
                        modelinfo={data.model}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Paper elevation={5}>
                        <ClassImb
                          model_type={data.model_type}
                          name={data.name}
                          metadata={data.metadata}
                          date_created={data.date_created}
                          output_label={data.dataset.metadata.output_label}
                          datasetinfo={data.dataset}
                          modelinfo={data.model}
                        />
                      </Paper>
                    </Grid>
                  </Grid>
                </TabPanel>
                <TabPanel value={value} index={4}>
                  <Grid container spacing={2}>
                    <PatchMetrics
                      model_type={data.model_type}
                      name={data.name}
                      metadata={data.metadata}
                      date_created={data.date_created}
                      datasetinfo={data.dataset}
                      modelinfo={data.model}
                      eval_id={data.eval_id}
                    />
                  </Grid>
                </TabPanel>
              </div>
            </>
          )}
        </div>
      </Grid>
    </Grid>
  );
}
