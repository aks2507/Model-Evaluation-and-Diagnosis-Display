import React, { useState, useEffect} from 'react';
import axios from 'axios';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import PostAddIcon from '@material-ui/icons/PostAdd';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import useAxios from 'axios-hooks'

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
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
}));

export default function EvalForm(props) {
  let datasets = props.datasets;
  let models = props.models;
  const classes = useStyles();
  console.log(datasets);
  console.log(models)
  const [modelType, setModelType] = React.useState('regression');
  const [openMT, setOpenMT] = React.useState(false);
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


  const handleDropdownChangeModelType = (event) => {
    setModelType(event.target.value);
    setValues({ ...values, ['model_type']: event.target.value });
  };

  const handleDropdownChangeModelID = (event) => {
    setModelID(event.target.value);
    setValues({ ...values, ['model_id']: event.target.value });
  };

  const handleDropdownChangeDatasetID = (event) => {
    setDatasetID(event.target.value);
    setValues({ ...values, ['dataset_id']: event.target.value });
  };

  const handleModelTypeClose = () => {
    setOpenMT(false);
  };

  const handleModelTypeOpen = () => {
    setOpenMT(true);
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

        const { name, model_type, model_id, dataset_id, metadata } = values;
        const payload = { name, model_type, model_id, dataset_id, metadata };

        await axios.post('/evaluate', payload).then(() => {window.location="/";});
    };

    const handleChange = name => e => {
        setValues({ ...values, [name]: e.target.value });
    };

    const handleCancel = async() => {
      window.location="/";
    };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <PostAddIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Add Evaluation
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="name"
            label="Evaluation Name"
            name="name"
            autoComplete="Evaluation Name"
            autoFocus
            onChange={handleChange('name')}
          />

          <div className={classes.formControl}>
            <InputLabel id="model_type">Model Type</InputLabel>
            <Select
              labelId="model_type"
              id="mtype"
              open={openMT}
              onClose={handleModelTypeClose}
              onOpen={handleModelTypeOpen}
              value={modelType}
              onChange={handleDropdownChangeModelType}
            >
              <MenuItem value="regression">Regression</MenuItem>
              <MenuItem value="classification">Classification</MenuItem>
              <MenuItem value="clustering">Clustering</MenuItem>
            </Select>
          </div>
          <div className={classes.formControl}>
            <InputLabel id="dataset_id">Dataset</InputLabel>
            <Select
              labelId="dataset_id"
              id="did"
              open={openDS}
              onClose={handleDatasetClose}
              onOpen={handleDatasetOpen}
              value={datasetID}
              onChange={handleDropdownChangeDatasetID}
            >
              {datasets.map((dataset) =>
                <MenuItem value={dataset.dataset_id}>{dataset.name}</MenuItem>
              )}
            </Select>
          </div>
          <div className={classes.formControl}>
            <InputLabel id="model_id">Model</InputLabel>
            <Select
              labelId="model_id"
              id="mid"
              open={openModel}
              onClose={handleModelClose}
              onOpen={handleModelOpen}
              value={modelID}
              onChange={handleDropdownChangeModelID}
            >
              {models.map((model) =>
                <MenuItem value={model.model_id}>{model.name}</MenuItem>
              )}
            </Select>
          </div>

          <TextField
            variant="filled"
            margin="normal"
            fullWidth
            name="description"
            label="Description"
            id="description"
            autoComplete="Evaluation Description"
          />

          <div className="row">

            <div className="col">
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="secondary"
                size="large"
                className={classes.submit}
              >
                Add
              </Button>
            </div>

            <div className="col">
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
            </div>

          </div>




        </form>
      </div>

    </Container>
  );
};
