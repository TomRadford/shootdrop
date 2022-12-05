<h1 align="center">✨ ShootDrop 🎥</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-0.1.0-blue.svg?cacheSeconds=2592000" />
  <a href="https://github.com/TomRadford/shootdrop/graphs/commit-activity" target="_blank">
    <img alt="Maintenance" src="https://img.shields.io/badge/Maintained%3F-yes-green.svg" />
  </a>
  <a href="https://github.com/TomRadford/shootdrop/blob/master/LICENSE" target="_blank">
    <img alt="License: GPL--3.0--only" src="https://img.shields.io/github/license/TomRadford/shootdrop" />
  </a>
</p>

<h1 align="center">Shoot asset list creation made easy 🎥💡🎤🎬</h1>
<p align="center">A tool to generate and share resource lists for film and television productions quickly.
</p>

<div align="center">
  <img width="500px" src="https://user-images.githubusercontent.com/7515754/205615840-60304e74-5f62-465a-a5d3-31cdefc75fc2.png" />
  <img width="440px" src="https://user-images.githubusercontent.com/7515754/205616635-87b0f23f-fb20-4478-8e8b-6f7f122b7fd0.png"/>
 </div>

<h2 align="center"> ✨Register to try it out at <a href="https://shootdrop.com/register">shootdrop.com</a></h2>

## What is this?

During pre-production for video/film projects, making gear lists is time-consuming. I created ShootDrop as <strong>a simple, easy-to-use tool to quickly create gear lists</strong>.

## Watch the overview video:

<div align="center">
<iframe width="560" height="315" src="https://www.youtube.com/embed/ou4FlVLowQQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

## Features

### Drops

A drop is tied to a shoot in the real world, it serves as the home for all gear-related info pertaining to the shoot.

- Collaborators can be added here. They can edit any lists attached to the drops they're on.
- The URL is publically sharable for everyone on the production to stay up to date.
- Overview of all list items - giving you an idea of the shoot at a glance.

### Lists

A list is tied to a drop, it consists of Gear Items in a particular category (either camera, lighting, grips or sound).

- Comments and preferences can be added for each list item.
- _Last edited by_ with time and user to keep track of who added what.

![image](https://user-images.githubusercontent.com/7515754/205616939-e35e5320-ddae-4b81-98b2-42730d6308a5.png)

### Gear

- Categories (grips/lighting/camera/sound)
- Tagging for easy filtering. Tags are either generic (eg: cable) or tied to categories (eg: lens or recorder)
- Preferences (eg: Lens Mount or Power Solution)

![image](https://user-images.githubusercontent.com/7515754/205617199-410d19d2-56ad-4f1d-adfb-a96e3ea8e2f9.png)

## Tech

**Web**

- NextJS (React)
- TailwindCSS
- Apollo Client (GraphQL client and state management library)
- Zustand (minimal state management where Apollo reactive variables would be overkill)

**Api**

- NodeJS
- Apollo Server
- MongoDB (with Mongoose ODM)
- AWS S3

## Dev Setup

You can give this a spin on your local machine by installing NodeJS version 16 or higher.

Make sure you setup the following **environment variables**

**Web**

.env.local

    NEXT_PUBLIC_API_URI= your api URI
    NEXT_PUBLIC_RECAPTCHA_SITE_KEY= grab one at https://www.hcaptcha.com/

**API**

.env

    DEV_MONGODB_URI= Spin up a free mongodb at https://www.mongodb.com/cloud/atlas/register
    PORT= any
    SECRET= any
    HCAPTCHASECRET= grab one at https://www.hcaptcha.com/
    SENDGRID_API_KEY= grab one at https://sendgrid.com/free/
    SITE_ADMIN= your email
    DEV_AWS_ACCESS_KEY_ID= Grab one from AWS console
    DEV_AWS_SECRET_ACCESS_KEY= Grab one from AWS console
    DEV_S3_BUCKET= S3 bucket name

**Commands for running the app locally**

In root directory of repo, open terminal.

API

    cd api
    npm install
    npm run dev

WEB

    cd web
    npm install
    npm run dev

## Author

👤 **Tom Radford**

> - Website: tomradford.co.za
> - Github: [@TomRadford](https://github.com/TomRadford)
> - LinkedIn: [@https:\/\/www.linkedin.com\/in\/tom-radford-21699b153\/](https://linkedin.com/in/https://www.linkedin.com/in/tom-radford-21699b153/)

## 🤝 Issues and Feature requests

> Feel free to check the [issues page](https://github.com/TomRadford/shootdrop/issues) to request fixes and new features! Alternatively you can drop me a mail on tom@theradford.com

## 🤝 Contributing

> Drop me a mail tom@theradford.com

## Show your support

Give a ⭐️ if this project helped you!

## 📝 License

Copyright © 2022 [Tom Radford](https://github.com/TomRadford).<br />
This project is [GPL--3.0--only](https://github.com/TomRadford/shootdrop/blob/master/LICENSE) licensed.

---

Thanks for your interest in this project!
