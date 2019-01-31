# puller

[![Build Status](https://travis-ci.com/Ninban/puller.svg?branch=master)](https://travis-ci.com/Ninban/puller)

`puller` will automatically try to create a pull request from upstream to your fork, so you can review and merge it.

#### Why
This project was created out of a particular problem. I needed to use a particular library on a mobile project, however including one of its classes required me to ask a new permission which **I didn't need**. So I forked that project, removed the guilty source and began using it. I can't make a pull request upstream because I'm killing a feature.

What a bad idea! Now I'm locking myself to a potentially out-of-date version of the library. Ok, so maybe other devs will need this "version" of the lib, so let's maintain it by pulling whatever commits happen upstream.

## Configuration
This project was made with the [serverless framework](https://serverless.com/), which makes it easy to deploy.

You will need to fill out the `environment` variables in the `serverless.yml` file.  
Below is an example setup:
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

You may also want to modify the schedule to you own liking. I have made it every 1 hour by default.
```yaml
events:
  - schedule: rate(1 hour)
``` 

## Deployment
```zsh
$ sls deploy
```
Try it!
```zsh
$ sls invoke -f puller -l
```

## Development

### Testing

```bash
npm run test
```
