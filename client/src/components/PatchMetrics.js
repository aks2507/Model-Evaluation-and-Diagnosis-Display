import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {Button} from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Details from './Details';
import TableHead from '@material-ui/core/TableHead';

import UpdateMetricsForm from './UpdateMetricsForm';
import AddMetricsForm from './AddMetricsForm';
import UpdateMetricsFormClassification from './UpdateMetricsFormClassification';


const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);



const useStyles = makeStyles({
  table: {
      minWidth: 400,
      margin: "auto",
  },
  plot: {
      justifyContent: 'center',
      alignItems: 'center',
      width: '90%',
      height: '80%',
  },
  root: {
    backgroundColor: 'rgb(219, 219, 219)',
  },
  gridContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});


function createData(metric, value) {
  return { metric, value };
}
function pushAll(metric, value, rows, x, y) {
  rows.push(createData(metric,value));
  y.push(value);
  x.push(metric);
}

export default function Metrics(props){
    const rows = [];
    const x =[];
    const y= [];
    const x_two=[];
    const y_two=[];
    if(props.model_type==="regression") {
        pushAll("MAE",props.metadata.mean_absolute_error.toFixed(2), rows, x, y);
        pushAll("MSE",props.metadata.mean_squared_error.toFixed(2), rows, x, y);
        pushAll("RMSE",props.metadata.root_mean_squared_error.toFixed(2), rows, x, y);
        pushAll("RMSLE",props.metadata.root_mean_squared_log_error.toFixed(2), rows, x_two, y_two);
        pushAll("R^2",props.metadata.Coefficient_of_Determination.toFixed(2), rows, x_two, y_two);
        pushAll("Adjusted R^2",props.metadata.Adjusted_r_squared.toFixed(2), rows, x_two, y_two);

    }
    else {
        pushAll("Accuracy",props.metadata.accuracy_score.toFixed(2), rows, x, y);
        pushAll("Precision Score",props.metadata.precision_score.toFixed(2), rows, x, y);
        pushAll("Recall",props.metadata.recall.toFixed(2), rows, x, y);
        pushAll("F1-Score",props.metadata.f1_score.toFixed(2), rows, x, y);
        pushAll("Log-Loss",props.metadata.log_loss.toFixed(2), rows, x, y);
    }

    const [open, setOpen] = React.useState(false);
    const [addOpen, setAddOpen] = React.useState(false);
    const classes = useStyles();
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleAddOpen = () => {
        setAddOpen(true);
    };
    const handleAddClose = () => {
        setAddOpen(false);
    };
    return(
        <Grid container xs={12} className={classes.root}>
            <Grid item xs={12}>
                <Box mb={2} >
                    <Paper elevation={5}>
                        <Details
                            area={1}
                            name={props.name}
                            model_type={props.model_type}
                            date_created={props.date_created}
                            datasetinfo={props.datasetinfo}
                            modelinfo={props.modelinfo}
                        />
                    </Paper> 
                </Box>
            </Grid>
            <Grid container spacing={2}>
            
                <Grid item xs={12} sm={6}>
                    <Paper elevation={5}>
                        <TableContainer  component={Paper}>
                            <Table className={classes.table} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell>Metrics</StyledTableCell>
                                        <StyledTableCell align="right">Score</StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                {rows.map((row) => (
                                    <TableRow key={row.name}>
                                        <StyledTableCell component="th" scope="row">
                                            {row.metric}
                                        </StyledTableCell>
                                    <StyledTableCell align="right">{row.value}</StyledTableCell>
                                    </TableRow>
                                ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
                    
                </Grid>
                <Grid container xs={12} sm={6}>
                    <Grid item xs={6} sm={3}>
                        <Button 
                            color="primary" 
                            variant="contained"
                            onClick={handleAddOpen}
                        >
                            Add Metrics
                        </Button>
                        <AddMetricsForm 
                            open={addOpen}
                            handleClose={handleAddClose}
                            eval_id={props.eval_id}
                            metadata={props.metadata}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Button 
                            color="primary" 
                            variant="contained"
                            onClick={handleOpen}
                        >
                            Update Metrics
                        </Button>
                        {
                            props.model_type=='regression'?(
                                <UpdateMetricsForm 
                                open={open}
                                handleClose={handleClose}
                                eval_id={props.eval_id}
                                metadata={props.metadata}
                            />
                            ):(
                            <UpdateMetricsFormClassification 
                                open={open}
                                handleClose={handleClose}
                                eval_id={props.eval_id}
                                metadata={props.metadata}
                           />
                            )
                        }
                        
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}
