# Check my nenu

As a result of the COVID-19 pandemic, a great deal of modernisation has come about in all sectors. Telework, contactless, everything has had to adapt to the new technology stream and restaurants are no exception.

Check my menu is an open source project that aims to encourage the use of digital menus in restaurants. Thanks to its web application, the restaurant will be able to create its digital menu and I will get a QR to promote it in its sites. 

Check my menu is presented as a free alternative where restaurant customers will be able to check the menu and restaurants themselves will be able to keep it updated by accessing their private area.

## Demo

You can see a demo of the project in the following link: [Check my menu](https://check-my-menu.vercel.app/)

## Apps and Packages

- `backend`: a [Express.js](https://expressjs.com/) app with hexagonal architecture
- `web`: a [Next.js](https://nextjs.org) app with private and public routes
- `eslint-config-custom`: `eslint` configurations
- `tsconfig`: `tsconfig.json`s used throughout the monorepo

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

## Try it in local

### Prerequisites

- [Node.js](https://nodejs.org/es/) >= 16.0.0 installed
- [Docker Compose](https://docs.docker.com/compose/) running and ready to create new container
- Environment variables configured
- Install dependencies

**Configure environment variables**: You will find 2 sample `.env.example` files in each of the apps `backend` & `web`.  If you want to run the project in your local machine, you must create a copy with the name `.env`, the content of each file doesn't have to be modified.

To **install all dependencies**, run the following command:

```properties
npm install
```

### Development

To develop all apps and packages, run the following command:

```properties
npm run dev
```

The `web` application will be running on port [3000](http://localhost:3000/), the `backend` application on port [8080](http://localhost:8080/) and the PostgreSQL `database` on port [54320](http://localhost:54320/check-my-menu). With this command, the code has a hot reload, if you make any changes to the code it will be automatically reflected.

### Production

To start all apps and packages, run the following command:

```properties
npm run start
```

All applications will run on the same port as in development mode, but with this command, all applications will compile and serve without hot reloading. This is the way to simulate a production mode.

## Author
Javier Linares - [@javierscode](https://github.com/javierscode)

## License
This project is licensed under the GNU General Public License v3.0 - see the [LICENSE](LICENSE) file for details