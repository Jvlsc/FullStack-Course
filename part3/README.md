# Part 3 - Programming a server with NodeJS and Express

In this part our focus shifts towards the backend, that is, towards implementing functionality on the server side of the stack. We will implement a simple REST API in Node.js by using the Express library, and the application's data will be stored in a MongoDB database. At the end of this part, we will deploy our application to the internet.

---
---

## Table of Contents:

- **[Node.js and Express](#nodejs-and-express)**
- **[Deploying app to internet](#deploying-app-to-internet)**
- **[Saving data to MongoDB](#saving-data-to-mongodb)**
- **[Validation and ESLint](#validation-and-eslint)**

---
---

## Node.js and Express:

In [this chapter](https://fullstackopen.com/en/part3/node_js_and_express), we will implement a simple REST API in Node.js by using the Express library locally.

### Exercises:

- **[Exercise 3.1](https://github.com/Jvlsc/FullStack-Course/blob/8a69fbc588b5b43c5bfabd70e41115ff24d16271/part3/phonebook/index.js)**: The Phonebook Backend (Step 1).
- **[Exercise 3.2](https://github.com/Jvlsc/FullStack-Course/blob/9879a195d20083c699adefeda25646ababf6b84e/part3/phonebook/index.js)**: The Phonebook Backend (Step 2).
- **[Exercise 3.3](https://github.com/Jvlsc/FullStack-Course/blob/673c1db849e76a3a46a1816780540ef911e22666/part3/phonebook/index.js)**: The Phonebook Backend (Step 3).
- **[Exercise 3.4](https://github.com/Jvlsc/FullStack-Course/blob/088c6859e5956031f4c34d9690280f355aa0eec0/part3/phonebook/index.js)**: The Phonebook Backend (Step 4).
- **[Exercise 3.5](https://github.com/Jvlsc/FullStack-Course/blob/7dfacf566d76a69313827df0296bc3218e660d1a/part3/phonebook/index.js)**: The Phonebook Backend (Step 5).
- **[Exercise 3.6](https://github.com/Jvlsc/FullStack-Course/blob/08256db6d64910b82228d805945940c07943dfbf/part3/phonebook/index.js)**: The Phonebook Backend (Step 6).
- **[Exercise 3.7](https://github.com/Jvlsc/FullStack-Course/blob/dc0dd9762f66e3ecb0a30fc9ff4582dd028df2f9/part3/phonebook/index.js)**: The Phonebook Backend (Step 7).
- **[Exercise 3.8](https://github.com/Jvlsc/FullStack-Course/blob/9351a42eb6c95d6401737e1e05c0ed8d2139a0c1/part3/phonebook/index.js)**: The Phonebook Backend (Step 8).

---
---

## Deploying app to internet:

In [this chapter](https://fullstackopen.com/en/part3/deploying_app_to_internet), we will deploy our application to the internet. The service we will use is [Fly.io](https://fly.io/).

#### The project is available at this link: 

- **[Phonebook Service.](https://phonebook-blue-lake-542.fly.dev)**

### Exercises:

- **[Exercise 3.9](https://github.com/Jvlsc/FullStack-Course/blob/b3c954fd2b0df8a0d61cc74fae91cee0a2d3a10b/part3/phonebook/index.js)**: The Phonebook Backend (Step 9).
- **[Exercise 3.10](https://github.com/Jvlsc/FullStack-Course/blob/09ae2ec753bfe81d466ddc5dd5ca95a5c80bee7f/part3/phonebook/index.js)**: The Phonebook Backend (Step 10).
- **[Exercise 3.11](https://github.com/Jvlsc/FullStack-Course/blob/16bb38d1b5c7a5fb47ad44c08d1e4c41b16d550b/part3/phonebook/index.js)**: The Phonebook Backend (Step 11).

---
---

## Saving data to MongoDB:

In [this chapter](https://fullstackopen.com/en/part3/saving_data_to_mongo_db), we will save the application's data to a MongoDB database in MongoDB Atlas.

### Exercises:

- **[Exercise 3.12](https://github.com/Jvlsc/FullStack-Course/blob/53a8a624991845863b17aa9f4df277dcffcf409e/part3/phonebook/mongo.js)**: Command-line database.
- **[Exercise 3.13](https://github.com/Jvlsc/FullStack-Course/blob/db6cf2e67afad1650e70ddb2295de115d9fe871e/part3/phonebook/models/person.js)**: The Phonebook Database (Step 1).
- **[Exercise 3.14](https://github.com/Jvlsc/FullStack-Course/blob/ec0d85d9cbe25b184ba3cbd41b00de8fe4fe58d4/part3/phonebook/index.js)**: The Phonebook Database (Step 2).
- **[Exercise 3.15](https://github.com/Jvlsc/FullStack-Course/blob/cb973d7d619b4e3db199965088b9fd07d76c6200/part3/phonebook/index.js)**: The Phonebook Database (Step 3).
- **[Exercise 3.16](https://github.com/Jvlsc/FullStack-Course/blob/538dfb593038b988c9a733d902c02bba6135bed5/part3/phonebook/index.js)**: The Phonebook Database (Step 4).
- **[Exercise 3.17](https://github.com/Jvlsc/FullStack-Course/blob/4b2bdd578ef94a3bd6e0147d10ba3f7bb11f2798/part3/phonebook/index.js)**: The Phonebook Database (Step 5).
- **[Exercise 3.18](https://github.com/Jvlsc/FullStack-Course/blob/8ae8966baa5c9c398c2bdc79beec8ffc04179ff6/part3/phonebook/index.js)**: The Phonebook Database (Step 6).
- **[Additional Exercise](https://github.com/Jvlsc/FullStack-Course/blob/63980f8e33f9615bea53b8172b6721d2103266c1/part3/phonebook/index.js)**: Prevent create a new Person via API if already existe another with the same `name` in the Database.
---
---

## Validation and ESLint:

In [this chapter](https://fullstackopen.com/en/part3/validation_and_es_lint), we will implement validation and ESLint in our backend.

### Exercises:

- **[Exercise 3.19](https://github.com/Jvlsc/FullStack-Course/blob/75a5e2fc00dac7b059a622fc2108c99bb6fdbcd2/part3/phonebook/models/person.js)**: The Phonebook Database (Step 7).
- **[Exercise 3.20](https://github.com/Jvlsc/FullStack-Course/blob/ce6313dd0700fe671f2952f0de1aaa7d62214ea2/part3/phonebook/models/person.js)**: The Phonebook Database (Step 8).
- **[Exercise 3.21](https://github.com/Jvlsc/FullStack-Course/blob/446d7e8e60cf7fe5feebabb43252a87d31732775/part3/phonebook/index.js)**: Deploying the Database Backend to Production.
- **[Exercise 3.22](https://github.com/Jvlsc/FullStack-Course/blob/57848c1f4198772a6982d658efdf8dff84b6930b/part3/phonebook/eslint.config.mjs)**: Lint Configuration.

---
---