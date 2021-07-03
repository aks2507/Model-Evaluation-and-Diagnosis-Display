import React from 'react';
import Plots from '../comparisonComps/Plots';

export default function CurvesMultiClass(props) {
  let fpr = props.fpr;
  let tpr = props.tpr;
  let auc = props.auc;
  let n_classes = props.n_classes;
  const c = props.c;
  let title = '';
  if (c === 0) {
    title = 'ROC Curves';
  } else {
    title = 'Precision-Recall Curve';
  }
  let trace = [];
  for (let i = 0; i < n_classes; i++) {
    const labels = 'Class: ' + i + '(AUC=' + auc[i].toFixed(2) + ')';
    trace.push({ x: fpr[i], y: tpr[i], type: 'scatter', name: labels });
  }
  let data = [...trace];

  return <Plots data={data} title={title} />;
}
