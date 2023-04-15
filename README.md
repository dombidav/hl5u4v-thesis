<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Thanks again! Now go create something AMAZING! :D
-->

<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Build](https://github.com/dombidav/hl5u4v-thesis/actions/workflows/laravel.yml/badge.svg?branch=master)](https://github.com/dombidav/hl5u4v-thesis/actions/workflows/laravel.yml)

<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/dombidav/hl5u4v-thesis">
    <img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" alt="Logo" width="800" height="200">
  </a>

<h3 align="center">Webservice for Managed Access Control Systems</h3>

  <p align="center">
    Dombi Tibor Dávid Thesis Work <br />
    Eszterházy Károly University, Hungary
    <br />
    <a href="https://github.com/dombidav/hl5u4v-thesis/wiki"><strong>Explore the docs »</strong></a>
    <br />
    <br />

[comment]: <> ( <a href="https://github.com/dombidav/hl5u4v-thesis">View Demo</a>)

[comment]: <> ( ·)

[comment]: <> ( <a href="https://github.com/dombidav/hl5u4v-thesis/issues">Report Bug</a>)

[comment]: <> ( ·)

[comment]: <> ( <a href="https://github.com/dombidav/hl5u4v-thesis/issues">Request Feature</a>)

  </p>

<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary><h2 style="display: inline-block">Table of Contents</h2></summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#license">License</a></li>
    <li><a href="#acknowledgements">Acknowledgements</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

This project is a base for a managed access control system webservice

### Built With

- [Laravel](https://github.com/laravel/laravel)
- [Fortify](https://github.com/laravel/fortify)
- [Angular](https://github.com/vuejs/vue)

<!-- GETTING STARTED -->

## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites
#### With Docker
- Docker
- Node.js 14.0 or newer
- Yarn 1.x

#### Without Docker
**Frontend:**
- @angular/cli 13.x
- Node.js 14.0 or newer
- Yarn 1.x


**Backend:**
- PHP 8.1 or newer (this repository is PHP 8 compatible)
- [Composer](https://getcomposer.org/)
- Database of your choice (MySQL, SQLite)
- Optional: [XDebug](https://xdebug.org/wizard) for testing

### Installation

#### **With Wizard**

1. Clone the repo
   ```sh
   git clone https://github.com/dombidav/hl5u4v-thesis.git
   ```
2. Install the dependencies
   ```sh
   yarn
   ```
3. Run the wizard
   ```sh
    yarn wizard
   ```
4. Configure the project guided by the wizard
5. Start the development server
   ```sh
   yarn serve
   ```

#### **Manualy**

1. Clone the repo
   ```sh
   git clone https://github.com/dombidav/hl5u4v-thesis.git
   ```
2. Install the dependencies
   ```sh
    yarn
    ```
3. **Set up webservice**
  - Change directory to webservice
      ```sh
      cd webservice
      ```
  - Install the dependencies
      ```sh
      cd webservice
      composer install
      ```
  - Set up the environment
      ```sh
      cp .env.example .env
      ```
      Edit the .env file to match your database configuration
  - Generate the application key
      ```sh
      php artisan key:generate
      ```
  - Start the database of your choice
  - Create a database for the project as specified in the .env file
  - Migrate the database
    ```sh
    php artisan migrate:fresh --seed
    ```
  - Start the development server
    ```sh
    php artisan serve
    ```
4. **Set up the admin panel**
  - Change directory to admin
      ```sh
      cd admin
      ```
  - Install the dependencies
      ```sh
      yarn
      ```
  - Create configuration file at `src/environments/environment.ts` with the following content:
      ```ts
      export const environment = {
        production: false,
        APP_URL: 'http://localhost:8000', // URL of the webservice
      };
      ```
      Change the `APP_URL` to match the URL of the webservice
  - Start the development server
      ```sh
      ng serve
      ```
   
<!-- LICENSE -->

## License

Distributed under the MIT License. See [`LICENSE`](https://raw.githubusercontent.com/dombidav/hl5u4v-thesis/master/LICENSE.md) for more information.

<!-- CONTACT -->

Project Link: [https://github.com/dombidav/hl5u4v-thesis](https://github.com/dombidav/hl5u4v-thesis)
