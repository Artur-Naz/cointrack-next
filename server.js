// eslint-disable-next-line @typescript-eslint/no-var-requires
const cli = require('next/dist/cli/next-start')
const { loadEnvConfig } = require('@next/env')

const dev = process.argv[2] === 'dev'
loadEnvConfig('./', dev)

cli.nextStart(['-p', process.env.PORT || 3000])
