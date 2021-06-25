import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import CmatrixTableRow from './CmatrixTableRow';

const useStyles = makeStyles({
    table: {
      minWidth: 500,
    },
  });
  
  
 


export default function CMatrixTable(props) {
    const matrix=props.matrix;
    const numClass=matrix.length;
    const rows=[];
    const r=[];
    for(let i=0;i<numClass+1;i++)
    {
        if(i===0) r.push("");
        else r.push(""+i-1);
    }
    rows.push(r);
    for(let i=0;i<numClass;i++)
    {

        const classLabel=""+i;
        rows.push([classLabel,...matrix[i]]);
    }
    console.log(rows);
    const classes = useStyles();

    


    return (
        <>
        <Box ml={45}>
                 <h5>Predicted</h5>
        </Box>
       
        <div class="row">
            <Box mt={8} ml={12}>
            <div class="col">
                <h5>
                Actual
                </h5>
            </div>
            </Box>
           
            <div class="col">
            <Box>
                <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableBody>
                    {rows.map((row,index) => (
                        <TableRow>
                        <CmatrixTableRow row={row}></CmatrixTableRow>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
                </TableContainer>
                </Box>
            </div>

        </div>
      
        </>
      );
}
