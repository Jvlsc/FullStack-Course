# Exercise 1 - CI/CD Commentary

Write a short text (200-300 words) where you answer or discuss some of the points below:

- Some common steps in a CI setup include linting, testing, and building. What are the specific tools for taking care of these steps in the ecosystem of the language you picked?
- What alternatives are there to set up the CI besides Jenkins and GitHub Actions?
- Would this setup be better in a self-hosted or a cloud-based environment? Why? What information would you need to make that decision?

---
---

## Commentary:

From my perspective and based on my experience, developers are the first and crucial link in the CI/CD pipeline. They represent the initial stage where code quality and best practices begin to take shape. Every developer should be consistent locally before reaching the repository and the CI pipeline.

Let's take an example of a Node.js project. Using Git Hooks with [Husky](https://typicode.github.io/husky/) developers locally can create a workflow that can enforce code quality and best practices before code is even pushed to the repository. For example:

- it can be defined a `pre-commit` hook to check for linting errors with [ESLint](https://eslint.org/) and format the code with [Prettier](https://prettier.io/) on staged files.
- It can be defined a `commit-msg` hook to check the commit message with [Commitlint](https://commitlint.js.org/) forcing consistent commit messages.
- it can be defined a `pre-push` hook to run the tests with [Jest](https://jestjs.io/). So, before every push, the tests will be run. If it is a big project, maybe just run a fraction of the tests more relevant.

With this setup, the code will be linted and formatted before every commit and the tests will be run before every push. Once in the repository, this tests could be run again in the CI pipeline. This could be done periodically, before a release or any other defined condition. The repository is a shared resource, the goal is to is to have a clean code that is easy to maintain and easy to test. Sometimes good practices force developers to sacrifice some creativity and flexibility, but in the long run, it will save time and money.

When it comes to CI alternatives beyond `Jenkins` and `GitHub Actions`, there are several robust options available in the market: [GitLab](https://docs.gitlab.com/ci/) has its own CI/CD, [Bitbucket](https://www.atlassian.com/software/bitbucket/features/pipelines) has its own CI/CD, [CircleCI](https://circleci.com/) or [Octopus](https://octopus.com/) are also good options. Regarding the choice between self-hosted or cloud-based environments, the decision largely depends on specific project requirements.

- A **cloud-based solution** would be more suitable for starting projects and small/medium size projects. It offers a reduced maintenance overhead, automatic scaling capabilities, and no need for infrastructure management.
- A **self-hosted solution** would be more suitable for large projects with high security requirements. It offers more control over the infrastructure and the data.

---
---