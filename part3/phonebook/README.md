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

## Deploying the Project:

**Build the Frontend:** This command will build the frontend of `part2` and copy the files to the backend project in the `dist` folder. *Note: This command doesn't work in `PowerShell`. If you are in Windows, use `Git Bash` or `WSL`*:

```bash
npm run build:ui
```


**Deploy the Backend:**

```bash
npm run deploy
```

**Build the Frontend + Deploy the Backend:**

```bash
npm run deploy:full
```

**Open the Deployed Backend:**

```bash
npm run open
```

**Deployed Backend Logs:**

```bash
npm run logs:prod
```

---
---

## Useful Fly Commands:

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