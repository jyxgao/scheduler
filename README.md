# Interview Scheduler
A single page application (SPA) built using React. Users can create, edit and delete an interview appointment from a list of interviewers. Sidebar updates number of spots remaining as interviews are booked or canceled.

Data is persisted by an API server using a PostgreSQL database.

This is a Lighthouse Labs React project.

## Screenshots

Browse and Create an Appointment

!["Browse and Create Appointment"](https://github.com/jyxgao/scheduler/blob/master/docs/browse-to-create.gif?raw=true)

Edit an Existing Appointment

!["Edit an Existing Appointment"](https://github.com/jyxgao/scheduler/blob/master/docs/edit.gif?raw=true)

Delete an Existing Appointment

!["Delete an Existing Appointment"](https://github.com/jyxgao/scheduler/blob/master/docs/delete.gif?raw=true)


## Setup

Install dependencies with `npm install`.

This project requires an API server to run. Visit [scheduler-api](https://github.com/lighthouse-labs/scheduler-api) with Readme instructions to set up the API.


## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```
## Running Cypress End-To-End Test 

  ### API test server: 
  ```sh
  npm run test:server
  ```
  ### Start Cypress:
  ```sh
  npm run cypress
  ```
## Running Storybook Visual Testbed

```sh
npm run storybook
```
