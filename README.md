# Wordle Game Project

This project is to run the Wordle game from the scratch.

The backend is using Django, while the frontend is using React

Due to the limited time,

The first step is establish a frame Django, and build two endpoints:
    '/new-word', GET, to fetch a word
    '/guess',POST, to generate some helper hints


## Backend:
1. pip install -r requirements.txt
2. python manage.py runserver

For test,
python manage.py test

## Frontend:
1. npm i
2. npm start

TBC:
1. Test for the frontend
2. There are still some frontend bugs
3. The color of the keys of keyboard needs to be marked if some letters are correct
4. There are no user accounts and the admin account