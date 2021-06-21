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
    width: '70%',
    backgroundColor: theme.palette.background.paper,
  },
}));

function createData(column, datasets){
    return { column, ...datasets };
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
    const headCells = [{id:'column', label:"Columns"}];
    for(let i=0;i<len;i++){
        headCells.push({id:i, label: evalList[i].data.dataset.name})
    }
    for(let i=0;i<numCols;i++){
        let means = [];
        let stds = [];
        let mins = [];
        let q25s = [];
        let q50s = [];
        let q75s = [];
        let maxs = [];
        let iqrs = [];
        let mvalss = [];
        for(let j=0;j<len;j++){
            means.push(evalList[j].data.dataset.metadata.description[cols[i]].mean.toFixed(2));
            stds.push(evalList[j].data.dataset.metadata.description[cols[i]].std.toFixed(2));
            mins.push(evalList[j].data.dataset.metadata.description[cols[i]].min.toFixed(2));
            q25s.push(evalList[j].data.dataset.metadata.description[cols[i]]['25%'].toFixed(2));
            q50s.push(evalList[j].data.dataset.metadata.description[cols[i]]['50%'].toFixed(2));
            q75s.push(evalList[j].data.dataset.metadata.description[cols[i]]['75%'].toFixed(2));
            maxs.push(evalList[j].data.dataset.metadata.description[cols[i]].max.toFixed(2));
            iqrs.push(evalList[j].data.dataset.metadata.iqr[i].toFixed(2));
            mvalss.push(evalList[j].data.dataset.metadata.missing_values[i].toFixed(2));
        }
        rows.mean.push(createData(cols[i],means));
        rows.std.push(createData(cols[i],stds));
        rows.min.push(createData(cols[i],mins));
        rows.q25.push(createData(cols[i],q25s));
        rows.q50.push(createData(cols[i],q50s));
        rows.q75.push(createData(cols[i],q75s));
        rows.max.push(createData(cols[i],maxs));
        rows.iqr.push(createData(cols[i],iqrs));
        rows.mvals.push(createData(cols[i],mvalss));
    }
    // console.log(rows);
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className={classes.root}>
            <AppBar position="static" color="default">
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