Clear instructions for how to programmatically REQUEST data from the microservice you implemented. Include an example call. Do not advise your teammate to use your test program or require them to, your teammate must write all of their own code.
Request data using an html page that will request data from the microservice in server.js.

Required packages:
npm init -y
npm install express bcrypt jsonwebtoken body-parser

Example Call:

    <h2>Register</h2>
    <input id="reg-user" placeholder="Username">
    <input id="reg-pass" type="password" placeholder="Password">
    <button onclick="register()">Register</button>
    <p id="reg-msg"></p>

Clear instructions for how to programmatically RECEIVE data from the microservice you implemented. Include an example call.
Receive data using html functions that will receive data from the microservice in server.js.

Example Call:

     async function register() {
      const username = document.getElementById("reg-user").value;
      const password = document.getElementById("reg-pass").value;

      const res = await fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      const data = await res.json();
      document.getElementById("reg-msg").innerText = data.message || data.error;
    }

UML sequence diagram showing how requesting and receiving data works. Make it detailed enough that your teammate (and your grader) will understand.

![image](https://github.com/user-attachments/assets/7314a292-7dff-4893-a63a-f3a9213bc795)
