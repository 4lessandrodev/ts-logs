# ts-logs - under development
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

Application in beta version.

Example

```ts
import { randomUUID } from 'node:crypto';
import { Log, Step } from 'ts-logs';

// any id or unique string value
const uid = randomUUID();

// create a global log
const global = Log.init({ name: 'First Log', uid, origin: 'https://global.com' });

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

### Create step from try block

Create a step instance from error.

```ts

class DoSomething {
    async execute(data: Data): Promise<void> {
        try {
            
            // try do something ...

        } catch(error) {

            // create step instance from error
            return Step.catch(error);
        }
    }
}

```

---

### Use as middleware

Express middleware in **beta** version.

```ts

import express from 'express';
import { stackLog } from 'ts-logs';

const app = express();
app.use(express.json());

// ...
app.use(routes);

// last middleware to handle errors using `stackLog` all errors will be intercepted.
app.use(stackLog({ writeLocal: true }));

app.liste(3000);

```

### Bind

You also may use bind middleware to apply a log instance to request

```ts

import express from 'express';
import { bindLog } from 'ts-logs';

const app = express();
app.use(express.json());

// on top of routes you can bind a log instance to request
app.use(bindLog());

app.get("/log", async (req: Request, res: Response) => {

    // you can do anything with log instance
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
import { bindLog } from 'ts-logs';

const app = express();
app.use(express.json());

// on top of routes you can bind a log instance to request
app.use(bindLog());

app.get("/process", (req: Request, res: Response, next: NextFunction) => {

    // you can do any with log instance
    req.log.addStep( /* info step */ );

    // call next step
    next();
}, (req: Request, res: Response, next: NextFunction) => {

    // you can do any with log instance
    req.log.addStep( /* error step */ );

    // call next step
    next();
}, async (req: Request, res: Response, next: NextFunction) => {

    // you can do any with log instance
    req.log.addStep( /* stack step */ );

    // publish log with steps on aws s3
    await req.log.publish(Config.S3(/* ... */));

    // send log to client
    res.status(200).json(req.log);
});

// ...

app.use(routes);

```
