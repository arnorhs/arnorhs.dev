import { build } from './build'

const DEBUG = !!process.env.DEBUG

const [dest] = process.argv.slice(2)

if (!dest) {
  throw new Error('Please provide a destination directory as the first argument')
}

build(DEBUG, dest).then(() => {
  console.log('done')
})
