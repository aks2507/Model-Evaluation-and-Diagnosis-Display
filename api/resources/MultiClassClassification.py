

def multiclassClassification(loaded_model,x_test):
    y_score=None
    if hasattr(loaded_model,'decision_function'):
        y_score = loaded_model.decision_function(x_test)
    else:
        y_score=loaded_model.predict_proba(x_test)
    y_score=y_score.tolist()
    return y_score