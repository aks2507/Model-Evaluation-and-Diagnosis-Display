import React from 'react';
import Plot from 'react-plotly.js';
import {Grid, Paper, Box} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import GeneralTable from '../comparisonComps/GeneralTable';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

function createData(column, dataset) {
    return { column, ...dataset };
}

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
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

const useStyles = makeStyles((theme) => ({
    plot: {
      justifyContent: 'center',
      alignItems: 'center',
      width: '90%',
      height: '80%',
    },
    tableContainer: {
        width: '80%'
    },
    root: {
        flexGrow: 1,
    },
}));

function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function FeatureImpDatasetComparison(props){
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const evalList = props.evalList;
    const classes = useStyles();
    const len = evalList.length;
    const rows = [];
    const headCells = [];
    const z = [];
    const x = [];
    const y = [];
    const trace = [];
    headCells.push({id:'column', label:'Columns'});
    for(let i=0;i<len;i++){
        console.log(evalList[i].data.metadata.feature_scores);
        z.push(evalList[i].data.dataset.name);
        y.push([]);
        x.push([]);
        headCells.push({id:i, label:z[i]});
        for(let j=0;j<evalList[i].data.metadata.feature_scores.length;j++){
            y[i].push(evalList[i].data.metadata.feature_scores[j]);
            x[i].push(evalList[i].data.dataset.metadata.columns[j]);
        }
        trace.push({
            x:x[i],
            y:y[i],
            type:'scatter',
            mode:'lines',
            name:z[i]
        });
    }

    for(let i=0;i<evalList[0].data.metadata.feature_scores.length;i++){
        let temp_feat_scores = [];
        for(let j=0;j<len;j++){
            temp_feat_scores.push(evalList[j].data.metadata.feature_scores[i].toFixed(2));
        }
        rows.push(createData(
            evalList[0].data.dataset.metadata.columns[i],
            temp_feat_scores
        ))
    }

    let data = [...trace];

    return(
        <Grid container spacing={2} className={classes.tableContainer}>
            <div className={classes.root}>
                <AppBar position="static">
                    <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                    <Tab label="Table" {...a11yProps(0)} />
                    <Tab label="Line Chart" {...a11yProps(1)} />
                    </Tabs>
                </AppBar>
                <TabPanel value={value} index={0}>
                    <Grid item xs={12}>
                        <Paper elevation={5}>
                            <Box m={2}>
                                <GeneralTable 
                                    headCells={headCells}
                                    rows={rows}
                                    tabletitle="Feature Importances"
                                />
                            </Box>
                        </Paper>
                    </Grid>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <Grid item xs={12}>
                        <Paper elevation={5}>
                            <Plot
                                className={classes.plot}
                                data={data}
                                layout={{
                                    title:"Feature Importances", barmode: 'stack',
                                    legend: {"orientation":"h"}
                                }}
                                config={{
                                    scrollZoom: true,
                                    responsive: true
                                }}
                            />
                        </Paper>
                    </Grid>
                </TabPanel>
            </div>
        </Grid>
    );
}
