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
import {Paper, Box} from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

function EnhancedTableHead(props) {
  const { classes, order, orderBy, onRequestSort, headCells } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align="center"
            padding='default'
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              <strong>{headCell.label}</strong>
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  title: {
    flex: '1 1 100%',
  },
}));

const EnhancedTableToolbar = () => {
  const classes = useToolbarStyles();

  return (
    <Toolbar className={classes.root}>
        <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
            <strong>Metrics Comparison</strong>
        </Typography>
    </Toolbar>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
}));

export default function CompareTable(props) {
    const rows = props.rows;
    const model_type = props.model_type;

    const headCells = model_type === "regression" ? (
        [
            { id: 'name', numeric: false, disablePadding: false, label: 'Evaluation' },
            { id: 'mae', numeric: true, disablePadding: false, label: 'MAE' },
            { id: 'mse', numeric: true, disablePadding: false, label: 'MSE' },
            { id: 'rmse', numeric: true, disablePadding: false, label: 'RMSE' },
            { id: 'rmsle', numeric: true, disablePadding: false, label: 'RMSLE' },
            { id: 'r2', numeric: true, disablePadding: false, label: 'R-Squared' },
            { id: 'ar2', numeric: true, disablePadding: false, label: 'Adjusted R^2' },
        ]
    ) : (
        [
            { id: 'name', numeric: false, disablePadding: false, label: 'Evaluation' },
            { id: 'acc', numeric: true, disablePadding: false, label: 'Accuracy' },
            { id: 'prec', numeric: true, disablePadding: false, label: 'Precision' },
            { id: 'recall', numeric: true, disablePadding: false, label: 'Recall' },
            { id: 'f1', numeric: true, disablePadding: false, label: 'F1-Score' },
            { id: 'logloss', numeric: true, disablePadding: false, label: 'Log-Loss' },
        ]
    );

  const classes = useStyles();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <div className={classes.root}>
      <Paper elevation={5} className={classes.paper}>
        <Box m={2}>
          <EnhancedTableToolbar />
          <TableContainer>
            <Table
              className={classes.table}
              aria-labelledby="tableTitle"
              size={dense ? 'small' : 'medium'}
              aria-label="enhanced table"
            >
              <EnhancedTableHead
                classes={classes}
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
                headCells={headCells}
              />
              <TableBody>
                {stableSort(rows, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                      <TableRow
                        hover
                        tabIndex={-1}
                        key={row.evalName}
                      >
                        
                        <TableCell align="center" id={labelId} scope="row">
                          {row.evalName}
                        </TableCell>
                        {model_type === "regression" ? (
                              <>
                                  <TableCell align="center">{row.mae}</TableCell>
                                  <TableCell align="center">{row.mse}</TableCell>
                                  <TableCell align="center">{row.rmse}</TableCell>
                                  <TableCell align="center">{row.rmsle}</TableCell>
                                  <TableCell align="center">{row.r2}</TableCell>
                                  <TableCell align="center">{row.ar2}</TableCell>
                              </>
                        ) : (
                          <>
                              <TableCell align="center">{row.acc}</TableCell>
                              <TableCell align="center">{row.prec}</TableCell>
                              <TableCell align="center">{row.recall}</TableCell>
                              <TableCell align="center">{row.f1}</TableCell>
                              <TableCell align="center">{row.logloss}</TableCell>
                          </>
                        )}
                        
                      </TableRow>
                    );
                  })}
                {emptyRows > 0 && (
                  <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
          <FormControlLabel
            control={<Switch checked={dense} onChange={handleChangeDense} />}
            label="Dense padding"
          />
        </Box>
      </Paper>

      
    </div>
  );
}