import React, { useState } from 'react';
import axios from 'axios';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import PostAddIcon from '@material-ui/icons/PostAdd';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import { Paper, Grid } from '@material-ui/core';

import Navbar from '../components/Navbar';

const useStyles = makeStyles((theme) => ({
  paper: {
    display: 'block',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
    alignItems: 'center',
    justifyContent: 'center',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  formElements: {
    marginLeft: '8%',
    marginRight: '8%',
  },
}));

export default function EvalForm(props) {
  let datasets = props.datasets;
  let models = props.models;
  console.log(datasets);
  const classes = useStyles();
  const [openDS, setOpenDS] = React.useState(false);
  const [openModel, setOpenModel] = React.useState(false);
  const [modelID, setModelID] = React.useState(0);
  const [datasetID, setDatasetID] = React.useState(0);

  const [values, setValues] = useState({
    name: 'test_eval',
    model_type: 'regression',
    model_id: 0,
    dataset_id: 0,
    metadata: {},
  });

  const handleDropdownChangeModelID = (event) => {
    setModelID(event.target.value);
    setValues({ ...values, model_id: event.target.value });
  };

  const handleDropdownChangeDatasetID = (event) => {
    setDatasetID(event.target.value);
    setValues({ ...values, dataset_id: event.target.value });
  };

  const handleModelClose = () => {
    setOpenModel(false);
  };

  const handleModelOpen = () => {
    setOpenModel(true);
  };

  const handleDatasetClose = () => {
    setOpenDS(false);
  };

  const handleDatasetOpen = () => {
    setOpenDS(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, model_id, dataset_id, metadata } = values;
    const payload = { name, model_id, dataset_id, metadata };

    await axios.post('/modelEvaluations', payload).then(() => {
      window.location = '/';
    });
  };

  const handleChange = (name) => (e) => {
    setValues({ ...values, [name]: e.target.value });
  };

  const handleCancel = async () => {
    window.location = '/';
  };

  return (
    <Grid
      container
      spacing={5}
      style={{ alignItems: 'center', justifyContent: 'center' }}
    >
      <Grid item xs={12}>
        <Navbar />
      </Grid>
      <Grid
        item
        xs={8}
        sm={4}
        style={{ alignItems: 'center', justifyContent: 'center' }}
      >
        <Paper elevation={5}>
          <CssBaseline />
          <Grid container spacing={2} className={classes.paper}>
            <Grid
              item
              align="center"
              xs={12}
              sm={12}
              lg={12}
              style={{ alignItems: 'center', justifyContent: 'center' }}
            >
              <Avatar className={classes.avatar} align="center">
                <PostAddIcon />
              </Avatar>
            </Grid>
            <Grid
              item
              xs={12}
              sm={12}
              lg={12}
              style={{ alignItems: 'center', justifyContent: 'center' }}
            >
              <Typography component="h1" variant="h5" align="center">
                Add Evaluation
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <form className={classes.form} onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  <Grid
                    item
                    xs={12}
                    sm={12}
                    lg={12}
                    align="center"
                    className={classes.formElements}
                  >
                    <TextField
                      variant="outlined"
                      margin="none"
                      required
                      fullWidth
                      id="name"
                      label="Evaluation Name"
                      name="name"
                      autoComplete="Evaluation Name"
                      autoFocus
                      onChange={handleChange('name')}
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={12}
                    lg={12}
                    className={classes.formElements}
                  >
                    <div className={classes.formControl}>
                      <InputLabel id="dataset_id">Dataset</InputLabel>
                      <Select
                        labelId="dataset_id"
                        id="did"
                        open={openDS}
                        fullWidth
                        onClose={handleDatasetClose}
                        onOpen={handleDatasetOpen}
                        value={datasetID}
                        onChange={handleDropdownChangeDatasetID}
                      >
                        {datasets.map((dataset) => (
                          <MenuItem value={dataset.dataset_id}>
                            {dataset.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </div>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={12}
                    lg={12}
                    className={classes.formElements}
                  >
                    <div className={classes.formControl}>
                      <InputLabel id="model_id">Model</InputLabel>
                      <Select
                        labelId="model_id"
                        id="mid"
                        fullWidth
                        open={openModel}
                        onClose={handleModelClose}
                        onOpen={handleModelOpen}
                        value={modelID}
                        onChange={handleDropdownChangeModelID}
                      >
                        {models.map((model) => (
                          <MenuItem value={model.model_id}>
                            {model.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </div>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={12}
                    lg={12}
                    align="center"
                    className={classes.formElements}
                  >
                    <TextField
                      variant="filled"
                      margin="normal"
                      fullWidth
                      name="description"
                      label="Description"
                      id="description"
                      autoComplete="Evaluation Description"
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={12}
                    lg={12}
                    align="center"
                    className={classes.formElements}
                  >
                    <Grid className="row">
                      <Grid className="col">
                        <Button
                          type="submit"
                          fullWidth
                          variant="contained"
                          color="secondary"
                          size="large"
                          className={classes.submit}
                          onClick={handleSubmit}
                        >
                          Add
                        </Button>
                      </Grid>

                      <Grid className="col">
                        <Button
                          fullWidth
                          variant="contained"
                          color="primary"
                          size="large"
                          className={classes.submit}
                          onClick={handleCancel}
                        >
                          Cancel
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </form>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
}
