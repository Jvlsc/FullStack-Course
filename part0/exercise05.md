# Exercise 0.5: Single page app diagram

Create a diagram depicting the situation where the user goes to the single-page app version of the notes app at https://studies.cs.helsinki.fi/exampleapp/spa.

---
---

## Process:

1. The user navigates to the [page](https://studies.cs.helsinki.fi/exampleapp/spa) (GET request):

    ![image0](/.github/images/part0/05_00.png)


2. The page requests the `main.css` and `spa.js` files (GET requests):

    ![image1](/.github/images/part0/05_01.png)
    ![image2](/.github/images/part0/05_02.png)
    ![image3](/.github/images/part0/05_03.png)

3. The `spa.js` file requests the `JSON` data (GET request) and renders the notes:

    ![image4](/.github/images/part0/05_04.png)
    ![image5](/.github/images/part0/05_05.png)

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
    server-->>browser: the css file
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa.js
    activate server
    server-->>browser: the JavaScript file
    deactivate server

    Note right of browser: The browser starts executing the JavaScript code that fetches the JSON from the server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->>browser: [{content: "hi", date: "2025-03-20T09:43:30.836Z", ... ]
    deactivate server

    Note right of browser: The browser executes the callback function that renders the notes

```

---
---

## Conclusion:

The diagram above shows the process of the user going to the Single Page App version of the notes app. The process is similar to the traditional web application.


---
---