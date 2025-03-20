# Exercise 0.4: New note diagram

Create a diagram depicting the situation where the user creates a new note on the page https://studies.cs.helsinki.fi/exampleapp/notes by writing something into the text field and clicking the Save button.

---
---

## Process:

1. The user navigates to the page: [Link](https://studies.cs.helsinki.fi/exampleapp/notes).
2. The user writes "Hello Guys! :)" into the text field of the `POST` request form and clicks the `Save` button:

    ![image0](/.github/images/part0/04_00.png)

3. The new note is saved to the server and the user is redirected to the page again displaying the new created note:
    ![image1](/.github/images/part0/04_01.png)

    ![image2](/.github/images/part0/04_02.png)

---
---

## Diagram:

```mermaid
sequenceDiagram
    participant browser
    participant server

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note | payload: note="Hello Guys! :)"
    activate server
    server-->>browser: 302 Found (Redirect) | Location: /exampleapp/notes
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/notes
    activate server
    server-->>browser: HTML document
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server-->>browser: the css file
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
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

The diagram above shows the process of the user creating a new note in a traditional web application. The problem with this approach is that the page is reloaded once the new note is created, producing 5 HTTP requests and bad user experience.

---
---