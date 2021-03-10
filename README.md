# Django + React + GraphQL boilerplate


## Description

`django-react-graphql-boilerplate` is a very basic application you can use as a boilerplate for integrating Django + React + GraphQL. It uses django as the backend with only one app installed, that offers a very simple user management functionality. It has a React front end with a GraphQL layer between them. 

It also comes with a docker-compose setup you can use to run with one-click.


## How to run

Clone the repository:

```zsh
➜ git clone https://github.com/KonstantinosPapadopoulos/django-react-graphql-boilerplate
```

Run docker-compose from the root of the project.

```zsh
➜  docker-compose up
```

After the build is done, you should be able to access the api and the front-end app at `http://localhost:8000` and `http://localhost:3000` respectively.