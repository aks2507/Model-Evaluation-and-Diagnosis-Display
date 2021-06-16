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
## Run the code on your local machine
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
1) ReactJS
2) React Router
3) Material UI
4) React Bootstrap
5) Vanilla JavaScript
6) JS ES6
7) HTML5
8) CSS

## BackEnd
1) Python
2) Flask
3) Flask-RESTful
4) SQLite3
5) SQLAlchemy
6) skelarn
7) plotly
8) matplotlib
9) mpld3
10) numpy
11) pandas
12) pickle-mixin

Apart from the above, Postman was used to test the API endpoints.

## API Endpoints
### `http://localhost:5000/evaluate, method=["GET"]`
This endpoint gives the list of all evaluations that are stored in the "Evaluations" table of the database.

### `http://localhost:5000/evaluate, method=["POST"]`
This endpoint adds an evaluation to the "Evaluations" table of the database, based on input given by the user.

### `http://localhost:5000/evaluate/<int:eval_id>, method=["GET"]`
This endpoint returns the evaluation with the given eval_id stored in the "Evaluations" table of the database. There is no POST request for this endpoint, because eval_id is a self-incrementing primary key of the table.

### `http://localhost:5000/evaluate/<int:eval_id>, method=["DELETE"]`
This endpoint deletes the evaluation with the given eval_id from the "Evaluations" table of the database.

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `yarn build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
