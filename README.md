# [Marvel-Verse](https://marvel-verse-six.vercel.app/)

## Table of Contents

- [Introduction](#introduction)
- [Setup](#setup)

---

### Introduction

Marvel-Verse is a web application that provides details about Marvel shows. It was supposed to use the TMDB API to fetch data but due to some restrictions in India, I fetched once (VPN) and saved the response to this [`file`](./src/data/marvel_movies.json), cleaned the data and exported it from [`MarvelMovies.js`](./src/data/MarvelMovies.js).

---

### Setup

To run this project locally, follow these steps:

1. Clone the repository:

    ```bash
    git clone https://github.com/nandhu-44/marvel-verse.git
    ```

2. Navigate to the project directory:

    ```bash
    cd marvel-verse
    ```

3. Setup Environment Variables into a `.env` file:

    ```bash
    cp .env.example .env
    ```

4. Install the dependencies:

    ```bash
    npm install
    ```

5. Start the development server:

    ```bash
    npm start
    ```

6. Open your browser and go to [`localhost:3000`](http://localhost:3000)
