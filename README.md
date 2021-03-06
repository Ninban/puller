# puller

[![Build Status](https://travis-ci.com/Ninban/puller.svg?branch=master)](https://travis-ci.com/Ninban/puller) [![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2FNinban%2Fpuller.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2FNinban%2Fpuller?ref=badge_shield)

[![Coverage Status](https://coveralls.io/repos/github/Ninban/puller/badge.svg?branch=coverage)](https://coveralls.io/github/Ninban/puller?branch=coverage) [![Greenkeeper badge](https://badges.greenkeeper.io/Ninban/puller.svg)](https://greenkeeper.io/)
[![Known Vulnerabilities](https://snyk.io//test/github/Ninban/puller/badge.svg?targetFile=package.json)](https://snyk.io//test/github/Ninban/puller?targetFile=package.json)

`puller` will automatically try to create a pull request from upstream to your fork, so you can review and merge it.

#### Why
This project was created out of a particular problem. I needed to use a specific library on a mobile project, however including one of its classes required me to ask a new permission which **I didn't need**. So I forked that library, removed the guilty source and began using it. Unfortunately I can't make a pull request upstream because I'm killing a feature.

What a bad idea! Now I'm locking myself to a potentially out-of-date version of the library. Ok, maybe other devs will need this "version" of the lib, so let's maintain it by pulling whatever commits happen upstream.

## Configuration
This project was made with the [serverless framework](https://serverless.com/), which makes it easy to deploy.

You will need to fill out the environment variables in the `serverless.yml` file.  
While I suggest you use a storage service for your variables like I have done with [AWS's Parameter Store](https://docs.aws.amazon.com/systems-manager/latest/userguide/sysman-paramstore-cli.html) (`ssm`), here is an example setup:
```yaml
environment:
  GITHUB_TOKEN: 'MY_SECRET_GITHUB_TOKEN'
  baseRepoOwner: 'Ninban'
  repoName: 'fork-me'
  baseRepoBranch: 'master'
  headRepoOwner: 'LearnFrontEnd'
  headRepoBranch: 'master'
```
To create a Github token, follow the [documentation](https://help.github.com/articles/creating-a-personal-access-token-for-the-command-line/).

You may also want to modify the schedule to your own liking. I have made it every hour by default.
```yaml
events:
  - schedule: rate(1 hour)
``` 

## Deployment
```bash
sls deploy
```
Try it!
```bash
sls invoke -f puller -l
```

## Development

### Testing

```bash
npm run test
```


## License
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2FNinban%2Fpuller.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2FNinban%2Fpuller?ref=badge_large)