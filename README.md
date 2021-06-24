<img src="https://img.shields.io/badge/Oracle-F80000?style=for-the-badge&logo=oracle&logoColor=black" height="50">

# Model Evaluation and Diagnosis Display
Model Evaluation is the process through which we quantify the quality of a system’s predictions. To do this, we measure the newly trained model performance on a new and independent dataset. This model will compare labeled data with it’s own predictions.
Model evaluation performance metrics teach us:
- How well our model is performing
- Is our model accurate enough to put into production
- Will a larger training set improve my model’s performance?
- Is my model under-fitting or over-fitting?

## Steps:
### Step 1:
#### Bring your own test dataset and Serialised Model
Train your model in Jupyter Notebook/Kaggle/GoogleColab and obtain the serialised model and dataset as follows:<br>

```python
import pandas as pd
from sklearn.tree import DecisionTreeClassifier
from sklearn.model_selection import train_test_split 
```

```python
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=0)
df1=pd.DataFrame(X_test)
df2=pd.DataFrame(y_test)
result=pd.concat([df1,df2],axis=1)

#Saving the Testing Data used for evaluation
result.to_csv('test_data_DecisionTree.csv',index=False)

```
```python
#Training the model
from sklearn.linear_model import LogisticRegression
LR=LogisticRegression(solver='lbfgs', max_iter=10000)
LR.fit(X_train,y_train)
filename = 'finalized_model.sav'

#Obtaining the Serialised Model
pickle.dump(LR, open(filename, 'wb'))

```

### Step 2:
Clone the repo and run the command `yarn install`  to install the neccessary dependencies

### Step 3:
#### Run the code on your local machine
### Server Side
The api folder is included in this repository itself, along with the frontend code. To spin up the server at http://localhost:5000 , open a terminal, navigate to the folder where you have cloned this repository, and run:

### `yarn start-api`

### Client Side
In the project directory, to spin up the client at http://localhost:3000 ,  run:

### `yarn start`

As soon as both the server and client are up and running, you will be able to surf through the site and call API endpoints. The React-frontend has a proxy setup to port 5000. That way, the urls that are not recognised on port 3000, get redirected to port 5000, thus invoking the endpoints, if they have been defined in the backend.

### Step 4:
While the server side is running, populate your models and datasets using POSTMAN triggering the following API endpoints:
#### `http://localhost:5000/models, method=["POST"]`
This endpoint adds a model to the "Models" table of the database, based on json payload provided.
#### `http://localhost:5000/models, method=["GET"]`
This endpoint gives the list of all models that are stored in the "Models" table of the database.


#### `http://localhost:5000/datasets, method=["POST"]`
This endpoint adds a dataset to the "datasets" table of the database, based on json payload provided.
#### `http://localhost:5000/datasets, method=["GET"]`
This endpoint gives the list of all datasets that are stored in the "Datasets" table of the database.


## FrontEnd
<img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB">
<img src="https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white">
<img src="https://i2.paste.pics/9f1ab8b4c09535ff79576760ca24a361.png" height=28>
<img src="https://i2.paste.pics/9c7c942ada45d6480558c55bef91a5d3.png" height=28>
<img src="https://img.shields.io/badge/Material--UI-0081CB?style=for-the-badge&logo=material-ui&logoColor=white">
<img src="https://i2.paste.pics/0aaddf5918d5f69030a82fd7a96ac22d.png" height=28>
<img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node-dot-js&logoColor=white">
<img src="https://img.shields.io/badge/Yarn-2C8EBB?style=for-the-badge&logo=yarn&logoColor=white">
<img src="https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E">
<img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white">
<img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white">

## BackEnd
<img src="https://img.shields.io/badge/Python-FFD43B?style=for-the-badge&logo=python&logoColor=darkgreen">

<img src="https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask&logoColor=white">
<img src="https://i2.paste.pics/f77a1deb70618b7bc38d05696f8c5089.png" height=28>
<img src="https://img.shields.io/badge/SQLite-07405E?style=for-the-badge&logo=sqlite&logoColor=white">
<img src="https://www.sqlalchemy.org/img/sqla_logo.png" height=28>
<img src="https://img.shields.io/badge/scikit_learn-F7931E?style=for-the-badge&logo=scikit-learn&logoColor=white">
<img src="https://img.shields.io/badge/Plotly-239120?style=for-the-badge&logo=plotly&logoColor=white">
<img src="https://img.shields.io/badge/Numpy-777BB4?style=for-the-badge&logo=numpy&logoColor=white">
<img src="https://img.shields.io/badge/Pandas-2C2D72?style=for-the-badge&logo=pandas&logoColor=white">
<img src="https://i2.paste.pics/b2bee7ba0c2eb9592bd5eccb18afe488.png" height=28>
<img src="https://static1.smartbear.co/swagger/media/assets/images/swagger_logo.svg" height=28> 

## Others
<img src="https://img.shields.io/badge/Markdown-000000?style=for-the-badge&logo=markdown&logoColor=white">
<img src="https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white">
<img src="https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white">
<img src="https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=Postman&logoColor=white">
<img src="https://img.shields.io/badge/Visual_Studio_Code-0078D4?style=for-the-badge&logo=visual%20studio%20code&logoColor=white">

## API Endpoints
### `http://localhost:5000/evaluate, method=["GET"]`
This endpoint gives the list of all evaluations that are stored in the "Evaluations" table of the database.

### `http://localhost:5000/evaluate, method=["POST"]`
This endpoint adds an evaluation to the "Evaluations" table of the database, based on input given by the user.

### `http://localhost:5000/evaluate/<int:eval_id>, method=["GET"]`
This endpoint returns the evaluation with the given eval_id stored in the "Evaluations" table of the database. There is no POST request for this endpoint, because eval_id is a self-incrementing primary key of the table.

### `http://localhost:5000/evaluate/<int:eval_id>, method=["DELETE"]`
This endpoint deletes the evaluation with the given eval_id from the "Evaluations" table of the database.

# Quick Start
## Some General inormation
1) There are two types of tables in the project
    * Interactive
        * Can toggle padding
        * Change number of rows per page
        * Navigate between table pages
        * Checkbox to select on or multiple rows
        * Delete button to delete slected row(s)
        * Sort according to column
    * Non-Interactive: Plain simple table to display data
    * Semi-Interactive: Same as interactive, except following  are removed:
        * Delete option
        * Checkboxes to select

2) Only plots that are shown in single evaluation have a slider. They have not been added in  comparisons, considering their lack of utility in such a case.

3) Datasets and models are currently registered using either Postman or Swagger UI. Evauluations can be registered using the UI.

4) Comaprison is only possible in two cases:
    * Multiple models trained on the same dataset
    * Same model tested on multiple datasets

5) Only models provided by the Scikit-Learn Library are supported

6) Model files are unpickled and used. So only one extension, .sav, is supported

## Homepage
The Homepage consists of a table where all the evaluations are listed. The table is fully interactive. By clicking on the EvaluationID, the user can see the visualizations related to it. The Compare button can be used to compare two or more evaluations. Refer to the General information section above to see how these work. Clicking on the Evaluation ID triggers the model evaluation, if the metrics are not there already.
Each row has the following information:
* Evaluation ID
* Evaluation name
* Model Type
* Model
* Dataset
* Date Created

## Evaluation Post Form
This page contains the form that helps the user to register an evaluation.
The user enters the following information here:
* Evaluation name
* Model Type(selection)
* Dataset(selection)
* Model(selection)
* Description(optional)

On submitting, the evaluation gets stored in the table, without the metadata.

## Single Model Evaluation
The evaluation metrics for a single model can be visualized by clicking on the button encircling the Evaluation ID of the evaluation in the table at Homepage. It essentially sends a get request for the evaluation, and based on the received payload, It will render the visualisations as follows:

*Note: All tables rendered in this scenario are semi-interactive, except the table for feature importance.*
### Evaluation Metrics
Following evaluation metrics will be visible to the user the user in tabular, bar chart and line chart format:

| Classification | Regression         |
| -------------- | ------------------ |
| Accuracy       | MAE                |
| Precision      | MSE                |
| Recall         | RMSE               |
| F1-Score       | RMSLE              |
| Log-Loss       | R-squared          |
| ----           | Adjusted R-squared |

### Curves and Charts
The following curves and charts will be shown to the user when they select this option:

| Classification   | Regression            |
| ---------------- | --------------------- |
| ROC              | Residual vs Observed  |
| Precision-Recall | Observed vs Predicted |
| Confusion Matrix | Residual vs Predicted |

Along with the plots, there are also several ways to interact with them, by: 
1) Zooming in and out using scrolling
2) Select
3) Lasso select
4) Slider of cutoff value
5) Button to reset to initial state
6) Drag and move
7) Save as PNG

### Dataset Information
The following data is shown about the test dataset used by the model for the prediction:
1) Dataset Statistics are shown in Tabular format as well as in Line Chart format. Following are the statistics displayed in it, for each column of the dataset:
    * Mean
    * Standard deviation
    * Minimum value
    * Maximum value
    * First Quartile
    * Second Quartile
    * Third Quartile
    * IQR
    * Number of missing values
2) Feature Importances are shown in Bar chart as well as tabular format
3) Class Imbalence is shown in Pie-chart format

### Model Information
This section gives a tabular view of the parameters and attributes that are associated with the trained model, in a tabular format.

### Details
Each of the above tabs will have a Details tab, that gives information about the evaluation in general, some information about the dataset and the model used in the evaluation.

## Multiple Model Single Dataset Comparison
For both regression and classification, there are five types of components rendered:
* Metrics
* Dataset Information
* Model information
* Curves
* Details(part of each tab panel)

### Metrics
An semi-interactive table, along with both bar graph and line charts are rendered in this tab. Metrics are the same as put up in the above section on Single Evaluation. The table can be sorted by metrices to compare the models.

### Dataset information
Since the evaluations being considered in this case must have the same dataset, the same component that was used for single evaluation use case has been used.

### Model Information
Multiple tables listing out parameters and attributes of each model are rendered. 

### Curves
The plots mentioned in the above section are rendered, with the traces of other models in the same graph.

### Details
Every tab panel has it. Its the same as single evaluation, except now, it has tabs for all evaluations that were selected by the user.

## Single Model Multiple Datasets
For both regression and classification, there are five types of components rendered:
* Metrics
* Dataset Information
* Model information
* Curves
* Details(part of each tab panel)

### Metrics
An semi-interactive table, along with both bar graph and line charts are rendered in this tab. Metrics are the same as put up in the above section on Single Evaluation. The table can be sorted by metrices to compare the datasets.

### Dataset information
The The dataset statistics for all datasets are shown tab wise. User can switch between statistics and compare the datasets based on those statistics. The use can also switch between tabular view and Line Chart view. Along with this, it also contains information about the feature importances of the datasets in chart and tabular format, and the class imbalence.

### Model Information
Since the model being used is same, there is a single table listing out all the parameters and attributes of the trained model.

### Curves
The plots mentioned in the 'Single Model Evaluation' section are rendered, with the traces of other datasets in the same graph, or in subplots.

### Details
Every tab panel has it. Its the same as single evaluation, except now, it has tabs for all evaluations that were selected by the user.