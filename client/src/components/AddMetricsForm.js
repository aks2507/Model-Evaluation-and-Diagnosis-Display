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
    let [keys, setKeys] = React.useState([]);
    let [values, setValues] = React.useState([]);
    const [payload, setPayload] = React.useState({
        mean_absolute_error: props.metadata.mean_absolute_error,
        mean_squared_error: props.metadata.mean_squared_error,
        root_mean_squared_error: props.metadata.root_mean_squared_error,
        root_mean_squared_log_error: props.metadata.root_mean_squared_log_error,
        Coefficient_of_Determination: props.metadata.Coefficient_of_Determination,
        Adjusted_r_squared: props.metadata.Adjusted_r_squared,
        additional_metrics:props.metadata.additional_metrics
    });
    const handleChangeKey = i => e1 => {
        e1.preventDefault();
        let new_keys = [...keys];
        new_keys[i] = e1.target.value;
        setKeys(new_keys);
    }
    const handleChangeValue = i => e2 => {
        e2.preventDefault();
        let new_values = [...values];
        new_values[i] = e2.target.value;
        setValues(new_values);
    }
     
    const addClick = (e) => {
        e.preventDefault();
        let new_keys = [...keys];
        new_keys.push('');
        setKeys(new_keys);
        
        let new_values = [...values];
        new_values.push(0)
        setValues(new_values);
    }
     
    const removeClick = i => e => {
        e.preventDefault();
        let new_values = [...values];
        new_values.splice(i,1);
        setValues(new_values);

        let new_keys = [...keys];
        new_keys.splice(i,1);
        setKeys(new_keys);
    }
    
    const handleCancel = (e) => {
        setKeys([]);
        setValues([]);
        props.handleClose();
    };

    const handleSubmit = async e => {
        e.preventDefault();
        let addn_metrics_dict = payload.additional_metrics;
        console.log("Payload before adding anything: ",payload);
        // for(let [key, value] in Object.entries(payload.additional_metrics)){
        //     addn_metrics_dict[key] = value;
        // }
        for(let i=0;i<keys.length;i++){
            addn_metrics_dict[keys[i]] = Number(values[i]);
        }
        console.log("The temp dictionary: ",addn_metrics_dict);
        setPayload({...payload, additional_metrics: addn_metrics_dict});
        console.log("Payload after setting the payload: ",payload);
        const { 
            mean_absolute_error, 
            mean_squared_error, 
            root_mean_squared_error, 
            root_mean_squared_log_error,
            Coefficient_of_Determination,
            Adjusted_r_squared,
            additional_metrics
        } = payload;
        const request_body = {
            mean_absolute_error, 
            mean_squared_error, 
            root_mean_squared_error, 
            root_mean_squared_log_error,
            Coefficient_of_Determination,
            Adjusted_r_squared,
            additional_metrics
        };

        console.log("request body: ",request_body);

        await axios.patch('/modelEvaluations/'+props.eval_id, request_body).then(() => {window.location="/evaluationReport/"+props.eval_id;});
    }

    // console.log(keys,values)
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
                disableBackdropClick
            >
                <Fade in={props.open}>
                    <div className={classes.paper}>
                        <h2 id="transition-modal-title">Update Metrics</h2>
                        <p id="transition-modal-description">Enter new values of already existing metrics</p>
                        <form 
                            // onSubmit={handleSubmit}
                        >
                            {keys.map((el,i) => 
                                <div key={i}>
                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        id={i}
                                        name={i}
                                        autoFocus
                                        onChange={handleChangeKey(i)}
                                    />
                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        id={i}
                                        name={i}
                                        autoFocus
                                        onChange={handleChangeValue(i)}
                                    />
                                    <Button 
                                        variant="contained"
                                        color="secondary"
                                        size="large"
                                        value="remove"
                                        onClick={removeClick(i)}
                                    >
                                        Remove
                                    </Button>
                                </div>
                            )}
                            <Button
                                variant="contained"
                                color="secondary"
                                size="large"
                                onClick={addClick}
                            >
                                Add More
                            </Button>
                            <Button
                                type="submit"
                                variant="contained"
                                color="secondary"
                                size="large"
                                onClick={handleSubmit}
                            >
                                Submit
                            </Button>
                            <Button
                                variant="contained"
                                color="secondary"
                                size="large"
                                onClick={handleCancel}
                            >
                                Cancel
                            </Button>
                        </form>
                    </div>
                </Fade>
            </Modal>
        </div>
    );
}