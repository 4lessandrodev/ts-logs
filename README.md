# ts-logs - beta
Understand what happens in your application. Manage your logs and audit the steps of each request.

<a href="https://www.npmjs.com/package/ts-logs" rel="nofollow" class="keychainify-checked">
 <img src="https://badgen.net/github/checks/4lessandrodev/ts-logs/main" 
 alt="checks" 
 style="max-width: 100%;">
</a>
<a href="https://www.npmjs.com/package/ts-logs" rel="nofollow" class="keychainify-checked">
 <img src="https://badgen.net/github/stars/4lessandrodev/ts-logs" 
 alt="stars" 
 style="max-width: 100%;">
</a>
<a href="https://www.npmjs.com/package/ts-logs" rel="nofollow" class="keychainify-checked">
 <img src="https://badgen.net/github/commits/4lessandrodev/ts-logs/main" 
 alt="commits" 
 style="max-width: 100%;">
</a>
<a href="https://www.npmjs.com/package/ts-logs" rel="nofollow" class="keychainify-checked">
 <img src="https://badgen.net/github/last-commit/4lessandrodev/ts-logs/main" 
 alt="last commit" 
 style="max-width: 100%;">
</a>
<a href="https://www.npmjs.com/package/ts-logs" rel="nofollow" class="keychainify-checked">
 <img src="https://badgen.net/github/license/4lessandrodev/ts-logs" 
 alt="license" 
 style="max-width: 100%;">
</a>
<a href="https://www.npmjs.com/package/ts-logs" rel="nofollow" class="keychainify-checked">
 <img src="https://badgen.net/github/dependabot/4lessandrodev/ts-logs" 
 alt="dependabot" 
 style="max-width: 100%;">
</a>
<a href="https://www.npmjs.com/package/ts-logs" rel="nofollow" class="keychainify-checked">
 <img src="https://badgen.net/github/tag/4lessandrodev/ts-logs" 
 alt="tags" 
 style="max-width: 100%;">
</a>
<a href="https://www.npmjs.com/package/ts-logs" rel="nofollow" class="keychainify-checked">
 <img src="https://badgen.net/github/closed-issues/4lessandrodev/ts-logs" 
 alt="issues" 
 style="max-width: 100%;">
</a>
<a href="https://github.com/4lessandrodev/ts-logs?branch=main" rel="nofollow" class="keychainify-checked">
 <img src="https://img.shields.io/codecov/c/github/dwyl/hapi-auth-jwt2.svg?maxAge=2592000" 
 alt="issues" 
 style="max-width: 100%;">
</a>

---

## About the lib

This package provide a sdk to manage logs.

---
## Documentation

sdk in beta version.

Example

```ts
import { Log, Step } from 'ts-logs';

// create a global log
const global = Log.init({ name: 'First Log', origin: 'https://global.com' });

// create steps
const info = Step.info({ message: 'Fetching api...', name: 'Request Login', method: 'POST' });
const error = Step.error({ message: 'Timeout', name: 'Login', stack: 'Error stack' });

// add steps to global log
global.addSteps([ info, error ]);

// print or save logs
global.print();
global.writeLocal();

```

---

### Create step from catch block

Create a step instance from error. This method get many important information from axios error.

```ts

class DoSomething {
    async execute(data: Data): Promise<void> {
        try {
            
            // try do something ...
            await axios.post(url, data);

        } catch(error) {

            // create step instance from error
            return Step.catch(error);
        }
    }
}

```

---

### Log object

Example generated log. The log is a json object with array of step object 

```json

{
  "uid": "1c7e5aca-c9f4-4e33-a5e7-d8a9cfe94053",
  "name": "Log Example",
  "ip": "127.0.0.1",
  "origin": "http://127.0.0.1:3000",
  "createdAt": "2023-02-05T23:00:40.481Z",
  "addBehavior": "stateful",
  "steps": [
    {
      "name": "Find Item",
      "tags": ["item", "product", "cart"],
      "url": "https://my-app.com/products/1",
      "stack": "none",
      "data": "none",
      "statusCode": 200,
      "message": "Fetching api...",
      "type": "info",
      "method": "GET",
      "createdAt": "2023-02-05T23:00:40.481Z",
      "uid": "673e17fb-55aa-4ea9-8668-e34b94bfd22c"
    },
    {
      "name": "Login",
      "tags": [],
      "url": "https://my-app.com/login",
      "stack": "Error: Connection Refused - Forbidden \\n at GetStack (/home/user/...)",
      "data": "{ \"email\": \"test@mail.com\" }",
      "statusCode": 401,
      "message": "Forbidden",
      "type": "stack",
      "method": "POST",
      "createdAt": "2023-02-05T23:00:40.481Z",
      "uid": "2df15a5a-9c5a-4686-8811-c4ed1fd9bedd"
    },
    {
      "name": "Signup",
      "tags": ["register", "user", "app"],
      "url": "https://my-app.com/signup",
      "stack": "Error: Connection Refused - Timeout\\n at GetStack (/home/user/logs/...)",
      "data": "{\"name\":\"Jane Doe\"}",
      "statusCode": 502,
      "message": "Internal Error",
      "type": "debug",
      "method": "POST",
      "createdAt": "2023-02-05T23:00:40.481Z",
      "uid": "1c7e5aca-c9f4-4e33-a5e7-d8a9cfe94053"
    }
  ]
}

```

---

### Use as middleware

Express middleware to capture app errors.

```ts

import express from 'express';
import { stackLog } from 'ts-logs';

const app = express();
app.use(express.json());

// ...
app.use(routes);

// last middleware to handle errors using `stackLog` all errors will be intercepted.
app.use(stackLog({ writeLocal: true })); // <------ middleware

app.liste(3000);

```

### Bind

You also may use bind middleware to apply a log instance to request

```ts

import express from 'express';
import { bindLog, Config } from 'ts-logs';

const app = express();
app.use(express.json());

// on top of routes you can bind a log instance to request
app.use(bindLog()); // <------ middleware

app.get("/log", async (req: Request, res: Response) => {

    // you can do anything with log instance from request.
    req.log.addStep( /* any step */ );
    req.log.print(); // show steps on terminal
    await req.log.publish(Config.S3(/* ... */)) // publish to s3

    res.status(200).json(req.log);
});

// ...

app.use(routes);

```

---

### Use as middleware step

if you use many steps as middleware you can use global log

```ts

import express from 'express';
import { bindLog, Config } from 'ts-logs';

const app = express();
app.use(express.json());

// on top of routes you can bind a log instance to request
app.use(bindLog()); // <------ middleware

app.get("/process", (req: Request, res: Response, next: NextFunction) => {

    // you can do anything with log instance
    req.log.addStep( /* info step */ ); // <------ add step to global log state.

    // call next step
    next();
}, (req: Request, res: Response, next: NextFunction) => {

    // you can do anything with log instance
    req.log.addStep( /* error step */ ); // <------ add step to global log state.

    // call next step
    next();
}, async (req: Request, res: Response, next: NextFunction) => {

    // you can do anything with log instance
    req.log.addStep( /* stack step */ ); // <------ add step to global log state.

    // publish log with steps to aws s3
    await req.log.publish(Config.S3(/* ... */));

    // send log to client
    res.status(200).json(req.log);
});

// ...

app.use(routes);

```

---

### Publish log automatically

you can use in conjunction with binding middleware other middleware to automatically publish logs to your preferred provider.

```ts

import express from 'express';
import { bindLog, autoPublishLog, Config } from 'ts-logs';

const app = express();
app.use(express.json());

// on top of routes you can bind a log instance to request
app.use(bindLog()); // <------ middleware

// after `bindLog` add `autoPublishLog` to automatically publish logs
app.use(autoPublishLog(Config.S3())); // <------ middleware

app.get("/log", async (req: Request, res: Response) => {

    // you can do anything with log instance from request.
    req.log.addStep( /* any step */ ); // <------ add step to publish

    res.status(200).json(req.log);
});

// ...

app.use(routes);

```

---

### Flows

Flows using middleware

Using `bindLog` combined with `autoPublishLog` middleware

![flow](docs/flow-01.png)

Using `bindLog` combined with `stackLog` middleware

![flow](docs/flow-02.png)
