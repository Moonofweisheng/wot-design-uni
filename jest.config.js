/*
 * @Author: weisheng
 * @Date: 2025-03-24 12:33:15
 * @LastEditTime: 2025-03-26 13:29:54
 * @LastEditors: weisheng
 * @Description:
 * @FilePath: /wot-design-uni/jest.config.js
 * 记得注释
 */
module.exports = {
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['ts', 'js', 'json', 'vue'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy'
  },
  transform: {
    '^.+\\.ts$': 'ts-jest',
    '^.+\\.js$': 'babel-jest',
    '^.+\\.vue$': '@vue/vue3-jest'
  },
  testRegex: '(/tests/.*\\.spec)\\.(jsx?|tsx?)$', // 只匹配 .spec 结尾的文件
  testPathIgnorePatterns: ['/node_modules/', '/tests/setup.js', '/tests/__mocks__/'],

  // 添加 modulePathIgnorePatterns 配置，忽略 uni_modules 下的 package.json
  modulePathIgnorePatterns: ['<rootDir>/src/uni_modules/.*', '<rootDir>/src/uni_modules/wot-design-uni/package.json'],

  // 或者使用 watchPathIgnorePatterns
  watchPathIgnorePatterns: ['<rootDir>/src/uni_modules/'],

  // 增加全局超时时间设置
  testTimeout: 10000, // 设置为10秒

  globals: {
    'vue-jest': {
      compilerOptions: {
        isCustomElement: (tag) => tag.startsWith('uni-'),
        whitespace: 'condense',
        delimiters: ['{{', '}}']
      },
      experimentalCoverage: true, // 添加实验性覆盖率支持
      templateCompiler: {
        compiler: require('@vue/compiler-dom'),
        compilerOptions: {
          hoistStatic: false,
          prefixIdentifiers: true
        }
      }
    },
    'ts-jest': {
      diagnostics: false,
      isolatedModules: true,
      babelConfig: true
    }
  },
  transformIgnorePatterns: ['/node_modules/(?!(uni-app|@dcloudio)/)'],
  setupFiles: ['<rootDir>/tests/setup.js']
}
