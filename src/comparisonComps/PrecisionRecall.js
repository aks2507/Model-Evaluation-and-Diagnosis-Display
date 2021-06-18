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
import Box from '@material-ui/core/Box';
// import Details from './Details';


const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);
  
//   const StyledTableRow = withStyles((theme) => ({
//     root: {
//       '&:nth-of-type(odd)': {
//         backgroundColor: theme.palette.action.hover,
//       },
//     },
//   }))(TableRow);



  const useStyles = makeStyles({
    table: {
        minWidth: 300,
        margin: "auto",
    },
    plot: {
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
    console.log(evalList[0].data.metadata);
    for (let i = 0; i < numTabs; i++) {
        var precision_temp = evalList[i].data.metadata.precision_curve;
        var recall_temp = evalList[i].data.metadata.recall_curve;
        precision.push(precision_temp);
        recall.push(recall_temp);
        auc.push(evalList[i].data.metadata.precision_recall_auc);
    }
    console.log(auc);



    let trace = [];

    for (let i = 0; i < numTabs; i++) {
        if(c===0)
        trace.push({ x: precision[i], y: recall[i], type: 'scatter', name: evalList[i].data.dataset.name });
        else
        trace.push({ x: precision[i], y: recall[i], type: 'scatter', name: evalList[i].data.name });
    }
    let data = [...trace]
    console.log(trace[0]);
    console.log(trace[1]);
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
    console.log(auc_);
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
        <div className="col">

             <div className="row">
            </div> 
            <div className="row">
                <Plot
                    data={data}
                    layout={{ width: 600, height: 450, title: 'Precision Recall Curve' }}
                    config={{
                        scrollZoom: true,
                        responsive: true
                    }}
                />
                <div>
                    <Box  m={2} pt={15}>
                    <TableContainer  component={Paper}>
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
                    </Box>
                   



                </div>
            </div>


        </div>
    );
}
