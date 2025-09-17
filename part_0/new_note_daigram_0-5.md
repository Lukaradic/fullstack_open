```mermaid
sequenceDiagram;
Client->>Server: https://studies.cs.helsinki.fi/exampleapp/spa
Server->>Client: HTML document
Client->>Server: https://studies.cs.helsinki.fi/exampleapp/main.css
Server->>Client: css file
Client->>Server: https://studies.cs.helsinki.fi/exampleapp/spa.js
Server->>Client: js file
Client->>Server: https://studies.cs.helsinki.fi/exampleapp/data.json
Server->>Client: JSON data
```
