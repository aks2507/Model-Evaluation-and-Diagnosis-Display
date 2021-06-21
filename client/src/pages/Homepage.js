import React, { useState, useEffect} from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles } from '@material-ui/core/styles';
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
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Navbar from '../components/Navbar'; 
import { styled } from '@material-ui/core/styles';

function createData(eval_id, name, model_type, model_name, dataset_name, date_created) {
  return { eval_id, name, model_type, model_name, dataset_name, date_created };
}
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

const VisualizeHandler = (eval_id) => async(e) => {
  window.location.replace("/evaluationReport/"+eval_id);
};

function countUnique(iterable) {
  return new Set(iterable).size;
}

const headCells = [
  { id: 'eval_id', numeric: true, disablePadding: false, label: 'Evaluation ID' },
  { id: 'name', numeric: false, disablePadding: false, label: 'Evaluation Name' },
  { id: 'model_type', numeric: false, disablePadding: false, label: 'Model Type' },
  { id: 'model_name', numeric: false, disablePadding: false, label: 'Model' },
  { id: 'dataset_name', numeric: false, disablePadding: false, label: 'Dataset' },
  { id: 'date_created', numeric: false, disablePadding: false, label: 'Date Created' },
];

function EnhancedTableHead(props){
  const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return(
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ 'aria-label': 'select all evaluations' }}
          />
        </TableCell>
          {headCells.map((headCell) => (
            <TableCell
              key={headCell.id}
              align='center'
              padding={headCell.disablePadding ? 'none' : 'default'}
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

};

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: '1 1 100%',
  },
  rowC: {
    flex: '1 6 100%',
    flexDirection: 'row'
  },
}));

const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles();
  const { numSelected, selectedList, modelTypeList, datasetIDList, modelIDList} = props;
  const onDeleteIconHandler = async(e) => {
    e.preventDefault();
    let i;
    for(i=0;i<selectedList.length;i++)
    {
      await axios.delete("/modelEvaluations/"+selectedList[i]).then(() => {window.location.replace("/");});
    }
  };

  const MyButton = styled(Button)({
    background: 'linear-gradient(20deg,  #00008B 30%, #00008B 90%)',
    border: 0,
    borderRadius: 5,
    boxShadow: '0 5px 5px 2px rgba(0, 0, 0, .3)',
    color: 'white',
    height: 40,
    padding: '0 20px',
  });

  const CompareHandler = eval_ids => async(e) => {
    console.log(eval_ids);
    console.log(countUnique(datasetIDList));
    if(countUnique(datasetIDList)===1) 
    window.location.replace("/comparison/"+eval_ids.toString());
    else
    window.location.replace("/comparisonDatasets/"+eval_ids.toString());
  };

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      {numSelected > 0 ? (
        <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
          {numSelected} selected
        </Typography>
      ) : (
        <>
         <Box ml={60}>
         <Typography  className={classes.title} variant="h4" id="tableTitle" component="div">
            <MyButton>Click on Evaluation Name to Visualize</MyButton>
          </Typography>
         </Box>
        
        </>
      )}

      {numSelected > 0 ? (
        <div className={classes.rowC}>
            
            {numSelected < 2 
            || (countUnique(modelTypeList) > 1 && countUnique(datasetIDList) !== 1 ) 
            || (countUnique(datasetIDList) > 1 && countUnique(modelIDList) !== 1 ) ? (
              <Button
                variant="contained"
                color="secondary"
                disabled
              >
                Compare
              </Button>
            ) : (
              <Button
                variant="contained"
                color="secondary"
                onClick={CompareHandler(selectedList)}
              >
                Compare
              </Button>
            )}

            <Tooltip title="Delete">
              <IconButton aria-label="delete" onClick={onDeleteIconHandler}>
                <DeleteIcon />
              </IconButton>
            </Tooltip>


        </div>
      ) : (
        <>
        </>
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    paddingBottom: '3%',
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

export default function Homepage(){
  const handleAdd = async() => {
    window.location="/addeval";
  };
  const [data, setData] = useState({evaluation_entities:[]})
  const [search, setSearch] = useState(true);
  let rows = [];
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        '/modelEvaluations'
      );
      setData(result.data);
      setSearch(false);
    };
    if(search)
      fetchData();
  },[data,search]);
  let i;
  for(i=0;i<data.evaluation_entities.length;i++)
  {
    let k=data.evaluation_entities[i];
    rows.push(createData(k.eval_id,k.name,k.model_type,k.model.name,k.dataset.name,k.date_created));
  }
  
 
  
  const classes = useStyles();
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('eval_id');
  const [selected, setSelected] = useState([]);
  const [selectedModelType, setSelectedModelType] = useState([]);
  const [selectedDatasetID, setSelectedDatasetID] = useState([]);
  const [selectedModelID, setSelectedModelID] = useState([]);
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.eval_id);
      const newSelectedsModelTypes = rows.map((n) => n.model_type);
      const newSelectedsDatasetIDs = rows.map((n, index) => data.evaluation_entities[index].dataset.dataset_id);
      const newSelectedsModelIDs = rows.map((n, index) => data.evaluation_entities[index].model.model_id);
      setSelected(newSelecteds);
      setSelectedModelType(newSelectedsModelTypes);
      setSelectedDatasetID(newSelectedsDatasetIDs);
      setSelectedModelID(newSelectedsModelIDs);
      return;
    }
    setSelected([]);
    setSelectedModelType([]);
    setSelectedDatasetID([]);
    setSelectedModelID([]);
  };

  const handleClick = (event, eval_id, model_type, index) => {
    // console.log(selected);
    // console.log(selectedDatasetID);
    // console.log(index);
    const selectedIndex = selected.indexOf(eval_id);
    let newSelected = [];
    let newSelectedModelType = [];
    let newSelectedsDatasetID =[];
    let newSelectedsModelID =[];
    let entity=data.evaluation_entities.find((p)=>{
      return p.eval_id===eval_id;
    });
    // console.log(selectedIndex);
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, eval_id);
      // console.log(newSelected);
      newSelectedModelType = newSelectedModelType.concat(selectedModelType, model_type);
      // console.log(newSelectedModelType);
      // console.log(index);
      // console.log(data.evaluation_entities[index]);
      newSelectedsDatasetID = newSelectedsDatasetID.concat(selectedDatasetID, entity.dataset.dataset_id)
      newSelectedsModelID = newSelectedsModelID.concat(selectedModelID, entity.model.model_id)
      // console.log(selectedDatasetID);
      // console.log(newSelectedsDatasetID);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
      newSelectedModelType = newSelectedModelType.concat(selectedModelType.slice(1));
      newSelectedsDatasetID = newSelectedsDatasetID.concat(selectedDatasetID.slice(1));
      newSelectedsModelID = newSelectedsModelID.concat(selectedModelID.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
      newSelectedModelType = newSelectedModelType.concat(selectedModelType.slice(0, -1));
      newSelectedsDatasetID = newSelectedsDatasetID.concat(selectedDatasetID.slice(0, -1));
      newSelectedsModelID = newSelectedsModelID.concat(selectedModelID.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
      newSelectedModelType = newSelectedModelType.concat(
        selectedModelType.slice(0, selectedIndex),
        selectedModelType.slice(selectedIndex + 1),
      );
      newSelectedsDatasetID = newSelectedsDatasetID.concat(
        selectedDatasetID.slice(0, selectedIndex),
        selectedDatasetID.slice(selectedIndex + 1),
      );
      newSelectedsModelID = newSelectedsModelID.concat(
        selectedModelID.slice(0, selectedIndex),
        selectedModelID.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
    setSelectedModelType(newSelectedModelType);
    setSelectedDatasetID(newSelectedsDatasetID);
    setSelectedModelID(newSelectedsModelID);
    // console.log(selectedDatasetID);
    // console.log(newSelectedsDatasetID);
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
  

  const isSelected = (eval_id) => selected.indexOf(eval_id) !== -1;

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

// console.log("model_types: ",selectedModelType);
// console.log("datasetIDs: ",selectedDatasetID);
// console.log("evalIDs: ",selected);
// console.log("modelIDs: ",selectedModelID);
// console.log(data);
  return (
    <div className={classes.root}>
      <Navbar/>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar 
          numSelected={selected.length} 
          selectedList={selected} 
          modelTypeList={selectedModelType}
          datasetIDList={selectedDatasetID}
          modelIDList={selectedModelID} />
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.eval_id);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.eval_id, row.model_type, index)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.eval_id}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                          inputProps={{ 'aria-labelledby': labelId }}
                        />
                      </TableCell>
                      <TableCell component="th" id={labelId} scope="row" align="center">{row.eval_id}</TableCell>
                      <TableCell align="center">
                        <Button 
                          color="inherit" 
                          style={{textTransform: 'none'}} 
                          onClick={VisualizeHandler(row.eval_id)}
                        >
                          {row.name}
                        </Button>
                      </TableCell>
                      <TableCell align="center">{row.model_type}</TableCell>
                      <TableCell align="center">{row.model_name}</TableCell>
                      <TableCell align="center">{row.dataset_name}</TableCell>
                      <TableCell align="center">{row.date_created}</TableCell>
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
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
      <div className="text-center">

        <Button variant="contained" color="primary" size="large" onClick={handleAdd}>
          Add Evaluation
        </Button>
      </div>
    </div>
  );
}
