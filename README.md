## Difference to monolith application

A monolith contains all of the business logic to implement all the feature of the application
A single micro service contains all the business logic to implement on feature of the application

## Why Database per service pattern

- Make each services run independently this increase the uptime of application for example if service A goes does down the other portions of application just can continue working
- Data schema can be different between to services
- Services use different technologies and eventually their implementation is different for example SQL in on service and no-SQL in another one

## Communicating between services

There is two major approach in order to two services to communicate with each other:

- Sync communication
  The most outlined downside of this approach is caused because of gigantic dependency network that will created between services and is the fact of breaking whole flow if one of the dependency break

- Asynchronous communication

  - Event based
    The Idea of event based asynchronous communication is to implementing some sort of event bus as a central place that every services can connect to and listen to different events that emitted or emit events, We have dependency web problem in this approach as well
  - Database per service + Event based
    In a quick nutshell this approach this approach working like this:

    1. Whenever one of the services receive a request, That service performers related actions in order to response to that request for example storing some data in database then, **If it was needed**, the service will emit an event corresponding to the request
    2. Other services listening to that events, And if they suppose to care about that particular event! Grab information from event and apply changes, For example store the information inside the database

    This kinda approach commonly needs more dataStores, Cause data duplication and is harder to understand and implement

## Sundry

### .dockerignore https://codefresh.io/docker-tutorial/not-ignore-dockerignore-2/

Helps to define the build context:

.dockerignore
```
# ignore .git and .cache folders
.git
.cache

# ignore all *.class files in all folders, including build root
**/*.class

# ignore all markdown files (md) beside all README*.md other than README-secret.md
*.md
!README*.md
README-secret.md
```
