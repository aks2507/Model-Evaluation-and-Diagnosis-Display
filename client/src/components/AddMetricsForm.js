import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import {
  TextField,
  Button,
  Dialog,
  DialogActions,
  Grid,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function TransitionsModal(props) {
  const classes = useStyles();
  let [keys, setKeys] = React.useState([]);
  let [values, setValues] = React.useState([]);
  let initialState = {};
  if (props.model_type === 'regression') {
    initialState = {
      mean_absolute_error: props.metadata.mean_absolute_error,
      mean_squared_error: props.metadata.mean_squared_error,
      root_mean_squared_error: props.metadata.root_mean_squared_error,
      root_mean_squared_log_error: props.metadata.root_mean_squared_log_error,
      Coefficient_of_Determination: props.metadata.Coefficient_of_Determination,
      Adjusted_r_squared: props.metadata.Adjusted_r_squared,
      additional_metrics:
        props.metadata.additional_metrics === undefined
          ? {}
          : props.metadata.additional_metrics,
    };
  } else {
    initialState = {
      accuracy_score: props.metadata.accuracy_score,
      precision_score: props.metadata.precision_score,
      recall: props.metadata.recall,
      f1_score: props.metadata.f1_score,
      log_loss: props.metadata.log_loss,
      additional_metrics:
        props.metadata.additional_metrics === undefined
          ? {}
          : props.metadata.additional_metrics,
    };
  }
  const [payload, setPayload] = React.useState(initialState);
  const handleChangeKey = (i) => (e1) => {
    e1.preventDefault();
    let new_keys = [...keys];
    new_keys[i] = e1.target.value;
    setKeys(new_keys);
  };
  const handleChangeValue = (i) => (e2) => {
    e2.preventDefault();
    let new_values = [...values];
    new_values[i] = e2.target.value;
    setValues(new_values);
  };

  const addClick = (e) => {
    e.preventDefault();
    let new_keys = [...keys];
    new_keys.push('');
    setKeys(new_keys);

    let new_values = [...values];
    new_values.push(0);
    setValues(new_values);
  };

  const removeClick = (i) => (e) => {
    e.preventDefault();
    let new_values = [...values];
    new_values.splice(i, 1);
    setValues(new_values);

    let new_keys = [...keys];
    new_keys.splice(i, 1);
    setKeys(new_keys);
  };

  const handleCancel = (e) => {
    setKeys([]);
    setValues([]);
    props.handleClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let addn_metrics_dict = payload.additional_metrics;
    console.log('Payload before adding anything: ', payload);
    for (let i = 0; i < keys.length; i++) {
      addn_metrics_dict[keys[i]] = Number(values[i]);
    }
    console.log('The temp dictionary: ', addn_metrics_dict);
    setPayload({ ...payload, additional_metrics: addn_metrics_dict });
    console.log('Payload after setting the payload: ', payload);
    let request_body;
    if (props.model_type === 'regression') {
      const {
        mean_absolute_error,
        mean_squared_error,
        root_mean_squared_error,
        root_mean_squared_log_error,
        Coefficient_of_Determination,
        Adjusted_r_squared,
        additional_metrics,
      } = payload;
      request_body = {
        mean_absolute_error,
        mean_squared_error,
        root_mean_squared_error,
        root_mean_squared_log_error,
        Coefficient_of_Determination,
        Adjusted_r_squared,
        additional_metrics,
      };
    } else {
      const {
        accuracy_score,
        precision_score,
        recall,
        f1_score,
        log_loss,
        additional_metrics,
      } = payload;
      request_body = {
        accuracy_score,
        precision_score,
        recall,
        f1_score,
        log_loss,
        additional_metrics,
      };
    }
    console.log('request body: ', request_body);

    await axios
      .patch('/modelEvaluations/' + props.eval_id, request_body)
      .then(() => {
        window.location = '/evaluationReport/' + props.eval_id;
      });
  };

  return (
    <div>
      <Dialog
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        className={classes.modal}
        open={props.open}
        onClose={props.handleClose}
        closeAfterTransition
        disableBackdropClick
      >
        <DialogTitle id="scroll-dialog-title">Add Metrics</DialogTitle>
        <DialogContent
          style={{ alignItems: 'center', justifyContent: 'center' }}
        >
          <DialogContentText id="scroll-dialog-description">
            Enter new metrics that you have calculated, as key value pairs.
            Click on the Add Sign to spawn a new empty pair. Click on cancel to
            close. Click on Submit to add the metrices.
          </DialogContentText>
          {keys.map((el, i) => (
            <Grid container spacing={1} key={i}>
              <Grid item xs={4} sm={4}>
                <TextField
                  variant="outlined"
                  required
                  id={i}
                  name={i}
                  autoFocus
                  onChange={handleChangeKey(i)}
                />
              </Grid>
              <Grid item xs={4} sm={4}>
                <TextField
                  variant="outlined"
                  required
                  id={i}
                  name={i}
                  autoFocus
                  onChange={handleChangeValue(i)}
                />
              </Grid>
              <Grid item xs={4} sm={4}>
                <Button
                  variant="contained"
                  color="secondary"
                  size="large"
                  value="remove"
                  onClick={removeClick(i)}
                >
                  <CancelOutlinedIcon fontSize="large" />
                </Button>
              </Grid>
            </Grid>
          ))}
        </DialogContent>
        <DialogActions
          style={{ alignItems: 'center', justifyContent: 'center' }}
        >
          <Grid
            container
            spacing={2}
            style={{
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Grid item xs={2}>
              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={addClick}
              >
                <AddCircleOutlineOutlinedIcon />
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Grid
                container
                spacing={2}
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Grid item xs={4} sm={4}>
                  <Button
                    fullWidth
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="large"
                    onClick={handleSubmit}
                  >
                    Submit
                  </Button>
                </Grid>
                <Grid item xs={4} sm={4}>
                  <Button
                    fullWidth
                    variant="contained"
                    color="secondary"
                    size="large"
                    onClick={handleCancel}
                  >
                    Cancel
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </DialogActions>
      </Dialog>
    </div>
  );
}
