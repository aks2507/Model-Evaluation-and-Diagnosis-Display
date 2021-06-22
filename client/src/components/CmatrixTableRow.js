import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

const useStyles = makeStyles({
    table: {
      minWidth: 500,
    },
  });
  


export default function CmatrixTableRow(props) {
    const row=props.row;
    console.log(row);
    const classes = useStyles();

    return (
        <div>
             <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                  
                  {
                      row.map((r,index)=>{
                         if (index==0) {
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
