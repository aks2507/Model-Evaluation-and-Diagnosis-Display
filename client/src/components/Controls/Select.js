import React from 'react'
import { FormControl, InputLabel, Select as MuiSelect, MenuItem, FormHelperText, Grid } from '@material-ui/core';
import Box from '@material-ui/core/Box';

export default function Select(props) {

    const { name, value,error=null, onModelTypeChange, onModelChange, onDatasetChange, options } = props;

    const model_types = options.map( evaluation => evaluation.model_type).filter( (v,i,a) => a.indexOf(v)===i)
    const model = options.map( evaluation => evaluation.model_name).filter( (v,i,a) => a.indexOf(v)===i)
    const dataset = options.map( evaluation => evaluation.dataset_name).filter( (v,i,a) => a.indexOf(v)===i)

    return (
    
        <>

                <FormControl variant="outlined"{...(error && {error:true})}>
                    
                        <Box ml={20} pr={5} mr={5}>
                        <InputLabel>Model Type</InputLabel>
                        </Box>
                        
                        <MuiSelect label="Model Type" name={name} value={value} onChange={onModelTypeChange}>
                            <MenuItem value="">None</MenuItem>
                            {
                                model_types.map(
                                    item => (<MenuItem key={item} value={item}>{item}</MenuItem>)
                                )
                            }
                        </MuiSelect>
                        {error && <FormHelperText>{error}</FormHelperText>}
                </FormControl>
        

              
                <FormControl variant="outlined"
                    {...(error && {error:true})}
                >
                    <Box ml={20} pr={5} mr={5}>
                    <InputLabel>Model Name</InputLabel>
                    </Box>
                   
                    <MuiSelect
                        label="Model"
                        name={name}
                        value={value}
                        onChange={onModelChange}
                    >
                        <MenuItem value="">None</MenuItem>
                        {
                            model.map(
                                item => (<MenuItem key={item} value={item}>{item}</MenuItem>)
                            )
                        }
                    </MuiSelect>
                    {error && <FormHelperText>{error}</FormHelperText>}
                </FormControl>
            

                <FormControl variant="outlined"
                    {...(error && {error:true})}
                >
                    <Box ml={20} pr={5} mr={5}>
                        <InputLabel>Dataset</InputLabel>
                        </Box>
                        
                    <MuiSelect
                        label="Dataset"
                        name={name}
                        value={value}
                        onChange={onDatasetChange}
                    >
                        <MenuItem value="">None</MenuItem>
                        {
                            dataset.map(
                                item => (<MenuItem key={item} value={item}>{item}</MenuItem>)
                            )
                        }
                    </MuiSelect>
                    {error && <FormHelperText>{error}</FormHelperText>}
                </FormControl>

           </>
        
    )
}