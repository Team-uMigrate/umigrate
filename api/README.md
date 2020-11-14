# Summary
This guide is for developing and using the uMigrate API.


# Using the API
The following are commonly used API endpoints and pages.

## Admin
Visit the /admin/ page to use administrative control over resources in the database. You must be have the superuser status and staff status to have access to this page.

## Swagger
Visit the /swagger/ page to see all available endpoints. More endpoints will be visible when visiting this page as an authenticated user. You can test these endpoints through the swagger page or by visiting the endpoints directly.

## Registration
Visit the /api/registration/ endpoint to register for uMigrate. You will need to make a POST request with your email, password, and password again. An email will be sent with a link to verify your registration. Click the link to complete registration. If running the API locally, the email will be in your running terminal.

## Login
Visit the /api/login/ endpoint to log into your account. You will need to make a POST request with your email and password.

## Logout
Visit the /api/logout/ endpoint to log out of your account. You will need to make an empty POST request.

## Password reset
Visit the /api/password/reset/ endpoint to reset your account password. You will need to make a POST request with your email. An email will be sent with a link to set a new password. Click the link to go to the password reset page. Follow the instructions on the page to complete the password reset.

## Password change
Visit the /api/password/change/ endpoint to change your account password. You will need to make a POST request with your old password, new password, and new password again. You must be authenticated to have access to this endpoint.


# Running the API locally.
Follow the following steps to get the API running locally on your machine.

## Applications to install
1. Git 2: Used for source control and integration with GitHub. Find the version to download for your OS [here](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git).
2. Python 3.7: Used to run the API. Find the version to download for your OS [here](https://www.python.org/downloads/release/python-379/).
3. Docker Desktop: Used to run the Redis in-memory data store and postgres database. Download the Windows version [here](https://hub.docker.com/editions/community/docker-ce-desktop-windows) or the Mac version [here](https://hub.docker.com/editions/community/docker-ce-desktop-mac). Check all checkboxes when installing. You will need to restart after installing. After restart, open Docker Desktop and it may ask you to install WSL 2. Follow the instructions to install WSL 2. You will need to restart after installing WSL 2. There is no Docker Desktop for Linux, but you can download the Docker Engine for Ubuntu Linux [here](https://docs.docker.com/engine/install/ubuntu/).

## Clone the repo
1. In the terminal of your choice, navigate to the directory you want to put the umigrate project in.
2. Clone the repo by running the command `git clone https://github.com/Team-uMigrate/umigrate.git`.

## Setup
1. In the terminal of your choice, navigate to the umigrate project, then navigate to the umigrate/api/src/ directory.
2. Create a virtual environment by running the command `py -3.7 -m venv env` on Windows and `python3.7 -m venv env` on Mac or Linux.
3. Download the Redis Docker Container image by running the command `docker pull redis`.
4. Download the Postgres Docker Container image by running the command `docker pull postgres`.

## Activate the virtual environment
1. In the terminal of your choice, navigate to the umigrate project, then navigate to the umigrate/api/src/ directory.
2. Activate the virtual environment by running the command `.\env\Scripts\activate` for Windows or `source env/bin/activate` for Mac or Linux. If using git bash on Windows, do `source env/Scripts/activate` instead. You will now see the text `(env)` on the current line in your terminal.
3. If you want to deactivate the virtual environment, run the command `deactivate`.

## Update packages
1. Activate the virtual environment.
2. Update the packages by running the command `pip install -r requirements.txt`.

## Run Postgres Docker Container
1. In the terminal of your choice, navigate to the umigrate project, then navigate to the umigrate/api/src/ directory.
2. Run the Postgres Docker Container by running the command `docker run -d --name postgres-docker -p 5432:5432 -e POSTGRES_PASSWORD=postgres postgres`.
3. Enter the container by running the command `docker exec -it postgres-docker /bin/bash`.
4. Enter the psql command-line by running the command `psql -U postgres`.
5. Create the umigratedb database by running the command `CREATE DATABASE umigratedb;`
6. If you want to exit psql, run the command `\q`.
7. If you want to exit the container, run the command `exit`.

## Run Redis Docker Container
1. In the terminal of your choice, navigate to the umigrate project, then navigate to the umigrate/api/src/ directory.
2. Run the Redis Docker Container by running the command `docker run -d --name redis-docker -p 6379:6379 redis`.

## Update the database schema
1. Run the Postgres Docker Container.
2. Activate the virtual environment.
3. Run the command `python manage.py migrate`.

## Run the API
1. Activate the virtual environment.
2. Run the Postgres Docker Container.
3. Run the Redis Docker Container.
4. Start the Django server by running the command `python manage.py runserver`. The API should be running on port 8000. You can click the URL in the terminal to view the browsable API.


# Developing the API locally
The following are some things to keep in mind when developing locally.

## Recommended editors
The API team uses either Visual Studio Code (free) or PyCharm Professional (free for students). You can download Visual Studio Code [here](https://code.visualstudio.com/download). You can download PyCharm Professional [here](https://www.jetbrains.com/pycharm/download/).

## Visual Studio Code extensions
Python Extension Pack: donjayamanne.python-extension-pack
Django Test Runner: pachwenko.django-test-runner
Docker: ms-azuretools.vscode-docker
PostgreSQL: ckolkman.vscode-postgres

## Opening the API project
Always open the API project from the umigrate/api/src/ directory to avoid namespacing issues.

## Modifying Models
After modifying models in any models.py file, you need to create new migration files that will update the database schema to reflect the changed models. Create the migration files by running the command `python manage.py makemigrations`. Then update the database schema by running the command `python manage.py migrate`.

## Clearing the database
To clear the data in the database, run the command `python manage.py flush`. This command will not drop the database or the tables in the database.

## Adding new packages
To add new packages to the virtual env, add them to the requirements.txt file, then run the command `pip install -r requirements.txt`.

## Running tests
To run all unit tests, run the command `python manage.py test`. The test results will appear in the running terminal.


# Tutorials
Django: https://www.linkedin.com/learning/learning-django-2
Django rest framework: https://www.linkedin.com/learning/building-restful-web-apis-with-django
