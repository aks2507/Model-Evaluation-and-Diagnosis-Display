import React from 'react';
import {withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';

import Plots from '../comparisonComps/Plots';


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
      justifyContent: 'center',
      alignItems: 'center',
  },
});

function createData(name,area){
  return {name,area};
}



export default function CurvesMultiClass(props){
    let fpr = props.fpr;
    let tpr = props.tpr;
    let auc=props.auc;
    let n_classes=props.n_classes;
    console.log(auc);
    const c=props.c;
    let title="";
    if(c===0){
      title="ROC Curves";
    }
    else 
    {
      title="Precision-Recall Curve"
    }
  let trace = [];
  for(let i=0;i<n_classes;i++)
  {
    const labels="ROC Curve for class "+i;
    trace.push({x:fpr[i],y:tpr[i],type:'scatter',name:labels});
  }
  const classes = useStyles();
  let data = [...trace]
  let rows=[];
  for(let i=0;i<n_classes;i++)
  {
      
      rows.push(createData("ROC Curve for class "+i,auc[i].toFixed(2)));
  }
  
  return(
    <div className="row">
        
        <div className="col">
                <Plots   
                  data={data}
                  title={title}
                />
        </div>
                 <div className="col">
                    <Box  m={2} pt={13}>
                    <TableContainer  component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                        <TableRow>
                            <StyledTableCell>Class </StyledTableCell>
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
  );
}
