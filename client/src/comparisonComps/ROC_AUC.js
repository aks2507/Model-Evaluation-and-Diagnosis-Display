import React from 'react';
import {withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Plot from 'react-plotly.js';
import {Grid} from '@material-ui/core';
import Details from './Details';


const StyledTableCell = withStyles((theme) => ({
	head: {
		backgroundColor: theme.palette.common.black,
		color: theme.palette.common.white,
	},
	body: {
		fontSize: 14,
	},
}))(TableCell);



const useStyles = makeStyles({
	table: {
		minWidth: 300,
		margin: "auto",
	},
	plot: {
		width: '90%',
		justifyContent: 'center',
		alignItems: 'center',
	},
});

function createData(name,area){
  	return {name,area};
}



export default function ROC_AUC(props){
    let evalList = props.evaluations;
    let numTabs = evalList.length;
    let c=props.c;

    let tpr=[];
    let fpr=[];
    let auc=[];
    const n_classes=evalList[0].data.metadata.n_classes;
    if(n_classes===2)
    {
		for(let i=0;i<numTabs;i++)
		{
			var fpr_list=evalList[i].data.metadata.fpr;
			var tpr_list=evalList[i].data.metadata.tpr
			fpr.push(fpr_list);
			tpr.push(tpr_list);
			auc.push(evalList[i].data.metadata.roc_auc);
		}
    }
    else{
		for(let i=0;i<numTabs;i++)
		{
			fpr_list=evalList[i].data.metadata.fpr["micro"];
			tpr_list=evalList[i].data.metadata.tpr["micro"]
			fpr.push(fpr_list);
			tpr.push(tpr_list);
			auc.push(evalList[i].data.metadata.roc_auc["micro"]);
		}
    }
    
   

  
	let trace = [];
	for(let i=0;i<numTabs;i++)
	{
		if(c===0)
			trace.push({x:fpr[i],y:tpr[i],type:'scatter',name:evalList[i].data.dataset.name});
		else
			trace.push({x:fpr[i],y:tpr[i],type:'scatter',name:evalList[i].data.name});
	}
	let data = [...trace]

	var info=[];
	var auc_=[];
	for(var i=0;i<numTabs;i++){
		if(c===0) 
			info.push(evalList[i].data.dataset.name)
		else
			info.push(evalList[i].data.name);
		auc_.push(auc[i].toFixed(2));
	}
	const title=n_classes===2?('ROC Curves'):('Micro average ROC curve');

	const classes = useStyles();
	var rows=[];
	for(i=0;i<numTabs;i++)
	{
		if(c===0)  
			rows.push(createData(evalList[i].data.dataset.name,auc[i].toFixed(2)));
		else
			rows.push(createData(evalList[i].data.name,auc[i].toFixed(2)));
	}

	return(
		<Grid container spacing={2}>

			<Grid item xs={12}>
				<Paper elevation={5}>
					<Details
						c={c}
						evaluations={evalList}
					/>
				</Paper>
			</Grid>
			<Grid container xs={12} spacing={2}>
				<Grid item xs={12} sm={6}>
					<Paper elevation={5}>
						<Plot   
							className={classes.plot}
							data={data}
							layout={ {title: title} }
							config={ {
								scrollZoom:true,
								responsive:true
							} }
						/>
					</Paper>
				</Grid>
				
				<Grid item xs={12} sm={6}>
					<Paper elevation={5}>
						<TableContainer>
							<Table className={classes.table} aria-label="simple table">
								<TableHead>
									<TableRow>
										<StyledTableCell>Model</StyledTableCell>
										<StyledTableCell align="right">AUC</StyledTableCell>
									</TableRow>
								</TableHead>
								<TableBody>
								{rows.map((row) => (
									<TableRow key={row.name}>
										<StyledTableCell component="th" scope="row">
											{row.name}
										</StyledTableCell>
										<StyledTableCell align="right">{row.area}</StyledTableCell>
									</TableRow>
								))}
								</TableBody>
							</Table>
						</TableContainer>
					</Paper>
				</Grid>
			</Grid>
		</Grid>
	);
}
