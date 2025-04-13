# Part 5 - Testing React Apps

In [this part](https://fullstackopen.com/en/part5), we return to the frontend, first looking at different possibilities for testing the React code. We will also implement token based authentication which will enable users to log in to our application.

---
---

## Table of Contents:

- **[Login in Frontend](#login-in-frontend)**
- **[props.children and Proptypes](#propschildren-and-proptypes)**
- **[Testing React Apps](#testing-react-apps)**
- **[End-to-End Testing - Playwright](#end-to-end-testing---playwright)**
- **[End-to-End Testing - Cypress](#end-to-end-testing---cypress)**

---
---

## Login in Frontend:

In [this chapter](https://fullstackopen.com/en/part5/login_in_frontend), we will implement a login service in the frontend.

### Exercises:

- **[Exercise 5.1](https://github.com/Jvlsc/FullStack-Course/blob/8a5a61a496a4ff771a44a937d12524e0066cb3ee/part5/bloglist-frontend/src/App.jsx)**: Blog List Frontend (Step 1).
- **[Exercise 5.2](https://github.com/Jvlsc/FullStack-Course/blob/6acf27518801672a1dd905bd921423e2a3c979ae/part5/bloglist-frontend/src/App.jsx)**: Blog List Frontend (Step 2).
- **[Exercise 5.3](https://github.com/Jvlsc/FullStack-Course/blob/992485cf18a4ed1d87fc0ddb15491def2d7997f4/part5/bloglist-frontend/src/App.jsx)**: Blog List Frontend (Step 3).
- **[Exercise 5.4](https://github.com/Jvlsc/FullStack-Course/blob/6b3eace83e80f7af0064a83bd0570bb5a07dee59/part5/bloglist-frontend/src/App.jsx)**: Blog List Frontend (Step 4).

---
---

## props.children and Proptypes:

In [this chapter](https://fullstackopen.com/en/part5/props_children_and_proptypes), we will learn about the `props.children` and `PropTypes` concepts.

### Exercises:

- **[Exercise 5.5](https://github.com/Jvlsc/FullStack-Course/blob/ed232338f58afc5884de306ac3d132367e7b03ac/part5/bloglist-frontend/src/App.jsx)**: Blog List Frontend (Step 5).
- **[Exercise 5.6](https://github.com/Jvlsc/FullStack-Course/blob/5b428c0a6564f305439fbc571026b2befd4ca15d/part5/bloglist-frontend/src/App.jsx)**: Blog List Frontend (Step 6).
- **[Exercise 5.7](https://github.com/Jvlsc/FullStack-Course/blob/0ae28c705b8726ae103143414694400c2896a886/part5/bloglist-frontend/src/components/Blogs.jsx)**: Blog List Frontend (Step 7).
- **[Exercise 5.8](https://github.com/Jvlsc/FullStack-Course/blob/c1ce87d7ff527d0869b15156268e0f74ec9257df/part5/bloglist-frontend/src/App.jsx)**: Blog List Frontend (Step 8).
- **[Exercise 5.9](https://github.com/Jvlsc/FullStack-Course/blob/0ae28c705b8726ae103143414694400c2896a886/part5/bloglist-frontend/src/components/Blogs.jsx)**: Blog List Frontend (Step 9).
- **[Exercise 5.10](https://github.com/Jvlsc/FullStack-Course/blob/a091bff3cd12af5c4dfd138c241b08fbbc58f720/part5/bloglist-frontend/src/App.jsx)**: Blog List Frontend (Step 10).
- **[Exercise 5.11](https://github.com/Jvlsc/FullStack-Course/blob/a091bff3cd12af5c4dfd138c241b08fbbc58f720/part5/bloglist-frontend/src/App.jsx)**: Blog List Frontend (Step 11) -> [Missed Feature](https://github.com/Jvlsc/FullStack-Course/blob/f42f033c41cc39496c8f8e756723cf7efe922222/part5/bloglist-frontend/src/components/Blogs.jsx).
- **[Exercise 5.12](https://github.com/Jvlsc/FullStack-Course/blob/73c7539de70c39695c181fef3227e39043bb17ba/part5/bloglist-frontend/.eslintrc.cjs)**: Blog List Frontend (Step 12).
- **[Final Version](https://github.com/Jvlsc/FullStack-Course/blob/c16efbf82ef238a2aed65b8ea001ed8a777bd0e7/part5/bloglist-frontend/src/App.jsx)**: The user validation in PUT requests are moved to the backend (like POST & DELETE requests).

---
---

## Testing React Apps:

In [this chapter](https://fullstackopen.com/en/part5/testing_react_apps), we will learn how to test React apps.

### Exercises:

- **[Exercise 5.13](https://github.com/Jvlsc/FullStack-Course/blob/e11b985387c34aeba1be40f630bed6f77848919b/part5/bloglist-frontend/test/Blog.test.jsx)**: Blog List Tests (Step 1) -> [Final Version](https://github.com/Jvlsc/FullStack-Course/blob/e13bb31cc02fcf2cccc85c479ecad407903ef0c1/part5/bloglist-frontend/tests/Blogs.test.jsx).
- **[Exercise 5.14](https://github.com/Jvlsc/FullStack-Course/blob/e6cbaa673582a0da03af6b8009afe6d8cdd5471b/part5/bloglist-frontend/test/Blog.test.jsx)**: Blog List Tests (Step 2) -> [Final Version](https://github.com/Jvlsc/FullStack-Course/blob/e13bb31cc02fcf2cccc85c479ecad407903ef0c1/part5/bloglist-frontend/tests/Blogs.test.jsx).
- **[Exercise 5.15](https://github.com/Jvlsc/FullStack-Course/blob/442c11044d21ac97b30501bc60934a37ff06ba26/part5/bloglist-frontend/test/Blogs.test.jsx)**: Blog List Tests (Step 3) -> [Final Version](https://github.com/Jvlsc/FullStack-Course/blob/e13bb31cc02fcf2cccc85c479ecad407903ef0c1/part5/bloglist-frontend/tests/Blogs.test.jsx).
- **[Exercise 5.16](https://github.com/Jvlsc/FullStack-Course/blob/ea7e30cbe7f349a740d8d7f5fc46c3f5fe6989e1/part5/bloglist-frontend/test/BlogForm.test.jsx)**: Blog List Tests (Step 4) -> [Final Version](https://github.com/Jvlsc/FullStack-Course/blob/e13bb31cc02fcf2cccc85c479ecad407903ef0c1/part5/bloglist-frontend/tests/BlogForm.test.jsx).

---
---

## End-to-End Testing - Playwright:

In [this chapter](https://fullstackopen.com/en/part5/end_to_end_testing_playwright), we will learn how to test React apps using Playwright (End-to-End Testing).

### Exercises:

- **[Exercise 5.17](https://github.com/Jvlsc/FullStack-Course/blob/a49e842de58b5c1f6336be44420464118e88cf3a/part5/bloglist-E2E/tests/login.spec.js)**: Blog List End To End Testing Playwright (Step 1).
- **[Exercise 5.18](https://github.com/Jvlsc/FullStack-Course/blob/a49e842de58b5c1f6336be44420464118e88cf3a/part5/bloglist-E2E/tests/login.spec.js)**: Blog List End To End Testing Playwright (Step 2).
- **[Exercise 5.19](https://github.com/Jvlsc/FullStack-Course/blob/42fe74db238b0f36baa0f01ed5d14c72d85424d6/part5/bloglist-E2E/tests/tests.spec.js)**: Blog List End To End Testing Playwright (Step 3).
- **[Exercise 5.20](https://github.com/Jvlsc/FullStack-Course/blob/6e520493f87e3e067e1fbf2840c7754056dfaa40/part5/bloglist-E2E/tests/tests.spec.js)**: Blog List End To End Testing Playwright (Step 4) -> [Improved Version](https://github.com/Jvlsc/FullStack-Course/blob/a7e3aa74feb014358890112a873aa54259229dfb/part5/bloglist-E2E/tests/tests.spec.js).
- **[Exercise 5.21](https://github.com/Jvlsc/FullStack-Course/blob/8cce2010093f5d32e38e416db60b54023fc6d2a1/part5/bloglist-E2E/tests/tests.spec.js)**: Blog List End To End Testing Playwright (Step 5).
- **[Exercise 5.22](https://github.com/Jvlsc/FullStack-Course/blob/d51214fe8dfe5da641043b7466e2f9de7f146bce/part5/bloglist-E2E/tests/tests.spec.js)**: Blog List End To End Testing Playwright (Step 6).
- **[Exercise 5.23](https://github.com/Jvlsc/FullStack-Course/blob/a7e3aa74feb014358890112a873aa54259229dfb/part5/bloglist-E2E/tests/tests.spec.js)**: Blog List End To End Testing Playwright (Step 7).

---
---

## End-to-End Testing - Cypress:

In [this chapter](https://fullstackopen.com/en/part5/end_to_end_testing_cypress), we will learn how to test React apps using Cypress (End-to-End Testing).

### Exercises:

- **As the instructor suggests, we will stick to Playwright for this course.**

---
---