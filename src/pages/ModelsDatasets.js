import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EvalForm from './EvalForm';

const ModelsDatasets = () => {
    const [mdata, setMdata] = useState(null);

    useEffect(() => {
      console.log("useEffect called");
      const getData=async()=>{
          try{
            const res=await axios.get("/models");
            setMdata(res.data);
          }
          catch(e){
            console.log(e);
          }
      };
      getData();
    },[]);
    console.log(mdata);
    return (
       JSON.stringify(mdata)
    );
}

export default ModelsDatasets;
