
# Account Service WAMP Events

## Preamble
We want to provide clients with information about interesting events that take place in the [Account Service](https://github.com/outlawdesigns-io/AccountService) in as close to real-time as possible. This package is built to connect to [Account Service](https://github.com/outlawdesigns-io/AccountService)'s back-end, poll for interesting events, and publish those events to any subscribers.

### Published Events
* `login` -- A user has successfully authenticated against the [Account Service](https://github.com/outlawdesigns-io/AccountService)
* `badpassword` -- A bad password has been used to authenticate a valid user
* `newuser` -- A new user has been registered with the [Account Service](https://github.com/outlawdesigns-io/AccountService)
