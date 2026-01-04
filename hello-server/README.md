# Hello Server

This is an  example that shows how to run a Node.js web server inside a container.

The server is written in TypeScript  and uses the Fastify framework.

This project is meant for learning purposes.

---

## What is this example about?

- Starts a web server
- Listens on port 3000
- The server has one web address you can visit: http://localhost:3000/greet  
  
The following improvements were made:

- Enabled a specific Node.js module version instead of using a default version
- Explicitly installed both nodejs and npm
- Ensured dependencies are installed inside the container using npm install
- Structured the build steps clearly so they are easy to understand
- Made the container build reproducible and easier to maintain

-- Each improvement was committed to Git and marked with a new version tag


