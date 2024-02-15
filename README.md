# Hotelinventoryapp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.0.1.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
"\_comment": "the proxy.config.json file is used when you want to make an request to the server it is like using cross origin in frontend so whenever a request is made from frontend that req goes through proxy server and proxy server passes the request to the backend if you have use cors in thee backend then no need to setup proxy.config.json file here",
// // rxjs operators
why we need rxjs operators
rxjs gives you stream of data and that stream of data cannot be modified
how to modify these data this is where this operators comes handy
share replay can help you to cache the request so you dont have to make a call again
it is very useful when you have master data which you dont need to download again and again
// // // working of async pipe
When the template is rendered, Angular evaluates the rooms$ | async expression.
The async pipe subscribes to the rooms$ observable.
When the observable emits a new value (such as an array of rooms), the async pipe receives the emitted value and updates the template with the new data.
If the component is destroyed (e.g., the user navigates away from the component), the async pipe automatically unsubscribes from the rooms$ observable to prevent memory leaks.
// // // // CatchError
Here's a breakdown of how catchError works:

Error Handling:

When applied to an observable stream, catchError intercepts any errors that occur during the emission of data.
Error Recovery:

It allows you to handle these errors gracefully, providing a mechanism for error recovery.
You can specify a callback function that defines what action to take when an error occurs.
Fallback Mechanism:

catchError typically provides a fallback mechanism, allowing you to return a default value, emit an alternative observable, or perform any other necessary actions to recover from the error.
Preventing Observable Termination:

Importantly, catchError prevents the observable stream from terminating due to an error.
Instead of letting the error propagate and stop the observable, catchError allows the stream to continue emitting values after handling the error.
In summary, catchError is a crucial tool for error handling in RxJS. It ensures that your application can gracefully recover from errors that occur in observable streams, enabling you to provide a robust and resilient user experience.
// /// //// ////
subjects
Bi-directional Communication: A Subject allows both emitting values (like error messages) and subscribing to those values. This makes it suitable for handling error messages where different parts of your application need to both produce and consume error messages.

Hot Observable: A Subject is a hot Observable, meaning it can start emitting values even before a subscription is made. This can be useful for error messages that might occur at any time and need to be immediately displayed.

Easier Integration: Since a Subject implements both the Observable and Observer interfaces, it's easier to integrate into both the producer and consumer sides of your code. This can simplify the codebase, as you only need to deal with one type for emitting and handling errors.

Flexibility: Subject provides flexibility in how error messages are handled. You can emit error messages with additional metadata, transform them, or filter them based on certain conditions before they are consumed by subscribers.

Concurrency: Subject handles concurrency concerns internally, ensuring that all subscribers receive the emitted error messages appropriately, regardless of when they subscribe.
// /// /// // when to use the subject
Yes, if you're using a regular Subject as a simple Observable and emitting values before any subscribers have subscribed to it, those emitted values would effectively be lost. This scenario might not be ideal if you want to ensure that all emitted values are captured by subscribers.

To prevent potential loss of emitted values, you might consider using alternative approaches such as:

Using a BehaviorSubject: This type of Subject retains the latest value and emits it to any new subscribers. So, if you want to ensure that new subscribers receive the latest value even if it was emitted before their subscription, you can use a BehaviorSubject.

Initializing state elsewhere: Rather than relying on a Subject to emit values independently, you could initialize and manage the state elsewhere in your application. Then, use Subjects to reactively emit updates to that state as needed.

Using other types of Subjects: Depending on your specific use case, you might find that other types of Subjects like ReplaySubject or AsyncSubject better suit your needs. These subjects have different behaviors regarding the retention and emission of values.

Ultimately, the choice depends on your specific requirements and the behavior you want from your observable stream.
/// /// /// // SHARE REPLAY IMP POINTS
ShareReplay ensures that all new subscribers receive the same initial set of cached data.
If new data is emitted by the Observable, it replaces the cached old data for new subscribers who subscribe after the new data emission.
Existing subscribers who have already received the initial data will not receive the updated data. They will only receive the initial cached data.
// HTTTP INTERCEPTORS
In Angular, HTTP interceptors are a powerful tool used to intercept HTTP requests and responses. They provide a way to intercept and modify HTTP requests or responses globally before they are sent to the server or received by the application.

Imagine you have an Angular application that communicates with a backend server to fetch data. Now, let's say you want to perform some common tasks for every HTTP request or response, such as adding authentication headers, logging requests, handling errors globally, or even modifying the request/response payload.

Here's a simple breakdown of why HTTP interceptors are useful:

Centralized Logic: With interceptors, you can centralize common functionalities related to HTTP requests or responses in one place. This helps in maintaining a clean and organized codebase.

Code Reusability: Interceptors allow you to reuse code across multiple HTTP requests or responses. Instead of duplicating code in every service where HTTP calls are made, you can encapsulate the logic in an interceptor and reuse it wherever needed.

Consistent Behavior: Interceptors ensure consistent behavior across your application. For example, if you need to add authorization headers to every request, interceptors can handle this automatically without needing to modify each individual request.
// /// /// HTTTP INTERCEPTORS INTERCEPTORS
When you make an HTTP request using Angular's HttpClient service, the request passes through the HttpClient service before being sent to the server. Here's a brief overview of the process:

Request Preparation: You create an HTTP request object using methods provided by the HttpClient service (get, post, put, delete, etc.). This request object contains information such as the URL, HTTP method, headers, request body, etc.

Interception: If you have any interceptors registered with Angular's HttpClient module, the request passes through these interceptors. Each interceptor's intercept method is called in the order they were registered. Interceptors have the ability to inspect and potentially modify the request before it is sent to the server.

Sending the Request: After passing through any registered interceptors, the HTTP request is sent to the server using the underlying browser APIs (such as XMLHttpRequest or Fetch API).

Receiving the Response: Once the server responds to the request, the response is received by Angular's HttpClient service.

Interception of Response: Similar to request interception, if you have any interceptors registered, the response passes through these interceptors in the reverse order. Each interceptor's intercept method is called, allowing them to inspect and potentially modify the response before it is passed back to your application code.

Handling the Response: Finally, the modified response (if any) is returned to the caller of the HTTP request in your Angular application.
