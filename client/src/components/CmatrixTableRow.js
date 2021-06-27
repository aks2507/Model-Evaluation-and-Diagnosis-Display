import React from 'react';
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';



export default function CmatrixTableRow(props) {
    const row=props.row;
    console.log(row);
  

    return (
        <div>
             <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                  
                  {
                      row.map((r,index)=>{
                         if (index===0) {
                             return (
                                <TableCell align="left">
                                  <strong>{r}</strong>
                             </TableCell>
                             )
                            
                         }
                         else{
                             return(
                                <TableCell align="left">
                                  {r}
                                </TableCell>
                             )
                         }       
                      }
                    )
                  }
              </TableRow>
            </TableHead>
          </Table>
        </TableContainer>
        </div>
    )
}
