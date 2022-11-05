# talker-manager-api

An API that sends Talkers Data and have Login Validations to change, add or delete someone.


# Table of contents

- [Getting Started](#getting-started)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [More Info](#more-info)
- [Contact](#contact)

## Getting Started

This API was developed by me in the trybe course where it works with a json file to save and get the data, many endpoints have validations and are working with route management, it works locally, so you need to download the repository


SOME ENDPOINTS:    
talkers: http://localhost:3000/talker to show all talker data.     
login: http://localhost:3000/login to validate your login    
find talker by ID: http://localhost:3000/talker/${id}          
find talker by name: http://localhost:3000/talker/search?q=${name}    

### Prerequisites

node 16 version

### Installation

```

Clone the repo:   
$ git clone git@github.com:RuhamLeal/talker-manager-api.git    

Go to project folder:     
$ cd talker-manager-api     

Install dependencies:    
$ npm install

Run:    
$ npm run dev

```
If you dont have node 16 version installed, you can run with docker-compose
```
$ docker-compose up -d
 
Await download the image and then:

$ docker exec -it talker_manager bash

Inside the container, install dependecies:

$ npm install

And Run server:

$ npm start
```

### More Info

This Project will was done with node.js, express.js, docker-compose.

### Contact

Ruham Leal    
Email: ruhamxlpro@hotmail.com    
Linkedin: https://www.linkedin.com/in/ruham-leal-dos-santos-sutil-38a837243/
