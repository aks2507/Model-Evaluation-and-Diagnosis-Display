import React from 'react';
import Plot from 'react-plotly.js';
import {Grid, Paper, Box} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import GeneralTable from './GeneralTable';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

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
        width: '90%',
        height: '90%',
        justifyContent:'center',
        alignItems: 'center',
    },
    tableContainer: {
        width: '90%'
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

function createData(evals, features){
    return { evals, ...features };
}

export default function FeatureImportance(props){
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const classes = useStyles();
    let evalList = props.evaluations;
    let numTabs = evalList.length;
    let features=[];
    let columns=evalList[0].data.metadata.columns;
    for(let i=0;i<numTabs;i++)
    {
        let fscores = [];
        for(let j=0;j<columns.length;j++)
        {
            fscores.push(evalList[i].data.metadata.feature_scores[j].toFixed(4));
        }
        features.push(fscores);
    }
    let traces=[];
    let linetraces=[];
    for(let i=0;i<numTabs;i++)
    {
        traces.push({x:columns,y:features[i],name:evalList[i].data.name,type:'bar'});
        linetraces.push({x:columns,y:features[i],name:evalList[i].data.name,type:'scatter'});
    }
    let data=[...traces];
    let linedata=[...linetraces];
    const headCells = [];
    headCells.push({id:'evals',label:'Evaluation'});
    for(let i=0;i<columns.length;i++){
        headCells.push({id:i.toString(),label:columns[i]});
    }
    const rows = [];
    for(let i=0;i<numTabs;i++)
    {
        rows.push(createData(evalList[i].data.name,features[i]));
    }
    console.log(headCells,rows);

    return(
        <Grid container spacing={2} className={classes.tableContainer}>
            <div className={classes.root}>
                <AppBar position="static">
                    <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                    <Tab label="Table" {...a11yProps(0)} />
                    <Tab label="Line Chart" {...a11yProps(1)} />
                    <Tab label="Bar Chart" {...a11yProps(2)} />
                    </Tabs>
                </AppBar>
                <TabPanel value={value} index={0}>
                    <Grid item xs={12}>
                        <Paper elevation={5}>
                            <Box m={2}>
                                <GeneralTable
                                    rows={rows}
                                    headCells={headCells}
                                    tabletitle="Feature Importances"
                                />
                            </Box>
                        </Paper>
                    </Grid>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <Grid item xs={12}>
                        <Paper elevation={5}>
                            <Plot className={classes.plot} 
                                data={linedata}
                                layout={ {title: 'Feature Importances',barmode: 'stack'} }
                                config={ {
                                    scrollZoom:true,
                                    responsive:true
                                } }
                            />
                        </Paper>
                    </Grid>
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <Grid item xs={12}>
                        <Paper elevation={5}>
                            <Plot className={classes.plot}
                                data={data}
                                layout={ {title: 'Feature Importances',barmode: 'stack'} }
                                config={ {
                                    scrollZoom:true,
                                    responsive:true
                                } }
                            />
                        </Paper>
                    </Grid>
                </TabPanel>
            </div>
        </Grid>
    );
}
