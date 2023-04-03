# GOLDEN MEMES

A simple REST API that let users upload and share user-generated content or other content from external social media websites.

## Main Features

- User registration
- User login and authentication
- Upload images/videos
- List uploaded files
- Add comments
- Add to favourite
- Like/Dislike posts

## Technologies

- Django REST framework
- PostgreSQL
- Docker Compose

## Requirements

- Python 3.9
- Django 4.0.4
- Django REST framework 3.13.1

## Installation

* First you need to clone repository.
    ```bash
    git clone https://github.com/Naffik/GoldenMemes.git
    ```
* After you cloned the repository, create and fire up your virtual environment. You can do this by running the command:
    ```bash
    virtualenv  venv -p python3
    source venv/bin/activate
    ```
* This project has a Docker Compose file included in the repository at `docker-compose.yml`. First you need to cd into GoldenMemes folder where docker file is located. To build and run the project with Docker Compose, use the following command:
    ```bash
    docker-compose up --build
    ```
* The above command will start the containers for Django and PostgreSQL. The Django app will be running on port 8000. Next step is to make migrations, migrate and create super user. To do so you need to run this command in new console:
    ```bash
    docker exec -it django_container bash
    python manage.py makemigrations
    python manage.py migrate
    python manage.py createsuperuser
    ```
## Structure

In a RESTful API, endpoints (URLs) define the structure of the API and how end users access data from our application using the HTTP methods - GET, POST, PUT, DELETE. Endpoints should be logically organized around collections and elements, both of which are resources.

In our case, we have four resources such as `admin`, `api`, `docs` and `account`. To get more informations about endpoints use `http://127.0.0.1:8000/docs/`.

## Use

To demonstrate how to use the API to send data, we will use Postman, a popular API testing tool.

1. Start Postman and create a new request.
2. Set the request method to `POST`.
3. Enter the URL `http://127.0.0.1:8000/account/register/`.
4. Set the request body:
   - `username`: `example`
   - `email`: `example@example.com`
   - `password`: `zaq1@WSX`
   - `password2`: `zaq1@WSX`
5. Click the "Send" button to send the request.
6. The response will be displayed in the "Body" section of the Postman interface. The response will be in JSON format and will include the data retrieved from the API. It should look like this:
```json
{
"username": "example",
"email": "example@example.com"
}
```
