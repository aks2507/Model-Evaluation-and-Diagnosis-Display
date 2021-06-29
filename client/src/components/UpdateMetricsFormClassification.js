import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import {TextField, Button, Dialog, DialogActions, Grid,
    DialogContent, DialogContentText, DialogTitle} from '@material-ui/core';
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
    console.log(props.metadata);
    const [values, setValues] = React.useState({
        accuracy_score: props.metadata.accuracy_score,
        precision_score: props.metadata.precision_score,
        recall: props.metadata.recall,
        f1_score: props.metadata.f1_score,
        log_loss: props.metadata.log_loss,
        additional_metrics:{}
    });
    const handleChange = name => e => {
        if(e.target.value)
            setValues({ ...values, [name]: e.target.value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const { 
            accuracy_score, 
            precision_score, 
            recall, 
            f1_score,
            log_loss,
            additional_metrics
        } = values;
        const payload = {
            accuracy_score, 
            precision_score, 
            recall, 
            f1_score,
            log_loss,
            additional_metrics
        };

        await axios.patch('/modelEvaluations/'+props.eval_id, payload).then(() => {window.location="/evaluationReport/"+props.eval_id;});
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
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <DialogTitle id="scroll-dialog-title">Update Metrics</DialogTitle>
                <DialogContent style={{alignItems:'center', justifyContent:'center',}}>
                    <DialogContentText id="scroll-dialog-description" >
                        Enter new values of already existing metrics
                    </DialogContentText>
                    <Grid container spacing={2}>
                        <Grid item xs={6} sm={6}>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                id="accuracy_score"
                                label="Accuracy"
                                name="accuracy_score"
                                autoComplete="MAE"
                                autoFocus
                                onChange={handleChange('accuracy_score')}
                            />
                        </Grid>
                        <Grid item xs={6} sm={6}>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                id="precision_score"
                                label="Precision"
                                name="precision_score"
                                autoComplete="MSE"
                                autoFocus
                                onChange={handleChange('precision_score')}
                            />
                        </Grid>
                        <Grid item xs={6} sm={6}>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                id="recall"
                                label="Recall"
                                name="recall"
                                autoComplete="RMSE"
                                autoFocus
                                onChange={handleChange('recall')}
                            />  
                        </Grid>
                        <Grid item xs={6} sm={6}>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                id="f1_score"
                                label="F1 Score"
                                name="f1_score"
                                autoComplete="RMSLE"
                                autoFocus
                                onChange={handleChange('f1_score')}
                            />
                        </Grid>
                        <Grid item xs={6} sm={6}>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                id="log_loss"
                                label="Log Loss"
                                name="log_loss"
                                autoComplete="R^2 score"
                                autoFocus
                                onChange={handleChange('log_loss')}
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions style={{alignItems:'center', justifyContent:'center',}}>
                    <Button
                        type="submit"
                        variant="contained"
                        color="secondary"
                        size="large"
                        onClick={handleSubmit}
                    >
                        Update
                    </Button>
                </DialogActions>    
            </Dialog>
        </div>
    );
}