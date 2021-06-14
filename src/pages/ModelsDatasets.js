import React, { useState, useEffect } from "react";
import axios from "axios";
import EvalForm from "./EvalForm";

const ModelsDatasets = () => {
  const [data, setData] = useState({
    data1: { data: { dataset_entities: [] } },
    data2: { data: { model_entities: [] } },
  });

  useEffect(() => {
    (async () => {
      const data1 = await axios.get("/datasets");
      const data2 = await axios.get("/models");
      setData({ data1, data2 });
    })();
  }, []);
  console.log(data);
  return (
    <EvalForm
      datasets={data.data1.data.dataset_entities}
      models={data.data2.data.model_entities}
    />
  );
};

export default ModelsDatasets;
