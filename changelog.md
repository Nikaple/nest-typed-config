# Changelog

All notable changes to this project will be documented in this file.
This project adheres to [Semantic Versioning](https://semver.org) and [Conventional Commits](https://www.conventionalcommits.org) for commit guidelines.

### [2.9.4](https://github.com/Nikaple/nest-typed-config/compare/v2.9.3...v2.9.4) (2025-02-14)

### 🐛 Fixes

- support Nest.js v11 [`69e043c`](https://github.com/Nikaple/nest-typed-config/commit/69e043c60dd2ab447a0ae8d2ed132a414c9b8964).

### [2.9.3](https://github.com/Nikaple/nest-typed-config/compare/v2.9.2...v2.9.3) (2024-03-04)

### 🐛 Fixes

- allow reflect-metadata versions in the 0.2 series [`91caf1a`](https://github.com/Nikaple/nest-typed-config/commit/91caf1a4535b3ff8a86be049da5829e859e4eef6).

### [2.9.2](https://github.com/Nikaple/nest-typed-config/compare/v2.9.1...v2.9.2) (2023-12-06)

### 🐛 Fixes

- do not attempt substitution if the loader failed [`3a929bc`](https://github.com/Nikaple/nest-typed-config/commit/3a929bca51a876a2f765367e45cf9a010c2409be).

### [2.9.1](https://github.com/Nikaple/nest-typed-config/compare/v2.9.0...v2.9.1) (2023-10-07)

### 🐛 Fixes

- **deps:** fix lodash.set vulnerability issue [`99cb046`](https://github.com/Nikaple/nest-typed-config/commit/99cb04638bd10719f90a997576a1198dd422f639).

## [2.9.0](https://github.com/Nikaple/nest-typed-config/compare/v2.8.0...v2.9.0) (2023-09-24)

### ✨ Features

- implemented ability to set default values for file loaders, with dotenv-expand syntax [`b39c92c`](https://github.com/Nikaple/nest-typed-config/commit/b39c92c6b6eb823c5eb566f1a0dd60862bd45016).

### 📚 Documentations

- updated documentation for substitution feature [`b7a7563`](https://github.com/Nikaple/nest-typed-config/commit/b7a7563243591e5bd9dd31290cb43230054b744d).

## [2.8.0](https://github.com/Nikaple/nest-typed-config/compare/v2.7.0...v2.8.0) (2023-09-06)

### ✨ Features

- expand values implementation for cosmic file loaders [`e7d77b3`](https://github.com/Nikaple/nest-typed-config/commit/e7d77b3d97ff4f37a80d6fd4d895f0169aaf6171).

## [2.7.0](https://github.com/Nikaple/nest-typed-config/compare/v2.6.0...v2.7.0) (2023-06-30)

### ✨ Features

- trigger ci [`b1d5e72`](https://github.com/Nikaple/nest-typed-config/commit/b1d5e72563cd9bc6c9feddc6b000f29f3d05d127).

## [2.6.0](https://github.com/Nikaple/nest-typed-config/compare/v2.5.2...v2.6.0) (2023-06-06)

### ✨ Features

- **dotenv-loader:** add key transformer option [`1e80f42`](https://github.com/Nikaple/nest-typed-config/commit/1e80f4252e94665806aca1df06411d98fef11707).

  Add option to transform environment variable keys before parsing them.
  This allows changes to be made prior to parsing which makes having to
  use complex normalize functions obsolete.

### [2.5.2](https://github.com/Nikaple/nest-typed-config/compare/v2.5.1...v2.5.2) (2023-03-16)

### 🐛 Fixes

- use expand method to expand dotenv config [`e589b7f`](https://github.com/Nikaple/nest-typed-config/commit/e589b7f756f89a9edc6389af7ec8748d8a246fe8).

### [2.5.1](https://github.com/Nikaple/nest-typed-config/compare/v2.5.0...v2.5.1) (2023-02-10)

### 🐛 Fixes

- **ci:** build before release [`6c6a1e2`](https://github.com/Nikaple/nest-typed-config/commit/6c6a1e22e5846077254d911f5bac312aa444852f).

## [2.5.0](https://github.com/Nikaple/nest-typed-config/compare/v2.4.8...v2.5.0) (2023-02-09)

### ✨ Features

- drop Node.js 12.x support [`f7edab2`](https://github.com/Nikaple/nest-typed-config/commit/f7edab2a1724d34a121d279e2f8a441a01090830).

### [2.4.8](https://github.com/Nikaple/nest-typed-config/compare/v2.4.7...v2.4.8) (2023-02-09)

### 🔐 Security Patches

- fixed issue with class-validator dependency cve ([#214](https://github.com/Nikaple/nest-typed-config/issues/214)) [`b12063f`](https://github.com/Nikaple/nest-typed-config/commit/b12063f4fe9bbc651b62aa8832030fd94beb0ad4).

  Co-authored-by: Akatsuki Levi <akatsukilevi@yahoo.co.jp>

### [2.4.7](https://github.com/Nikaple/nest-typed-config/compare/v2.4.6...v2.4.7) (2023-01-02)

### 📚 Documentations

- use `@ValidatedNested` when needed [`2aff0b7`](https://github.com/Nikaple/nest-typed-config/commit/2aff0b7a18eebdd59daafce7ce899d842ff43558).

  closes [#210](https://github.com/Nikaple/nest-typed-config/issues/210);

### [2.4.6](https://github.com/Nikaple/nest-typed-config/compare/v2.4.5...v2.4.6) (2022-09-06)

### 🐛 Fixes

- add an option to allow empty env variables [`73faa15`](https://github.com/Nikaple/nest-typed-config/commit/73faa1546eac2451684bdc88005fb5b2d1cd3828).

  closes [#195](https://github.com/Nikaple/nest-typed-config/issues/195);

### [2.4.5](https://github.com/Nikaple/nest-typed-config/compare/v2.4.4...v2.4.5) (2022-08-31)

### 🐛 Fixes

- **deps:** update dependency debug to v4.3.4 [`3ad47dc`](https://github.com/Nikaple/nest-typed-config/commit/3ad47dc9e3bd5b41d3fc308485debdc17d4967fa).

### [2.4.4](https://github.com/Nikaple/nest-typed-config/compare/v2.4.3...v2.4.4) (2022-08-22)

### 🐛 Fixes

- try to require class-validator/transform from root node_modules first [`4ad3c56`](https://github.com/Nikaple/nest-typed-config/commit/4ad3c567aee0daca02c2886d0d834da0d38d88f6).

  closes [#149](https://github.com/Nikaple/nest-typed-config/issues/149);

### [2.4.3](https://github.com/Nikaple/nest-typed-config/compare/v2.4.2...v2.4.3) (2022-08-22)

### 🐛 Fixes

- use default values for undefined properties [`9216cf5`](https://github.com/Nikaple/nest-typed-config/commit/9216cf5b632dcde4659cf9fc3924e4ea5be56c3b).

### [2.4.2](https://github.com/Nikaple/nest-typed-config/compare/v2.4.1...v2.4.2) (2022-07-28)

### 🐛 Fixes

- trigger release workflow [`2ad170c`](https://github.com/Nikaple/nest-typed-config/commit/2ad170c7891fbe8a3f8410d9e4d1e2099dff663c).

- trigger release workflow [`c4e2f17`](https://github.com/Nikaple/nest-typed-config/commit/c4e2f1703f482480e5c30282435c0919c03c2031).

### [2.4.1](https://github.com/Nikaple/nest-typed-config/compare/v2.4.0...v2.4.1) (2022-03-28)

### 🐛 Fixes

- add ignoreEnvironmentVariableSubstitution for directoryLoader [`60abf39`](https://github.com/Nikaple/nest-typed-config/commit/60abf3983598f0ede69ef4d25112c840ac5c102b).

## [2.4.0](https://github.com/Nikaple/nest-typed-config/compare/v2.3.0...v2.4.0) (2022-02-08)

### ✨ Features

- support environment variable substitution ([#128](https://github.com/Nikaple/nest-typed-config/issues/128)) [`cb9bdc3`](https://github.com/Nikaple/nest-typed-config/commit/cb9bdc3599e6c296c1eeff4ab6b52b48311a2963).

## [2.3.0](https://github.com/Nikaple/nest-typed-config/compare/v2.2.3...v2.3.0) (2021-12-27)

### ✨ Features

- support selecting optional configs with selectConfig ([#82](https://github.com/Nikaple/nest-typed-config/issues/82)) [`5852b52`](https://github.com/Nikaple/nest-typed-config/commit/5852b52ee621f4833f17d0a514e3428f5d299e27).

### [2.2.3](https://github.com/Nikaple/nest-typed-config/compare/v2.2.2...v2.2.3) (2021-12-09)

### 🐛 Fixes

- **deps:** update dependency class-validator to v0.13.2 ([#35](https://github.com/Nikaple/nest-typed-config/issues/35)) [`142c683`](https://github.com/Nikaple/nest-typed-config/commit/142c683a8722e3d4c91cc6314803919401716b1c).

  Co-authored-by: Renovate Bot <bot@renovateapp.com>

### [2.2.2](https://github.com/Nikaple/nest-typed-config/compare/v2.2.1...v2.2.2) (2021-12-06)

### 🐛 Fixes

- **deps:** update dependency debug to v4.3.3 ([#36](https://github.com/Nikaple/nest-typed-config/issues/36)) [`9a0805f`](https://github.com/Nikaple/nest-typed-config/commit/9a0805f6217a0c5f22db3a6a0d76539307b86e1f).

  Co-authored-by: Renovate Bot <bot@renovateapp.com>

### [2.2.1](https://github.com/Nikaple/nest-typed-config/compare/v2.2.0...v2.2.1) (2021-12-06)

### 🐛 Fixes

- **deps:** update dependency chalk to v4.1.2 ([#34](https://github.com/Nikaple/nest-typed-config/issues/34)) [`b8a5ccf`](https://github.com/Nikaple/nest-typed-config/commit/b8a5ccf5e287de3cbc41e60dbbde4c255f855acb).

  Co-authored-by: Renovate Bot <bot@renovateapp.com>

## [2.2.0](https://github.com/Nikaple/nest-typed-config/compare/v2.1.1...v2.2.0) (2021-12-02)

### ✨ Features

- update nestjs to v8, rxjs to v7 ([#24](https://github.com/Nikaple/nest-typed-config/issues/24)) [`c582819`](https://github.com/Nikaple/nest-typed-config/commit/c5828193743f41ddfefca00cda65f80a07d0a88b).

### [2.1.1](https://github.com/Nikaple/nest-typed-config/compare/v2.1.0...v2.1.1) (2021-12-02)

### 📚 Documentations

- update changelog file name [`ab615bb`](https://github.com/Nikaple/nest-typed-config/commit/ab615bb78c5f04ed0e62d010b558fa660451d1c1).

### [2.1.0](https://github.com/Nikaple/nest-typed-config/compare/v2.0.1...v2.1.0) (2021-11-04)

### ✨ Features

- dotenv loader will assign env variables to process.env [`aee546f`](https://github.com/Nikaple/nest-typed-config/commit/aee546f8e69d786773ea05f67c42163a0c28acdf).

### 📚 Documentations

- add docs for normalize option and getters [`77a7f81`](https://github.com/Nikaple/nest-typed-config/commit/77a7f8141acdabf3c6eaad590691fcb3a04d3319).

## [1.6.0](https://github.com/Nikaple/nest-typed-config/compare/1.5.0...1.6.0) (2021-09-02)

### ✨ Features

- support include specific file for directory loader ([005cf47](https://github.com/Nikaple/nest-typed-config/commit/005cf475c08d13327799947251ba04810eced3d8))

## [1.5.0](https://github.com/Nikaple/nest-typed-config/compare/1.4.0...1.5.0) (2021-07-21)

### ✨ Features

- support directory loader ([3915521](https://github.com/Nikaple/nest-typed-config/commit/39155212462da375fc7bfec59861686cad27ba96))

## [1.4.0](https://github.com/Nikaple/nest-typed-config/compare/1.3.1...1.4.0) (2021-06-03)

### 🐛 Fixes

- improve typing for forRootAsync ([6a96e36](https://github.com/Nikaple/nest-typed-config/commit/6a96e36ebddfc5d5c9f38bc073990945195c6c6f))

### ✨ Features

- expose getConfigErrorMessage ([cdc2263](https://github.com/Nikaple/nest-typed-config/commit/cdc22635558d4f0c31b33d45024a590866298a9a))

### [1.3.1](https://github.com/Nikaple/nest-typed-config/compare/1.3.0...1.3.1) (2021-05-17)

### 🐛 Fixes

- improve typing for forRoot and forRootAsync ([32acbbb](https://github.com/Nikaple/nest-typed-config/commit/32acbbb576d770a9ef99785c574020fa29b6fa2d))

## [1.3.0](https://github.com/Nikaple/nest-typed-config/compare/1.2.0...1.3.0) (2021-05-10)

### ✨ Features

- support using config in decorators with selectConfig ([09cdb95](https://github.com/Nikaple/nest-typed-config/commit/09cdb955aea2ec68c0609748b50ce66381c1414c))

## [1.2.0](https://github.com/Nikaple/nest-typed-config/compare/1.1.0...1.2.0) (2021-05-09)

### ✨ Features

- support multiple loaders, support custom basename for file-loader ([f111754](https://github.com/Nikaple/nest-typed-config/commit/f111754c469475525d565fe478c67b2ca20baa6f))

## [1.1.0](https://github.com/Nikaple/nest-typed-config/compare/1.0.3...1.1.0) (2021-05-08)

### ✨ Features

- **remote-loader:** support retry when failed to fetch config ([e22463a](https://github.com/Nikaple/nest-typed-config/commit/e22463a160d0b0ba926c7466609fc10ad470bdce))

## [1.0.3](https://github.com/Nikaple/nest-typed-config/compare/1.0.2...1.0.3) (2021-05-07)

### 🐛 Fixes

- isGlobal works properly now ([3dd2154](https://github.com/Nikaple/nest-typed-config/commit/3dd2154d2a93e96bad79894d3dfa9fcf77e6e6bd))

## [1.0.2](https://github.com/Nikaple/nest-typed-config/compare/1.0.2...1.0.3) (2021-05-07)

### 🐛 Fixes

- **file-loader:** fix absolutePath option not working on windows ([f45bd04](https://github.com/Nikaple/nest-typed-config/commit/f45bd0454614c2695f14c14adfea0cae578282ac))
- **file-loader:** remove dead code ([ffb36c5](https://github.com/Nikaple/nest-typed-config/commit/ffb36c5b7b5c6b6d932ce7ef0546033bb7e0d118))
