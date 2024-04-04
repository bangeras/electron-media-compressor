const { FusesPlugin } = require('@electron-forge/plugin-fuses');
const { FuseV1Options, FuseVersion } = require('@electron/fuses');
require('dotenv').config();

module.exports = {
  packagerConfig: {
    asar: false //https://github.com/electron/electron/issues/9459
    // asar: {
    //   unpack: "**/node_modules/exec-buffer/**/*"
    // }
  },
  publishers: [
    {
      name: '@electron-forge/publisher-github',
      config: {
        repository: {
          owner: 'bangeras',
          name: 'electron-media-compressor'
        },
        authToken: process.env.GITHUB_TOKEN,
        // prerelease: true
      }
    }
  ],
  rebuildConfig: {},
  makers: [
    { //Windows
      name: '@electron-forge/maker-squirrel',
      config: {},
    },
    { //Darwin(Mac)
      name: '@electron-forge/maker-zip',
      platforms: ['darwin', 'linux'],
    },
    { //Ubuntu
      name: '@electron-forge/maker-deb',
      config: {},
    },
    { //Fedora
      name: '@electron-forge/maker-rpm',
      config: {},
    },
    { //Mac
      name: '@electron-forge/maker-dmg',
      config: {},
    }
  ],
  plugins: [
    {
      name: '@electron-forge/plugin-auto-unpack-natives',
      config: {},
    },
    // Fuses are used to enable/disable various Electron functionality
    // at package time, before code signing the application
    new FusesPlugin({
      version: FuseVersion.V1,
      [FuseV1Options.RunAsNode]: false,
      [FuseV1Options.EnableCookieEncryption]: true,
      [FuseV1Options.EnableNodeOptionsEnvironmentVariable]: false,
      [FuseV1Options.EnableNodeCliInspectArguments]: false,
      [FuseV1Options.EnableEmbeddedAsarIntegrityValidation]: true,
      [FuseV1Options.OnlyLoadAppFromAsar]: false,
    }),
  ],
};
