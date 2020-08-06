# Glitch deploy helper

This is a simple Node.js library meant to be ran on Glitch.

It does two things:

* It sets the `receive.denyCurrentBranch` Git config to `updateInstead`
* It creates a Git `post-receive` hook that calls `refresh`

*Note: None of these actions are ran if the environment is not Glitch*

## Installation

```bash
npm install --save glitch-deploy-helper
```

## Usage

```js
const { init } = require('glitch-deploy-helper')

async function main() {
  await init()
}

main()
```

Now, just push to the Glitch Git repo of your project, and your project will automatically restart.
