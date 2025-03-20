# Exercise 0.5: Single page app diagram

Create a diagram depicting the situation where the user goes to the [Single Page App](https://studies.cs.helsinki.fi/exampleapp/spa) version of the notes app.

---
---

## Table of Contents:

- [Process](#process)
- [Diagram](#diagram)
- [Conclusion](#conclusion)

---
---

## Process:

1. The user navigates to the [notes page](https://studies.cs.helsinki.fi/exampleapp/spa) (`GET` request):

    ![image0](/.github/images/part0/05_00.png)


2. The browser parses the HTML and requests the additional resources required by the page (`GET` requests):
   - The CSS file (`main.css`) for styling
   - The JavaScript file (`spa.js`) containing the SPA functionality

    ![image1](/.github/images/part0/05_01.png)
    ![image2](/.github/images/part0/05_02.png)
    ![image3](/.github/images/part0/05_03.png)

3. The browser executes the JavaScript code in `spa.js`, which:
   - Makes an asynchronous `GET` request to fetch the notes data.
   - Parses the received `JSON` data.
   - Dynamically renders the notes to the `DOM` without page reloading.

    ![image4](/.github/images/part0/05_04.png)
    ![image5](/.github/images/part0/05_05.png)
    ![image6](/.github/images/part0/05_06.png)

---
---

## Diagram:

```mermaid
sequenceDiagram
    participant browser
    participant server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa
    activate server
    server-->>browser: HTML document
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server-->>browser: The CSS file
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa.js
    activate server
    server-->>browser: The JavaScript file
    deactivate server

    Note right of browser: The browser starts executing the JavaScript code that fetches the JSON from the server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->>browser: [{content: "hi", date: "2025-03-20T09:43:30.836Z", ... ]
    deactivate server

    Note right of browser: The browser renders the notes

```

---
---

## Conclusion:

This diagram illustrates the key characteristics of a `Single Page Application (SPA)`. The initial loading process is similar to a traditional web application, but the fundamental difference emerges afterward: the page doesn't reload when interacting with or displaying content. Instead, the `JavaScript` code fetches data asynchronously and renders it dynamically on the client side.


---
---