import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import CssBaseline from '@material-ui/core/CssBaseline';

// Components
import Navbar from '../components/Navbar';
import Metrics from '../comparisonComps/Metrics';
import PrecisionRecall from '../comparisonComps/PrecisionRecall';
import ROC_AUC from '../comparisonComps/ROC_AUC';
import FeatureImportance from '../comparisonComps/FeatureImportance'
import DatasetInfo from '../components/DatasetInfo';
import ClassImb from '../components/ClassImb';
import MetricsDatasetComparision from '../comparisonComps/MetricsDatasetComparision';
function TabPanel(props) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`vertical-tabpanel-${index}`}
			aria-labelledby={`vertical-tab-${index}`}
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
		id: `vertical-tab-${index}`,
		'aria-controls': `vertical-tabpanel-${index}`,
	};
}

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		backgroundColor: theme.palette.background.paper,
		display: 'flex',
		height: "100%",
	},
	tabs: {
		borderRight: `1px solid ${theme.palette.divider}`,
		width: 280,
		height: "100%",
	},
	leftarea: {
		backgroundColor: theme.palette.background.paper,
		display: 'inline',
		variant: 'fullWidth',
		height: "100%",
		width: "100%",
	},
}));



export default function Comparison(props) {
	const eval_ids_str = props.match.params.eval_ids;
	let eval_ids = eval_ids_str.split(",");
	const classes = useStyles();
	const [value, setValue] = React.useState(0);
	const initialValue = [];
	for(let i=0;i<eval_ids.length;i++)
	{
		initialValue.push({data:{dataset:{metadata:{description:{}}},model:{metadata:{}}}});
	}
	console.log(initialValue);

	const [evalList, setevalList] = React.useState(initialValue);
	const [load, setLoad] = React.useState(true);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	// Fetching the data
	let urls = [];
	let i;
	for(i=0;i<eval_ids.length;i++)
	{
		urls.push("/evaluate/"+eval_ids[i])
	}

	const mapLoop = async _ => {
		console.log('Start')
	  
		const promises = urls.map(async url => {
		  const evaluation = await axios.get(url)
		  return evaluation
		})
	  
		const evaluations = await Promise.all(promises)
		
	  
		console.log('End')
		return evaluations;
	}
	if(load)
	{
		const evals = mapLoop().then((data) => {
				setevalList(data);
		});
		setLoad(false);
	}
	
	console.log(evalList);
	return (
		<>
			<Navbar/>
			
			<div className={classes.root}>
				<div className={classes.root}>
					<Tabs
						orientation="vertical"
						variant="scrollable"
						value={value}
						onChange={handleChange}
						aria-label="Vertical tabs example"
						className={classes.tabs}
					>
						<Tab label="Metrics" {...a11yProps(0)} />
						<Tab label="Dataset Information" {...a11yProps(1)} />
						{evalList[0].data.model_type === "regression" ? (
							null
						) : (
							
							<Tab label="Curves" {...a11yProps(2)}/>

						)}
					</Tabs>
				</div>
				<>
					<CssBaseline/>
					<div className={classes.leftarea}>
						<TabPanel value={value} index={0}>
						<MetricsDatasetComparision
						evaluations={evalList}
						/>
						</TabPanel>
						<TabPanel value={value} index={1}>
							
						</TabPanel>
						
					</div>
				</>
			</div>
		</>
	);
}
