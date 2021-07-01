import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

// Components
import GeneralTable from '../comparisonComps/GeneralTable';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  
}));

function createData(Dataset, columns){
    return { Dataset, ...columns };
}

export default function ScrollableTabsButtonAuto(props) {
    const evalList = props.evalList;
    const len = evalList.length;
    const numCols = evalList[0].data.dataset.metadata.columns.length;
    const cols = evalList[0].data.dataset.metadata.columns;
    const rows = {
        mean:[],
        std:[],
        min:[],
        max:[],
        q25:[],
        q50:[],
        q75:[],
        iqr:[],
        mvals:[]
    }
    const headCells = [{id:'Dataset', label:"Dataset"}];
    for(let i=0;i<numCols;i++){
      if(cols[i] === evalList[0].data.dataset.metadata.label)
        continue;
      headCells.push({id:i, label: cols[i]})
    }
    for(let i=0;i<len;i++){
        let means = [];
        let stds = [];
        let mins = [];
        let q25s = [];
        let q50s = [];
        let q75s = [];
        let maxs = [];
        let iqrs = [];
        let mvalss = [];
        for(let j=0;j<numCols;j++){
          if(cols[j] === evalList[i].data.dataset.metadata.label)
            continue;
          means.push(evalList[i].data.dataset.metadata.description[cols[j]].mean.toFixed(2));
          stds.push(evalList[i].data.dataset.metadata.description[cols[j]].std.toFixed(2));
          mins.push(evalList[i].data.dataset.metadata.description[cols[j]].min.toFixed(2));
          q25s.push(evalList[i].data.dataset.metadata.description[cols[j]]['25%'].toFixed(2));
          q50s.push(evalList[i].data.dataset.metadata.description[cols[j]]['50%'].toFixed(2));
          q75s.push(evalList[i].data.dataset.metadata.description[cols[j]]['75%'].toFixed(2));
          maxs.push(evalList[i].data.dataset.metadata.description[cols[j]].max.toFixed(2));
          iqrs.push(evalList[i].data.dataset.metadata.iqr[j].toFixed(2));
          mvalss.push(evalList[i].data.dataset.metadata.missing_values[j].toFixed(2));
        }
        rows.mean.push(createData(evalList[i].data.dataset.name,means));
        rows.std.push(createData(evalList[i].data.dataset.name,stds));
        rows.min.push(createData(evalList[i].data.dataset.name,mins));
        rows.q25.push(createData(evalList[i].data.dataset.name,q25s));
        rows.q50.push(createData(evalList[i].data.dataset.name,q50s));
        rows.q75.push(createData(evalList[i].data.dataset.name,q75s));
        rows.max.push(createData(evalList[i].data.dataset.name,maxs));
        rows.iqr.push(createData(evalList[i].data.dataset.name,iqrs));
        rows.mvals.push(createData(evalList[i].data.dataset.name,mvalss));
    }
    console.log(rows);
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className={classes.root}>
          <Box mr={12}>
            <AppBar  position="static" color="default">
                <Tabs
                value={value}
                onChange={handleChange}
                indicatorColor="primary"
                textColor="primary"
                variant="scrollable"
                scrollButtons="auto"
                aria-label="scrollable auto tabs example"
                >
                    <Tab label="Mean" {...a11yProps(0)} />
                    <Tab label="Standard Deviation" {...a11yProps(1)} />
                    <Tab label="Minimum" {...a11yProps(2)} />
                    <Tab label="Maximum" {...a11yProps(3)} />
                    <Tab label="First Quartile" {...a11yProps(4)} />
                    <Tab label="Second Quartile" {...a11yProps(5)} />
                    <Tab label="Third Quartile" {...a11yProps(6)} />
                    <Tab label="IQR" {...a11yProps(7)} />
                    <Tab label="Missing Values" {...a11yProps(8)} />
                </Tabs>
            </AppBar>
            </Box>
            <TabPanel value={value} index={0}>
                <GeneralTable rows={rows.mean} headCells={headCells} tabletitle="Mean" />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <GeneralTable rows={rows.std} headCells={headCells} tabletitle="Standard Deviation" />
            </TabPanel>
            <TabPanel value={value} index={2}>
                <GeneralTable rows={rows.min} headCells={headCells} tabletitle="Minimum" />
            </TabPanel>
            <TabPanel value={value} index={3}>
                <GeneralTable rows={rows.max} headCells={headCells} tabletitle="Maximum" />
            </TabPanel>
            <TabPanel value={value} index={4}>
                <GeneralTable rows={rows.q25} headCells={headCells} tabletitle="First Quartile" />
            </TabPanel>
            <TabPanel value={value} index={5}>
                <GeneralTable rows={rows.q50} headCells={headCells} tabletitle="Second Quartile" />
            </TabPanel>
            <TabPanel value={value} index={6}>
                <GeneralTable rows={rows.q75} headCells={headCells} tabletitle="Third Quartile" />
            </TabPanel>
            <TabPanel value={value} index={7}>
                <GeneralTable rows={rows.iqr} headCells={headCells} tabletitle="IQR" />
            </TabPanel>
            <TabPanel value={value} index={8}>
                <GeneralTable rows={rows.mvals} headCells={headCells} tabletitle="Missing Values" />
            </TabPanel>
        </div>
    );
}