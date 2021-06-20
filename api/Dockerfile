FROM python:3
WORKDIR /app
EXPOSE 5000
ENV FLASK_APP=app.py

COPY . .
RUN pip install -r requirements.txt

CMD [ "flask", "run", "--host", "0.0.0.0" ]


