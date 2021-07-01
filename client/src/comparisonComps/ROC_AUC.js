import React from 'react';
import Paper from '@material-ui/core/Paper';
import Plots from './Plots';

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
			if(n_classes>2)
				trace.push({x:fpr[i],y:tpr[i],type:'scatter',name:evalList[i].data.dataset.name+'(AUC='+evalList[i].data.metadata.roc_auc["micro"].toFixed(2)+')'});
			else
				trace.push({x:fpr[i],y:tpr[i],type:'scatter',name:evalList[i].data.name+'(AUC='+evalList[i].data.metadata.roc_auc.toFixed(2)+')'});
		else
			trace.push({x:fpr[i],y:tpr[i],type:'scatter',name:evalList[i].data.name+'(AUC='+evalList[i].data.metadata.roc_auc.toFixed(2)+')'});
	}
	let data = [...trace]

	const title=n_classes===2?('ROC Curves'):('Micro average ROC curve');

	return(
		<Paper elevation={5}>
			<Plots   
				data={data}
				title={title}
			/>
		</Paper>
	);
}
