# PryxAPI

PryxAPI is a powerful and flexible HTTP client for Node.js, designed to simplify API requests with advanced features such as authentication, caching, retry mechanisms, and more.

  <div align="center">
  <p>
    <a href="https://github.com/matteotorna/pryxapi/releases/latest">
  <img src="https://img.shields.io/github/v/release/matteotorna/r6-info.js?style=for-the-badge" alt="GitHub release (latest SemVer)" /></a>
    <a href="https://github.com/matteotorna/r6-info.js/releases/latest">
    <img src="https://img.shields.io/github/release-date/matteotorna/r6-info.js?label=latest%20release&style=for-the-badge" alt="Latest release" /></a>
   <a href="https://www.npmjs.com/package/r6-info.js"><img src="https://img.shields.io/npm/v/r6-info.js.svg?logo=npm&style=for-the-badge" alt="npm version" /></a>
    <a href="https://www.npmjs.com/package/r6-info.js"><img src="https://img.shields.io/npm/dt/r6-info.js.svg?style=for-the-badge" alt="NPM downloads" /></a>
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