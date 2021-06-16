import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
// components
import Details from './Details';
import Plots from '../comparisonComps/Plots';
import DetailsComp from '../comparisonComps/Details';

// const useStyles = makeStyles({
//     table: {
//       width:"90%",
//       margin:"auto",
//     },
// });

export default function DatasetInfo(props){

    const description = props.datasetinfo.metadata.description;
    const columns = props.datasetinfo.metadata.columns;

    const x = columns;
    console.log(description,typeof(description))
    const mean = [];
    const std = [];
    const min = [];
    const q25 = [];
    const q50 = [];
    const q75 = [];
    const max = [];

    for(const [key, value] of Object.entries(description)){
        console.log(key, value);
        mean.push(value.mean);
        std.push(value.std);
        min.push(value.min);
        max.push(value.max);
        q25.push(value['25%']);
        q50.push(value['50%']);
        q75.push(value['75%']);
    }

    console.log(mean, std, min, max, q25, q50, q75);

    const trace = [];
    trace.push({x:x,y:mean,type:'scatter',name:'Mean'})
    trace.push({x:x,y:std,type:'scatter',name:'Standard Deviation'})
    trace.push({x:x,y:min,type:'scatter',name:'Minimum'})
    trace.push({x:x,y:max,type:'scatter',name:'Maximum'})
    trace.push({x:x,y:q25,type:'scatter',name:'First Quartile'})
    trace.push({x:x,y:q50,type:'scatter',name:'Second Quartile'})
    trace.push({x:x,y:q75,type:'scatter',name:'Third Quartile'})

    const data = [...trace];

    // const classes = useStyles();
    return (
        <div className="col">
            {props.compare ? (
                <DetailsComp evaluations={props.evaluations}/>
            ) : (
                <div className="row">
                    <Details
                        area={1}
                        name={props.name}
                        model_type={props.model_type}
                        date_created={props.date_created}
                        datasetinfo={props.datasetinfo}
                        modelinfo={props.modelinfo}
                    />
                </div>
            )}
            <div className="row">
                {/*Plot here*/}
                <Plots data={data} width={900} height={675}/>
            </div>
            <div className="row">
                {/*Table here*/}
            </div>
        </div>
    );
}