import React from 'react';
import {withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Plot from 'react-plotly.js';
import {Grid} from '@material-ui/core';



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
        minWidth: 300,
        margin: "auto",
    },
    plot: {
        width:'100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

function createData(name,area){
    return {name,area};
}

export default function PrecisionRecallCurve(props) {
    let evalList = props.evaluations;
    let numTabs = evalList.length;
    let c=props.c;
    let precision = [];
    let recall = [];
    let auc = [];

    const n_classes=evalList[0].data.metadata.n_classes;
    if(n_classes===2)
    {
        for (let i = 0; i < numTabs; i++) {
            var precision_temp = evalList[i].data.metadata.precision_curve;
            var recall_temp = evalList[i].data.metadata.recall_curve;
            precision.push(precision_temp);
            recall.push(recall_temp);
            auc.push(evalList[i].data.metadata.precision_recall_auc);
        }
        
    }   
    else
    {
        for (let i = 0; i < numTabs; i++) {
            precision_temp = evalList[i].data.metadata.precision_curve["micro"];
            recall_temp = evalList[i].data.metadata.recall_curve["micro"];
            precision.push(precision_temp);
            recall.push(recall_temp);
            auc.push(evalList[i].data.metadata.precision_recall_auc["micro"]);
        }
       
    }
  


    const title=n_classes===2?('Precision Recall Curve' ):('Micro average Precision Recall Curve');
    let trace = [];

    for (let i = 0; i < numTabs; i++) {
        if(c===0)
        trace.push({ x: precision[i], y: recall[i], type: 'scatter', name: evalList[i].data.dataset.name });
        else
        trace.push({ x: precision[i], y: recall[i], type: 'scatter', name: evalList[i].data.name });
    }
    let data = [...trace]

    var curve_info = [];
    var info = [];
    var auc_ = [];
    for (var i = 0; i < numTabs; i++) {
        if(c===0)
        info.push(evalList[i].data.dataset.name)
        else
        info.push(evalList[i].data.name);
        auc_.push(auc[i].toFixed(2));
    }

    curve_info.push(info);
    curve_info.push(auc_);
    const classes = useStyles();
    var rows=[];
    for(i=0;i<numTabs;i++)
    {
        if(c===0)
        rows.push(createData(evalList[i].data.dataset.name,auc[i].toFixed(2)));
        else
        rows.push(createData(evalList[i].data.name,auc[i].toFixed(2)));
    }
    


    return (
        <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
                <Paper elevation={5}>
                    <Plot 
                        className={classes.plot}
                        data={data}
                        layout={{title:title }}
                        config={{
                            scrollZoom: true,
                            responsive: true
                        }}
                    />
                </Paper>
            </Grid>
            <Grid item xs={12} sm={6}>
                <Paper elevation={5}>
                    <TableContainer>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Model</StyledTableCell>
                                <StyledTableCell align="right">AUC</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {rows.map((row) => (
                            <TableRow key={row.name}>
                                <StyledTableCell component="th" scope="row">
                                    {row.name}
                                </StyledTableCell>
                                <StyledTableCell align="right">{row.area}</StyledTableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                    </TableContainer>
                </Paper>
            </Grid>
        </Grid>
    );
}
