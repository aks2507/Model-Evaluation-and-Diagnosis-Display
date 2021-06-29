import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import {TextField, Button} from '@material-ui/core';
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
    const [values, setValues] = React.useState({
        mean_absolute_error: props.metadata.mean_absolute_error,
        mean_squared_error: props.metadata.mean_squared_error,
        root_mean_squared_error: props.metadata.root_mean_squared_error,
        root_mean_squared_log_error: props.metadata.root_mean_squared_log_error,
        Coefficient_of_Determination: props.metadata.Coefficient_of_Determination,
        Adjusted_r_squared: props.metadata.Adjusted_r_squared,
        additional_metrics:{}
    });
    const handleChange = name => e => {
        if(e.target.value)
            setValues({ ...values, [name]: e.target.value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const { 
            mean_absolute_error, 
            mean_squared_error, 
            root_mean_squared_error, 
            root_mean_squared_log_error,
            Coefficient_of_Determination,
            Adjusted_r_squared,
            additional_metrics
        } = values;
        const payload = {
            mean_absolute_error, 
            mean_squared_error, 
            root_mean_squared_error, 
            root_mean_squared_log_error,
            Coefficient_of_Determination,
            Adjusted_r_squared,
            additional_metrics
        };

        await axios.patch('/modelEvaluations/'+props.eval_id, payload).then(() => {window.location="/evaluationReport/"+props.eval_id;});
    };
    return (
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={props.open}
                onClose={props.handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={props.open}>
                    <div className={classes.paper}>
                        <h2 id="transition-modal-title">Update Metrics</h2>
                        <p id="transition-modal-description">Enter new values of already existing metrics</p>
                        <form onSubmit={handleSubmit}>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                id="mean_absolute_error"
                                label="MAE"
                                name="mean_absolute_error"
                                autoComplete="MAE"
                                autoFocus
                                onChange={handleChange('mean_absolute_error')}
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                id="mean_squared_error"
                                label="MSE"
                                name="mean_squared_error"
                                autoComplete="MSE"
                                autoFocus
                                onChange={handleChange('mean_squared_error')}
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                id="root_mean_squared_error"
                                label="RMSE"
                                name="root_mean_squared_error"
                                autoComplete="RMSE"
                                autoFocus
                                onChange={handleChange('root_mean_squared_error')}
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                id="root_mean_squared_log_error"
                                label="RMSLE"
                                name="root_mean_squared_log_error"
                                autoComplete="RMSLE"
                                autoFocus
                                onChange={handleChange('root_mean_squared_log_error')}
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                id="Coefficient_of_Determination"
                                label="R^2 score"
                                name="Coefficient_of_Determination"
                                autoComplete="R^2 score"
                                autoFocus
                                onChange={handleChange('Coefficient_of_Determination')}
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                id="Adjusted R squared"
                                label="Adjusted_r_squared"
                                name="Adjusted_r_squared"
                                autoComplete="Adjusted R squared"
                                autoFocus
                                onChange={handleChange('Adjusted_r_squared')}
                            />
                            <Button
                                type="submit"
                                variant="contained"
                                color="secondary"
                                size="large"
                                onClick={handleSubmit}
                            >
                                Update
                            </Button>
                        </form>
                    </div>
                </Fade>
            </Modal>
        </div>
    );
}