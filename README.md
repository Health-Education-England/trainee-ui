# trainee-ui
Front-end for Training Pathway app

## Tech Stack and Architecture
Full Tech and Architecture are described elsewhere.  The front-end uses REST interaction with the back-end service(s).

We've decided to use [React](https://reactjs.org/) to build the UI with a set of libraries for the aspects given below. 

## Core Libraries
We'll start by using:
1. [Reach Router](https://reach.tech/router) for Routing*
2. [React Redux](https://react-redux.js.org/) for State Management
3. [Axios](https://github.com/axios/axios) for HTTP communication*
4. [Material](https://material-ui.com/) for UI design
5. [Jest](https://jestjs.io/) for unit and snapshot testing*
6. [Cypress](https://www.cypress.io/) for E2E testing

*There was wide support for using these.

## Other decisions/Conversation
- There was a clear choice to use typescript rather than prop-types
- We definitely need to review the libraries as part of making sure the tech stack is right for the app
- There's a good chance we'll need to discuss whether to add:
    1. Middleware from [Redux-Saga](https://redux-saga.js.org) or less-likely [Redux-Thunk](https://github.com/reduxjs/redux-thunk)
    2. [enzyme](https://github.com/airbnb/enzyme) in unit and snapshot testing
- We probably won't end up adopting [prop-types](https://github.com/facebook/prop-types) for the additional validation it provides.
- The thread can be picked up from the Jira ticket [Identify Core React Libraries](https://hee-tis.atlassian.net/browse/TISNEW-3581)