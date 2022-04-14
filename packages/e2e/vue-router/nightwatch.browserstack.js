/**
 * Running tests on remote browsers
 */

const { BS_USER, BS_KEY } = process.env

const nwConf = {
  src_folders: ['__tests__'],
  output_folder: 'reports',
  custom_commands_path: ['../vue-router/node_modules/nightwatch-helpers/commands'],
  custom_assertions_path: ['../vue-router/node_modules/nightwatch-helpers/assertions'],
  // set to true when testing on multiple browsers (-e chrome,firefox) to display tests as they pass instead of waiting for everything to be finished
  live_output: true,

  // this couldn't work at the end, so we used ./browserstack-send-status.js
  // globals_path: resolve(__dirname, './globalModules.js'),

  selenium: {
    start_process: false,
    host: 'hub-cloud.browserstack.com',
    port: 80,
  },

  common_capabilities: {
    'browserstack.user': BS_USER,
    'browserstack.key': BS_KEY,
    name: 'Bstack-[Nightwatch] Vue Router Parallel Test',
    'browserstack.local': true,
    // useful to get visual logs
    // 'browserstack.debug': true,
    // 'browserstack.console': 'verbose',
    // 'browserstack.video': false,
    acceptSslCerts: true,
    resolution: '1024x768',
  },

  test_settings: {
    // default: {},

    chrome: {
      desiredCapabilities: {
        browser: 'chrome',
      },
    },

    chromeQt: {
      desiredCapabilities: {
        browser: 'chrome',
        browser_version: '49.0',
      },
    },

    firefox: {
      desiredCapabilities: {
        browser: 'firefox',
      },
    },

    safari: {
      desiredCapabilities: {
        os: 'OS X',
        os_version: 'Mojave',
        browser: 'Safari',
        browser_version: '12.0',
      },
    },

    safari6: {
      desiredCapabilities: {
        os: 'OS X',
        os_version: 'Lion',
        browser: 'Safari',
        browser_version: '6.0',
      },
    },

    ie: {
      desiredCapabilities: {
        browser: 'internet explorer',
        browser_version: '11',
        // name: 'Bstack-[Nightwatch] Vue Router',
        // 'browserstack.video': true,
      },
    },

    edge_pre_chrome: {
      desiredCapabilities: {
        browser: 'Edge',
        browser_version: '18',
      },
    },

    android44: {
      desiredCapabilities: {
        device: 'Google Nexus 5',
        realMobile: 'true',
        os_version: '4.4',
      },
    },

    ios7: {
      desiredCapabilities: {
        device: 'iPhone 7',
        realMobile: 'true',
        os_version: '10',
      },
    },
  },
}

// Code to copy seleniumhost/port into test settings
for (const setting in nwConf.test_settings) {
  const config = nwConf.test_settings[setting]
  config['selenium_host'] = nwConf.selenium.host
  config['selenium_port'] = nwConf.selenium.port

  // merge common_capabilities
  for (const key in nwConf.common_capabilities) {
    // fallback to common_capabilities
    config['desiredCapabilities'][key] =
      config['desiredCapabilities'][key] || nwConf.common_capabilities[key]
  }
}

module.exports = nwConf
