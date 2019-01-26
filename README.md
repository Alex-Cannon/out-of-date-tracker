# Out of Date Tracker

I'm Alexander Cannon, author of this here repository.
This is a simple app used to keep track of dairy dates.

## How To

1) Setup a mongodb database like mlab.
2) Copy mongoURI & paste in your .env file (or src/config.js)
3) Set SESSION_SECRET (this can be anything)

Your .env file should look like so:

DB_URI=*(insert mongoURI)*

SESSION_SECRET=*(insert session secret)*

Now, use **"node serve.js"** to run production.
