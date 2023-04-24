/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
const fs = require('fs')
const path = require('path')
const util = require('util')

const TARGET = process.env.npm_lifecycle_event

const jsonPath = path.resolve(__dirname, 'package.json')

const fileToObj = pathToFile => {
  const rawPacket = fs.readFileSync(pathToFile)
  // @ts-ignore
  const toJS = JSON.parse(rawPacket) // ?

  return toJS
}
if (TARGET === 'preinstall') {
  // Read the file
  fs.open(jsonPath, 'r+', err => {
    let cmd = ''
    let arrDeps = []
    if (err) {
      if (err.code === 'ENOENT') {
        console.error('package.json does not exist')
        console.log('Installation canceled!')
        process.exitCode = 1
      }
      throw err
    } else {
      // Read file as json and extract the peerDependencies list from package.json
      const { devDependencies } = fileToObj(jsonPath)

      // format each dependency as needed
      for (const dep in devDependencies) {
        console.log(dep, devDependencies[dep]) // ?
        const version = devDependencies[dep]
        const editedVersion = version.replace('>=', '') // ?
        arrDeps = [...arrDeps, `${dep}@${editedVersion}`] // ?
      }
    }
    const arrToStr = arrDeps.join(' ') // ?

    // construct the command
    cmd = `
    npm i -D ${arrToStr}
    pnpm i -D ${arrToStr}
    ` // ?

    // Colors the `console.log` output in red
    util.inspect.styles.string = 'red'
    console.log(
      util.formatWithOptions(
        { colors: true },
        '%o',
        'INFO: Run the command below to install all PeerDependencies with your preferred package manager'
      )
    )

    // Colors the `console.log` output in cyan
    util.inspect.styles.string = 'cyan'
    console.log(util.formatWithOptions({ colors: true }, '%o', `${cmd}`))
  })
}
