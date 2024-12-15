# PryxAPI

PryxAPI is a powerful and flexible HTTP client for Node.js, designed to simplify API requests with advanced features such as authentication, caching, retry mechanisms, and more.

  <div align="center">
  <p>
    <a href="https://github.com/mazeor7/pryxapi/releases/latest">
  <img src="https://img.shields.io/github/v/release/mazeor7/pryxapi?style=for-the-badge" alt="GitHub release (latest SemVer)" /></a>
    <a href="https://github.com/mazeor7/pryxapi/releases/latest">
    <img src="https://img.shields.io/github/release-date/mazeor7/pryxapi?label=latest%20release&style=for-the-badge" alt="Latest release" /></a>
   <a href="https://www.npmjs.com/package/pryxapi"><img src="https://img.shields.io/npm/v/pryxapi.svg?logo=npm&style=for-the-badge" alt="npm version" /></a>
    <a href="https://www.npmjs.com/package/pryxapi"><img src="https://img.shields.io/npm/dt/pryxapi.svg?style=for-the-badge" alt="NPM downloads" /></a>
  </p>
</div>

## Table of Contents

1. [Installation](#installation)
2. [Basic Usage](#basic-usage)
3. [API](#api)
   - [GET](#get)
   - [POST](#post)
   - [PUT](#put)
   - [DELETE](#delete)
   - [PATCH](#patch)
   - [HEAD](#head)
   - [OPTIONS](#options)
   - [Multiple Requests](#multiple-requests)
4. [Authentication](#authentication)
   - [Basic Auth](#basic-auth)
   - [Bearer Auth](#bearer-auth)
   - [Custom Auth](#custom-auth)
5. [Caching](#caching)
6. [Retry](#retry)
7. [Interceptors](#interceptors)
8. [Logging](#logging)
9. [Rate Limiting](#rate-limiting)
10. [Validation](#validation)
11. [Compression](#compression)
12. [Utilities](#utilities)
13. [Advanced Configuration](#advanced-configuration)
14. [Error Handling](#error-handling)
15. [Complete Examples](#complete-examples)
16. [Contributing](#contributing)
17. [License](#license)

## Installation

To install PryxAPI, run the following command in your project directory:

```bash
npm install pryxapi
```

## Basic Usage

Here's a simple example of how to use PryxAPI to make a GET request:

```javascript
const { api } = require('pryxapi');

api.get('https://api.example.com/data')
  .then(response => console.log(response.data))
  .catch(error => console.error(error));
  ```

  This code snippet demonstrates the basic usage of PryxAPI. It imports the `api` object from the package and uses its `get` method to make a GET request to the specified URL. The response data is then logged to the console, or any errors are caught and logged.

### API

## GET

Perform a GET request to retrieve data from a specified endpoint.

```javascript
const { api } = require('pryxapi');

api.get('https://api.example.com/users', {
  headers: { 'Accept': 'application/json' },
  params: { page: 1, limit: 10 },
  options: { timeout: 5000 }
})
.then(response => {
  console.log('Status:', response.status);
  console.log('Headers:', response.headers);
  console.log('Data:', response.data);
})
.catch(error => {
  console.error('Error:', error.message);
});
```

In this example:

We're making a GET request to retrieve a list of users.
We set the `Accept` header to specify we want JSON data.
We're passing query parameters to paginate the results (page 1 with 10 items per page).
We set a timeout of 5 seconds for the request.
The response object includes the status code, headers, and the actual data.
Any errors are caught and logged.

## POST

Send data to create a new resource using a POST request.

```javascript
const { api } = require('pryxapi');

api.post('https://api.example.com/users', 
  { headers: { 'Content-Type': 'application/json' } },
  { },  // params
  { name: 'John Doe', email: 'john@example.com' },  // data
  { timeout: 5000 }  // options
)
.then(response => {
  console.log('New user created:', response.data);
})
.catch(error => {
  console.error('Error creating user:', error.message);
});
```

This example demonstrates:

Creating a new user by sending a POST request.
Setting the `Content-Type` header to indicate we're sending JSON data.
Sending user data in the request body.
Setting a 5-second timeout for the request.
Logging the newly created user data from the response.
Catching and logging any errors that occur during the request.

## PUT

Update an existing resource using a PUT request

```javascript
const { api } = require('pryxapi');

api.put('https://api.example.com/users/1', 
  { headers: { 'Content-Type': 'application/json' } },
  { },  // params
  { name: 'Jane Doe', email: 'jane@example.com' },  // data
  { timeout: 5000 }  // options
)
.then(response => {
  console.log('User updated:', response.data);
})
.catch(error => {
  console.error('Error updating user:', error.message);
});
```

In this example:

We're updating the user with ID 1.
The `Content-Type` header is set to JSON.
The updated user data is sent in the request body.
A 5-second timeout is set for the request.
The response with the updated user data is logged.
Any errors during the update process are caught and logged.

## DELETE

Remove a resource using a DELETE request.

```javascript
const { api } = require('pryxapi');

api.delete('https://api.example.com/users/1', 
  { headers: { 'Authorization': 'Bearer token123' } },
  { },  // params
  { timeout: 5000 }  // options
)
.then(response => {
  console.log('User deleted:', response.status === 204);
})
.catch(error => {
  console.error('Error deleting user:', error.message);
});
```

In this example:

This example shows:

Deleting a user with ID 1.
Using Bearer token authentication.
Setting a 5-second timeout for the request.
Checking if the deletion was successful (status code 204).
Handling any errors that occur during the deletion process

## PATCH

Partially update a resource using a PATCH request.

```javascript
const { api } = require('pryxapi');

api.patch('https://api.example.com/users/1', 
  { headers: { 'Content-Type': 'application/json' } },
  { },  // params
  { email: 'newemail@example.com' },  // data
  { timeout: 5000 }  // options
)
.then(response => {
  console.log('User partially updated:', response.data);
})
.catch(error => {
  console.error('Error updating user:', error.message);
});
```

This example demonstrates:

Partially updating a user's information (only the email in this case).
Setting the `Content-Type` header to JSON.
Sending only the fields to be updated in the request body.
Setting a 5-second timeout for the request.
Logging the updated user data from the response.
Handling any errors that occur during the update process.

## HEAD

Retrieve headers information using a HEAD request.

```javascript
const { api } = require('pryxapi');

api.head('https://api.example.com/users', 
  { headers: { 'Accept': 'application/json' } },
  { page: 1, limit: 10 },  // params
  { timeout: 5000 }  // options
)
.then(response => {
  console.log('Headers:', response.headers);
  console.log('Status:', response.status);
})
.catch(error => {
  console.error('Error:', error.message);
});
```

In this example:

We're making a HEAD request to get information about the users endpoint.
The `Accept` header is set to JSON.
Query parameters for pagination are included.
A 5-second timeout is set for the request.
The response headers and status are logged.
Any errors are caught and logged.

## OPTIONS

Retrieve information about the communication options available for the target resource.

```javascript
const { api } = require('pryxapi');

api.options('https://api.example.com/users', 
  { headers: { 'Accept': 'application/json' } },
  { },  // params
  { timeout: 5000 }  // options
)
.then(response => {
  console.log('Allowed methods:', response.headers['allow']);
  console.log('CORS headers:', response.headers['access-control-allow-methods']);
})
.catch(error => {
  console.error('Error:', error.message);
});
```

This example shows:

Making an OPTIONS request to the users endpoint.
Setting the `Accept` header to JSON.
Setting a 5-second timeout for the request.
Logging the allowed HTTP methods and CORS headers from the response.
Handling any errors that occur during the request.

## Multiple Requests

Perform multiple requests concurrently or in series.

```javascript
const { api } = require('pryxapi');

// Parallel requests
api.all([
  { method: 'get', endpoint: 'https://api.example.com/users' },
  { method: 'get', endpoint: 'https://api.example.com/posts' }
])
.then(responses => {
  console.log('Users:', responses[0].data);
  console.log('Posts:', responses[1].data);
})
.catch(error => {
  console.error('Error:', error.message);
});

// Serial requests
api.series([
  { method: 'post', endpoint: 'https://api.example.com/users', data: { name: 'John' } },
  { method: 'get', endpoint: 'https://api.example.com/users' }
])
.then(responses => {
  console.log('New user:', responses[0].data);
  console.log('All users:', responses[1].data);
})
.catch(error => {
  console.error('Error:', error.message);
});
```

This example demonstrates:

Making parallel requests to fetch users and posts simultaneously.
Making serial requests to first create a user and then fetch all users.
Handling the responses from multiple requests.
Catching and logging any errors that occur during the requests.

## Authentication

PryxAPI supports various authentication methods.

## Basic Auth

```javascript
const { api, auth } = require('pryxapi');

const basicAuthConfig = auth.basicAuth('username', 'password');

api.get('https://api.example.com/protected', 
  { headers: basicAuthConfig({}) },
  { },  // params
  { timeout: 5000 }  // options
)
.then(response => {
  console.log('Protected data:', response.data);
})
.catch(error => {
  console.error('Authentication error:', error.message);
});
```

This example shows:

Creating a basic authentication configuration.
Applying the basic auth to a GET request.
Accessing protected data using basic authentication.
Handling authentication errors.

## Bearer Auth

```javascript
const { api, auth } = require('pryxapi');

const bearerAuthConfig = auth.bearerAuth('your-token');

api.get('https://api.example.com/protected', 
  { headers: bearerAuthConfig({}) },
  { },  // params
  { timeout: 5000 }  // options
)
.then(response => {
  console.log('Protected data:', response.data);
})
.catch(error => {
  console.error('Authentication error:', error.message);
});
```

This example demonstrates:

Creating a bearer token authentication configuration.
Applying bearer auth to a GET request.
Accessing protected data using bearer token authentication.
Handling authentication errors.

## Custom Auth

```javascript
const { api, auth } = require('pryxapi');

const customAuthConfig = auth.customAuth((config) => {
  config.headers['X-Custom-Auth'] = 'custom-token';
  return config;
});

api.get('https://api.example.com/protected', 
  { headers: customAuthConfig({}) },
  { },  // params
  { timeout: 5000 }  // options
)
.then(response => {
  console.log('Protected data:', response.data);
})
.catch(error => {
  console.error('Authentication error:', error.message);
});
```

This example shows:

Creating a custom authentication configuration.
Applying custom auth to a GET request by adding a custom header.
Accessing protected data using custom authentication.
Handling authentication errors.

## Caching

PryxAPI offers caching functionality to optimize performance.

```javascript
const { api, cache } = require('pryxapi');

const cacheKey = 'users-list';

cache.cacheRequest(cacheKey, () => {
  return api.get('https://api.example.com/users');
}, 600)  // Cache for 600 seconds
.then(response => {
  console.log('Users (possibly from cache):', response.data);
})
.catch(error => {
  console.error('Error:', error.message);
});

// Clear specific cache
cache.clearCache(cacheKey);

// Clear all cache
cache.clearCache();
```

This example demonstrates:

Caching the result of a GET request for users.
Setting a cache duration of 600 seconds (10 minutes).
Retrieving data from cache if available, or making a new request if not.
Clearing a specific cache entry.
Clearing all cached data.

## Retry

Implement retry logic to handle temporary errors.

```javascript
const { api, retry } = require('pryxapi');

retry(() => api.get('https://api.example.com/unreliable-endpoint'), 3, 1000, 2)
  .then(response => {
    console.log('Successful after retry:', response.data);
  })
  .catch(error => {
    console.error('Failed after retries:', error.message);
  });
```

This example shows:

Retrying a GET request to an unreliable endpoint.
Setting a maximum of 3 retries.
Starting with a 1-second delay between retries.
Doubling the delay with each retry (exponential backoff).
Handling the response after a successful retry.
Catching and logging errors if all retries fail.

## Interceptors

Add interceptors to modify requests or responses.

```javascript
const { api, interceptors } = require('pryxapi');

interceptors.addInterceptor(config => {
  config.headers['X-Custom-Header'] = 'CustomValue';
  return config;
});

api.get('https://api.example.com/data')
  .then(response => {
    console.log('Response with custom header:', response.data);
  })
  .catch(error => {
    console.error('Error:', error.message);
  });
```

This example demonstrates:

Adding an interceptor to modify request configurations.
Adding a custom header to all requests.
Making a GET request with the interceptor applied.
Handling the response and any potential errors.

## Validation

Implement request validation to ensure data integrity.

```javascript
const { api, validation } = require('pryxapi');

const schema = {
  headers: {
    'Content-Type': { required: true, enum: ['application/json'] }
  },
  data: {
    name: { required: true, type: 'string', minLength: 3 },
    email: { required: true, type: 'string', pattern: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/ }
  }
};

api.post('https://api.example.com/users',
  { headers: { 'Content-Type': 'application/json' } },
  { },  // params
  { name: 'John Doe', email: 'john@example.com' },
  { validationSchema: schema }
)
.then(response => {
  console.log('User created:', response.data);
})
.catch(error => {
  console.error('Validation error:', error.message);
});
```

This example demonstrates:

Defining a validation schema for headers and request data.
Applying the schema to a POST request.
Validating that the Content-Type header is set to 'application/json'.
Ensuring the 'name' field is a string with at least 3 characters.
Validating the 'email' field against a regular expression pattern.
Handling successful creation of a user after validation.
Catching and logging any validation errors.

## Compression

PryxAPI automatically handles decompression of compressed responses.

```javascript
const { api } = require('pryxapi');

api.get('https://api.example.com/large-data')
  .then(response => {
    // Response is automatically decompressed if necessary
    console.log('Decompressed data:', response.data);
  })
  .catch(error => {
    console.error('Error:', error.message);
  });
```

This example shows:

Making a GET request to an endpoint that might return compressed data.
Automatic decompression of the response if it's compressed (e.g., gzip).
Logging the decompressed data.
Handling any errors that occur during the request or decompression.

## Utilities

PryxAPI provides several utility functions for common operations.

```javascript
const { utils } = require('pryxapi');

// Calculate MD5 hash
console.log('MD5 hash:', utils.calculateMD5('Hello, world!'));

// Safe JSON parsing
console.log('Parsed JSON:', utils.parseJSON('{"key": "value"}'));

// Generate UUID
console.log('UUID:', utils.generateUUID());

// Validate URL
console.log('Is valid URL:', utils.validateURL('https://example.com'));
```

This example demonstrates:

Calculating an MD5 hash of a string.
Safely parsing JSON data without throwing exceptions.
Generating a UUID (Universally Unique Identifier).
Validating a URL string.


## Advanced Configuration

You can configure PryxAPI with advanced options to customize its behavior

```javascript
const { api } = require('pryxapi');

api.get('https://api.example.com/data', {
  headers: { 'Accept': 'application/json' },
  params: { limit: 10 },
  options: {
    timeout: 10000,
    validateStatus: function (status) {
      return status >= 200 && status < 300; // Consider only 2xx status as success
    },
    maxRedirects: 5
  }
})
.then(response => {
  console.log('Data:', response.data);
})
.catch(error => {
  console.error('Error:', error.message);
});
```

This example shows:

Setting custom headers for the request.
Adding query parameters to the request.
Configuring a custom timeout of 10 seconds.
Defining a custom status validation function.
Setting a maximum number of redirects to follow.


## Contributing

We welcome contributions to PryxAPI!
