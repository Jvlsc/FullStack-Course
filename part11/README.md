# Part 11 - CI/CD

So you have a fresh feature ready to be shipped. What happens next? Do you upload files to a server manually? How do you manage the version of your product running in the wild? How do you make sure it works, and roll back to a safe version if it doesn't?

Doing all the above manually is a pain and doesn't scale well for a larger team. That's why we have Continuous Integration / Continuous Delivery systems, in short CI/CD systems. In [this part](https://fullstackopen.com/en/part11), you will gain an understanding of why you should use a CI/CD system, what can one do for you, and how to get started with GitHub Actions which is available to all GitHub users by default.

[Pokedex Deployment Link](https://pokedex-divine-water-3533.fly.dev)

---
---

## Table of Contents:

- **[Introduction to CI/CD](#introduction-to-cicd)**
- **[Getting Started with GitHub Actions](#getting-started-with-github-actions)**
- **[Deployment](#deployment)**
- **[Keeping Green](#keeping-green)**
- **[Expanding Further](#expanding-further)**

---
---

## Introduction to CI/CD:

In [this chapter](https://fullstackopen.com/en/part11/introduction_to_ci_cd), we will learn about the importance of CI/CD and how it can help us to improve the quality of our code and the speed of our development process.

### Exercises:

- [Exercise 11.1](https://github.com/Jvlsc/FullStack-Course/blob/8afa6064c7de080a4a75320727d138f106397516/part11/commentary/exercise1.md): Warming Up.

---
---

## Getting Started with GitHub Actions:

In [this chapter](https://fullstackopen.com/en/part11/getting_started_with_git_hub_actions), we will learn how to get started with GitHub Actions.

### Exercises:

- [Exercise 11.2](https://github.com/Jvlsc/FullStack-Course/blob/01f92fec97bdea186320d133c3e2b86630f4bc23/part11/Pokedex/package.json): The Example Project.
- [Exercise 11.3](https://github.com/Jvlsc/FullStack-Course/blob/f27f6e05c20863eb1d4a9a4b855e247102e6e9de/.github/workflow/hello.yml): Hello World!
- [Exercise 11.4](https://github.com/Jvlsc/FullStack-Course/blob/e328478b5cd7529078796d3c6ec41876defe1d9f/.github/workflows/hello.yml): Date and Directory Contents.
- [Exercise 11.5](https://github.com/Jvlsc/FullStack-Course/blob/f04e6f6d2bf309e6761f756ff61d944a5ac3a69d/.github/workflows/pipeline.yml): Linting Workflow.
- [Exercise 11.6](https://github.com/Jvlsc/FullStack-Course/blob/81dee85f2f4ae6de5eaa2d81cde07a5fb113438e/part11/Pokedex/.eslintrc.js): Fix the Code.
- [Exercise 11.7](https://github.com/Jvlsc/FullStack-Course/blob/9dff2c0a12b43c086f76852cb332c560bb08da10/.github/workflows/pipeline.yml): Building and Testing.
- [Exercise 11.8](https://github.com/Jvlsc/FullStack-Course/blob/97cf72b04d72a0bc695e0431034af4ae678fe511/part11/Pokedex/src/PokemonPage.jsx): Back to Green.
- [Exercise 11.9](https://github.com/Jvlsc/FullStack-Course/blob/c93b52e61148eff4e3838e3e127bda8498eb6550/.github/workflows/pipeline.yml): Simple End-to-End Tests.

---
---

## Deployment:

In [this chapter](https://fullstackopen.com/en/part11/deployment), we will learn how to deploy our application to Fly.io using GitHub Actions.

### Exercises:

- [Exercise 11.10](https://github.com/Jvlsc/FullStack-Course/blob/5bb1d3be78c0bc88b4bc9cb9ec13ca46074d9226/part11/Pokedex/fly.toml): Deploying the Application (Fly.io).
- [Exercise 11.11](https://github.com/Jvlsc/FullStack-Course/blob/45e749f561a853b129ec32e8f1ba0051066eac0c/.github/workflows/pipeline.yml): Automatic Deployments (Fly.io).
- [Exercise 11.12](https://github.com/Jvlsc/FullStack-Course/blob/30c489f9730de48a1d8de0cdabbcbe2f6d961561/part11/Pokedex/fly.toml): Health Check (Fly.io).

---
---

## Keeping Green:

In [this chapter](https://fullstackopen.com/en/part11/keeping_green), we will

### Exercises:

- [Exercise 11.13](https://github.com/Jvlsc/FullStack-Course/blob/5213a64b2378d42fee660d7acb0d95eba29f79d1/.github/workflows/pipeline.yml): Pull Request.
- [Exercise 11.14](https://github.com/Jvlsc/FullStack-Course/blob/2e507ee0f1d071d15b4b8a0bb94a9d0e259bced6/.github/workflows/pipeline.yml): Run Deployment (Only main Branch).
- [Exercise 11.15](https://github.com/Jvlsc/FullStack-Course/blob/55d73a24ab286d1124398819d85afc65ec60ad8c/.github/workflows/pipeline.yml): Adding Versioning.
- [Exercise 11.16](https://github.com/Jvlsc/FullStack-Course/blob/0592ef78db7a394ffac864df88738dc758d39b53/.github/workflows/pipeline.yml): Skipping a Commit for Tagging and Deployment.
- Exercise 11.17: Adding Protection to main Branch -> Repository Settings (Only works in public repositories or private repositories with GitHub Pro or Team)

---
---

## Expanding Further:

In [this chapter](https://fullstackopen.com/en/part11/expanding_further), we will

### Exercises:

- [Exercise 11.18](https://github.com/Jvlsc/FullStack-Course/blob/f759e917ea36eb50a88dc0112a51160459c880a3/.github/workflows/pipeline.yml): Build Success/Failure Notification Action.
- [Exercise 11.19](https://github.com/Jvlsc/FullStack-Course/blob/5a27c6892750ea7e77d15f0428ba00b2cbafc6c8/.github/workflows/health.yml): Periodic Health Check.
- [Exercise 11.20](): Your own Pipeline.
- [Exercise 11.21](): Protect main Branch + Ask for Pull-Request.

---
---