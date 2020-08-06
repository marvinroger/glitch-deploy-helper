import { promisify } from 'util'
import * as fs from 'fs'
import simpleGit from 'simple-git'

const git = simpleGit();
const writeFile = promisify(fs.writeFile)

const IS_GLITCH = process.env.GLITCH_SHARED_INCLUDES_LEGACY_CLS === 'true' && process.env.ENVIRONMENT === 'production'

/**
 * Initialize the environment to allow deployment
 * from a Git push. It does two things:
 *
 * * It sets the `receive.denyCurrentBranch` Git config to `updateInstead`
 * * It creates a Git `post-receive` hook that calls `refresh`
 *
 * *Note: None of these actions are ran if the environment is not Glitch*
 */
export async function init() {
  if (!IS_GLITCH) {
    return
  }

  await git.addConfig('receive.denyCurrentBranch', 'updateInstead')
  await writeFile('.git/hooks/post-receive', '/usr/bin/refresh', { mode: 0o755 })
}
