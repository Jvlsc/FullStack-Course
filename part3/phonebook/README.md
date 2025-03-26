# The Phonebook Project (Backend):

The exercises corresponding to this project are:

- **Exercise 3.1**: The Phonebook Backend (Step 1).
- **Exercise 3.2**: The Phonebook Backend (Step 2).
- **Exercise 3.3**: The Phonebook Backend (Step 3).
- **Exercise 3.4**: The Phonebook Backend (Step 4).
- **Exercise 3.5**: The Phonebook Backend (Step 5).
- **Exercise 3.6**: The Phonebook Backend (Step 6).
- **Exercise 3.7**: The Phonebook Backend (Step 7).
- **Exercise 3.8**: The Phonebook Backend (Step 8).
- **Exercise 3.9**: The Phonebook Backend (Step 9).
- **Exercise 3.10**: The Phonebook Backend (Step 10).
- **Exercise 3.11**: The Phonebook Backend (Step 11).

---

The project is deployed to [Fly.io](https://fly.io/) and the URL is: 

- https://phonebook-blue-lake-542.fly.dev

---
---

## Quick Start:

**Install dependencies:**

```bash
npm install
```

**Run the project (production mode):**

```bash
npm run start
```

**Run the project (development mode):**

```bash
npm run dev
```

---
---

## Environment Variables/Secrets:

The environment variables are stored in the `.env` file. The `.env.example` file is an example of the `.env` file and it is used to set the environment variables for the project. The `.env` file is not included in the repository to avoid exposing sensitive information. Ensure that you create your own `.env` file and set the environment variables correctly.

When the project is deployed to Fly.io, the environment variables are set using the `fly secrets set` command. Example in `bash`:

```bash
fly secrets set \
  MONGODB_USER='your_username' \
  MONGODB_PASSWORD='your_password' \
  MONGODB_CLUSTER='your_cluster.your_cluster_id' \
  MONGODB_DATABASE='your_database' \
  MONGODB_COLLECTION='your_collection' \
  MONGODB_MODEL='your_model' \
  MONGODB_APPNAME='your_appname' \
  SERVER_PORT='your_server_port'
```

En PowerShell:

```powershell
fly secrets set `
  MONGODB_USER='your_username' `
  MONGODB_PASSWORD='your_password' `
  MONGODB_CLUSTER='your_cluster.your_cluster_id' `
  MONGODB_DATABASE='your_database' `
  MONGODB_COLLECTION='your_collection' `
  MONGODB_MODEL='your_model' `
  MONGODB_APPNAME='your_appname' `
  SERVER_PORT='your_server_port'
```

This command will set the environment variables for the project in Fly.io. These environment variables are essential for connecting to your MongoDB database and configuring the server. The command typically only needs to be run once during initial setup. 

Alternatively, you can manage these environment variables through the Fly.io dashboard:
1. Navigate to the `Secrets` section in your Fly.io App dashboard
2. Add each environment variable individually.
3. Changes to secrets will request a redeployment of your application.

---
---

## Deploying the Project:

**Build the Frontend:** This command will build the frontend of `part2` and copy the files to the backend project in the `dist` folder:

```bash
npm run build:ui
```
*Note: This command doesn't work in `PowerShell`. If you are in Windows, use `Git Bash` or `WSL`.*

**Deploy the Backend:** This command will deploy the backend to Fly.io:

```bash
npm run deploy
```

**Build Frontend + Deploy Backend + Set Secrets:** This command will build and embed the frontend in the backend and deploy the all to Fly.io:

```bash
npm run deploy:full
```
*Note: This command doesn't work in `PowerShell`. If you are in Windows, use `Git Bash` or `WSL`.*

**Open the Deployed Backend:**

```bash
npm run open:prod
```

**Deployed Backend Logs:**

```bash
npm run logs:prod
```

---
---

## Useful Fly Commands:

**Deploy the Backend:**

```bash
fly deploy
```

**Set the Environment Variables:**

```bash
fly secrets set SECRET_NAME=SECRET_VALUE...
```

**Deployed Logs:**

```bash
fly logs
```

**Ping the Deployed Backend:**

```bash
fly ping -o personal
```

**List all Apps:**

```bash
fly apps list
```

**List all Services:**

```bash
fly services list 
```

**Scale the Number of Instances:**

```bash
fly scale count 1
```

**List all IP Addresses:**

```bash
fly ips list
```

---
---