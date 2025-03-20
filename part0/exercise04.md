# Exercise 0.4: New note diagram

Create a diagram depicting the situation where the user creates a new note on the [Traditional Web Application](https://studies.cs.helsinki.fi/exampleapp/notes).

---
---

## Table of Contents:

- [Process](#process)
- [Diagram](#diagram)
- [Conclusion](#conclusion)

---
---

## Process:

1. The user navigates to the [notes page](https://studies.cs.helsinki.fi/exampleapp/notes) where the browser loads HTML, CSS, JavaScript, and the existing notes data.

2. The user enters `Hello Guys! :)` into the text field and clicks the `Save` button, submitting the form:

    ![image0](/.github/images/part0/04_00.png)

3. The form submission initiates the following sequence:
   - The browser sends a `POST` request to the server's `/exampleapp/new_note` endpoint.
   - The server processes the new note, adds it to its data storage.
   - The server responds with a `302` status code, redirecting the browser back to the notes page.
   - The browser reloads the entire page, requesting all resources again.
   - The updated list of notes (including the new one) is displayed:

    ![image1](/.github/images/part0/04_01.png)

    ![image2](/.github/images/part0/04_02.png)

---
---

## Diagram:

```mermaid
sequenceDiagram
    participant browser
    participant server

    Note right of browser: The user writes "Hello Guys! :)" into the text field and clicks the `Save` button.

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note | payload: note="Hello Guys! :)"
    activate server
    server-->>browser: 302 Found (Redirect) | Location: /exampleapp/notes
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/notes
    activate server
    server-->>browser: HTML Document
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server-->>browser: The CSS file
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
    activate server
    server-->>browser: The JavaScript file
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

This diagram illustrates the traditional web application approach to handling form submissions. Key observations:

- **User experience**: The server responds with a redirect (`HTTP 302`), so the entire page must reload after form submission.
- **Network traffic**: Five `HTTP` requests are required to reload all resources (HTML, CSS, JavaScript, data) after creating a new note.

---
---