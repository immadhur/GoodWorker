## GoodWorker

- GoodWorker is a web portal for job companies to find verified candidates and for seekers to find jobs.
- A candidate can create a account describing his overall experience.
- On Signup page candidate can add his experience and offer letters get a GW verified label.
- Employers has the option to mark GW verified only so only verified candidates can apply.
- A non GW verified candidate can only apply for jobs with does not require GW verification.
- Applied jobs can be viewed on Applied jobs page.
- User has to be authorized to apply job or view applied jobs page.
- jwt authentication is used for authorizing api requests.

## Prerequisites 

- Node must be installed
- MongoDB must be running

## Installing

**1. Create a .env file and insert the following code. Replace values with yours!**

```bash
MONGODB_URI=<value>
JWT_KEY=<value>
```
**2. Run**

` npm start`

` cd client && npm install && npm start `

## Technical 

- This is a MERN stack application with 'mongoose' as Object modeling tool.
- It is build on React version 17.0.1
- Functional components are used along with react hooks
- Redux is used for state management.

## Other 3rd party dependencies
Frontend -
- axios, react-bootstrap, react-datepicker, validator

Backend -
- bcryptjs, jsonwebtoken, validator, mongoose, dotenv

## Deployment

This application is deployed on heroku with database on mongoDB atlas.

***Please find below link to the application -***

[https://goodworker.herokuapp.com/](https://goodworker.herokuapp.com/)

## About Me

#### LinkedIn Profile -
[LinkedIn (Madhur Bansal)](https://www.linkedin.com/in/madhur-bansal-b4b694117/)
