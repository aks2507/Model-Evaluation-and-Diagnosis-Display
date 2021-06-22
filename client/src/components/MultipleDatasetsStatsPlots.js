import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Plots from '../comparisonComps/Plots';

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

export default function MultipleDatasetsStatsPlots(props) {
    const evalList = props.evalList;
    const len = evalList.length;
    const numCols = evalList[0].data.dataset.metadata.columns.length;
    const cols = evalList[0].data.dataset.metadata.columns;

    const traces = {
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
        traces.mean.push({x:cols, y:means, type:'scatter', name:evalList[i].data.dataset.name})
        traces.std.push({x:cols, y:stds, type:'scatter', name:evalList[i].data.dataset.name})
        traces.max.push({x:cols, y:maxs, type:'scatter', name:evalList[i].data.dataset.name})
        traces.min.push({x:cols, y:mins, type:'scatter', name:evalList[i].data.dataset.name})
        traces.q25.push({x:cols, y:q25s, type:'scatter', name:evalList[i].data.dataset.name})
        traces.q50.push({x:cols, y:q50s, type:'scatter', name:evalList[i].data.dataset.name})
        traces.q75.push({x:cols, y:q75s, type:'scatter', name:evalList[i].data.dataset.name})
        traces.iqr.push({x:cols, y:iqrs, type:'scatter', name:evalList[i].data.dataset.name})
        traces.mvals.push({x:cols, y:mvalss, type:'scatter', name:evalList[i].data.dataset.name})
    }
    console.log(traces);
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
              <Box ml={15}>
                <Plots data={traces.mean} width={600} height={500} title="Mean" />
                </Box>
            </TabPanel>
            <TabPanel value={value} index={1}>
            <Box ml={15}>
                <Plots data={traces.std} width={600} height={500} title="Standard Deviation" />
                </Box>
            </TabPanel>
            <TabPanel value={value} index={2}>
            <Box ml={15}>
            
                <Plots data={traces.min} width={600} height={500} title="Minimum" />
                </Box>
            </TabPanel>
            <TabPanel value={value} index={3}>
            
            <Box ml={15}>
                <Plots data={traces.max} width={600} height={500} title="Maximum" /> </Box>
            </TabPanel>
            <TabPanel value={value} index={4}>
            <Box ml={15}>
                <Plots data={traces.q25} width={600} height={500} title="First Quartile" /> </Box>
            </TabPanel>
            <TabPanel value={value} index={5}>
            <Box ml={15}>
                <Plots data={traces.q50} width={600} height={500} title="Second Quartile" /> </Box>
            </TabPanel>
            <TabPanel value={value} index={6}>
            <Box ml={15}>
                <Plots data={traces.q75} width={600} height={500} title="Third Quartile" /> </Box>
            </TabPanel>
            <TabPanel value={value} index={7}>
            <Box ml={15}>
                <Plots data={traces.iqr} width={600} height={500} title="IQR" /> </Box>
            </TabPanel>
            <TabPanel value={value} index={8}>
            <Box ml={15}>
                <Plots data={traces.mvals} width={600} height={500} title="Missing Values" />
                </Box>
            </TabPanel>
        </div>
    );
}