const path = require('path')
const fs = require('fs')
const prettier = require('prettier')

const aliases = {
  '@': '.',
  '@src': 'src',
  '@views': 'src/views',
  '@components': 'src/components',
  '@models': 'src/models',
  '@plugins': 'src/plugins',
  '@assets': 'src/assets',
  '@utils': 'src/utils',
  '@design': 'src/design/index.sass',
}

module.exports = {
  webpack: {},
  jsconfig: {},
}

for (const alias in aliases) {
  const aliasTo = aliases[alias]
  module.exports.webpack[alias] = resolveSrc(aliasTo)
  module.exports.jsconfig[alias + '/*'] = [aliasTo + '/*']
  module.exports.jsconfig[alias] = aliasTo.includes('/index.')
    ? [aliasTo]
    : [
      aliasTo + '/index.ts',
      // aliasTo + '/index.json',
      aliasTo + '/index.vue',
      aliasTo + '/index.sass',
      // aliasTo + '/index.css',
    ]
}

const jsconfigTemplate = require('./jsconfig.template') || {}
const jsconfigPath = path.resolve(__dirname, 'jsconfig.json')

fs.writeFileSync(
  jsconfigPath,
  prettier.format(
    JSON.stringify({
      ...jsconfigTemplate,
      compilerOptions: {
        ...(jsconfigTemplate.compilerOptions || {}),
        paths: module.exports.jsconfig,
      },
    }),
    {
      parser: 'json',
    }
  ),
  (error) => {
    console.log('Error')
    console.log(error)
    if (error) {
      console.error(
        'Error while creating jsconfig.json from aliases.config.js.'
      )
      throw error
    }
  }
)

function resolveSrc(_path) {
  return path.resolve(__dirname, _path)
}
