![](./public/logo.jpg)

> Discuss freely and openly. Find your therapist today. Stay Judgeless!

---

![](https://img.shields.io/badge/Work-In%20Progress-green)


### Motivation
This project was made during the times of the Coronavirus Pandemic which caused several people to not just lose their jobs but lose touch of their friends and had to be homestruck 24x7.
This caused significant depression amidst many, which got us thinking about what are the ways to really overcome this taboo subject.
With research and our personal observations, we think speaking one's heart out is probably the best way to really solve depression.
Sometimes, we just want to share our burden and hope that the person listening would console us and give us wisdom to cope with our situation.
Our application is a platform which makes this possible, and in case things get serious, also has always available therapists in one-click!

### Features

- [x] Login/Signup with Google
- [x] Post anonymously
- [ ] Post with pictures
- [ ] Likes and Comments on Posts
- [ ] Home Post News Feed
- [ ] Therapist Onboarding
- [ ] Chat with Therapists
- [ ] Reporting of therapists
- [ ] User interaction based post recommendation
- [ ] Feed should have atleast 5 positive posts on top
- [ ] End to End Encryption on chats (Needs persistent client)
- [ ] Truly anonymous posts over Tor & without login

### Development

#### Prerequisites

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/) with [V2 Compose Switch](https://docs.docker.com/compose/cli-command/#compose-switch)
- [Firebase Project](https://console.firebase.google.com)
- Bash environment

#### Running Locally

You should add a `.env.local` file in the root folder of this codebase, cloned locally. 
The file should look like the [.env.local.example](./.env.local.example) in the root of this project.
You will need to add in all the variables in this new local file.
Treat this file as secret and never commit it to your code repository. Therefore, it has been gitignored by default.

From Firebase:
- Enable Google Authentication
- Create a Web App and replace API Credentials in `.env.local`
- Create a Firebase Admin Service Account and replace credentials in `.env.local`

Once this has been done, you can perform:

```bash
make services
yarn dev
```

This is going to run the `next` watch server on port 3000 and [http://localhost:3000](http://localhost:3000) should be running Judgeless with your Firebase Credentials!

#### Production Usage

This is currently WIP, docs will be available soon.

### Contributing

Contributions are welcome, we would love to have more hands on this project. Use the general workflow of Forking and Creating a PR.

---

Made with [Next.js](https://nextjs.org/) and Caffeine, by a group of enthusiastic students from [Academy Of Technology](https://aot.edu.in) as a part of their Final Year Project. ☕
