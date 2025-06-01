# Changelog

All notable changes to this project will be documented in this file.
This project adheres to [Semantic Versioning](https://semver.org) and [Conventional Commits](https://www.conventionalcommits.org) for commit guidelines.

## [2.3.0](https://github.com/Nikaple/nest-typed-config/compare/v2.2.3...v2.3.0) (2025-06-01)

### ✨ Features

- **dotenv-loader:** add key transformer option [`bb7128b`](https://github.com/Nikaple/nest-typed-config/commit/bb7128b99f1e6c1935f1ad322186d2895d967bd0).

  Add option to transform environment variable keys before parsing them.
  This allows changes to be made prior to parsing which makes having to
  use complex normalize functions obsolete.

- drop Node.js 12.x support [`49e3508`](https://github.com/Nikaple/nest-typed-config/commit/49e3508c4301d8bd3c590ebcefc1e470003856be).

- expand values implementation for cosmic file loaders [`edd4d49`](https://github.com/Nikaple/nest-typed-config/commit/edd4d4959a60162eb89418391619b3bcd6763cf8).

- implement ability to override environment variables with dotenv loader ([#510](https://github.com/Nikaple/nest-typed-config/issues/510)) [`1017118`](https://github.com/Nikaple/nest-typed-config/commit/101711805150f61935e31fdd89a3240b4478b2ea).

  Co-authored-by: picu <curdin.pitsch@wuerth-it.com>

- implemented ability to set default values for file loaders, with dotenv-expand syntax [`b8860b1`](https://github.com/Nikaple/nest-typed-config/commit/b8860b1beeb0ab3aa221b4b138a38016d9463eb8).

- support environment variable substitution ([#128](https://github.com/Nikaple/nest-typed-config/issues/128)) [`0116497`](https://github.com/Nikaple/nest-typed-config/commit/0116497e237ed6fda38765024040919efd4a8430).

- support selecting optional configs with selectConfig ([#82](https://github.com/Nikaple/nest-typed-config/issues/82)) [`fbca6d7`](https://github.com/Nikaple/nest-typed-config/commit/fbca6d759f1f75c0c8a5f8ab9498b43b37c3309d).

- trigger ci [`c17c90c`](https://github.com/Nikaple/nest-typed-config/commit/c17c90cbcf7d0ca081aa03207489d9d94dc98861).

### 🐛 Fixes

- add an option to allow empty env variables [`fdafad6`](https://github.com/Nikaple/nest-typed-config/commit/fdafad66c2ce27427062a8f614dbf6ab675c3e13).

  closes [#195](https://github.com/Nikaple/nest-typed-config/issues/195);

- add ignoreEnvironmentVariableSubstitution for directoryLoader [`3cac232`](https://github.com/Nikaple/nest-typed-config/commit/3cac232ac3f72aacec6b7c4f106873e273d5bf2e).

- allow reflect-metadata versions in the 0.2 series [`87017e4`](https://github.com/Nikaple/nest-typed-config/commit/87017e4f5edecf835f1bdff00ade350d6c20290b).

- **ci:** build before release [`af2bb2b`](https://github.com/Nikaple/nest-typed-config/commit/af2bb2b17f17c0108a660ef2a73248750d433e42).

- **deps:** fix lodash.set vulnerability issue [`a5e3d4a`](https://github.com/Nikaple/nest-typed-config/commit/a5e3d4a657ccaecdcb410eecbe489718d4e38658).

- **deps:** update dependency debug to v4.3.4 [`d046524`](https://github.com/Nikaple/nest-typed-config/commit/d046524101eb550f095bd71859707e30c4c7e312).

- do not attempt substitution if the loader failed [`dd1153a`](https://github.com/Nikaple/nest-typed-config/commit/dd1153ae090b2739eccc9ea1ee28e475c8d0d4f4).

- support Nest.js v11 [`51d486f`](https://github.com/Nikaple/nest-typed-config/commit/51d486f05e04c013b57eaa27fbde0d17205e71c5).

- support webpack bundle. Closes [#499](https://github.com/Nikaple/nest-typed-config/issues/499) [`9a3cd6f`](https://github.com/Nikaple/nest-typed-config/commit/9a3cd6f450882e2a5bc8e049a81040b11de17ade).

- trigger release workflow [`b233baf`](https://github.com/Nikaple/nest-typed-config/commit/b233baf9309d8f6884dd209263353d56fa2c0b69).

- trigger release workflow [`b03aed5`](https://github.com/Nikaple/nest-typed-config/commit/b03aed53fcb524d8eec048392dc125642cf46c90).

- try to require class-validator/transform from root node_modules first [`b9d6c1f`](https://github.com/Nikaple/nest-typed-config/commit/b9d6c1f36acc280d97b322d536f999a6da0572e6).

  closes [#149](https://github.com/Nikaple/nest-typed-config/issues/149);

- use default values for undefined properties [`1213bec`](https://github.com/Nikaple/nest-typed-config/commit/1213beca096dbc3a602320801c3e1f2c4419a8c1).

- use expand method to expand dotenv config [`4ca698b`](https://github.com/Nikaple/nest-typed-config/commit/4ca698b04ff1e910d2b3465e1ab3dbaa540b2b1b).

### 🔐 Security Patches

- fixed issue with class-validator dependency cve ([#214](https://github.com/Nikaple/nest-typed-config/issues/214)) [`3713b92`](https://github.com/Nikaple/nest-typed-config/commit/3713b926880306167a86a136984a621d56758fc0).

  Co-authored-by: Akatsuki Levi <akatsukilevi@yahoo.co.jp>

### 📚 Documentations

- updated documentation for substitution feature [`deaebe9`](https://github.com/Nikaple/nest-typed-config/commit/deaebe9fec8717306117041b8fb6d46172788d62).

- use `@ValidatedNested` when needed [`831355c`](https://github.com/Nikaple/nest-typed-config/commit/831355cb5677e04e72ec5e531193269495f153bf).

  closes [#210](https://github.com/Nikaple/nest-typed-config/issues/210);

## [2.3.0](https://github.com/Nikaple/nest-typed-config/compare/v2.2.3...v2.3.0) (2025-05-31)

### ✨ Features

- **dotenv-loader:** add key transformer option [`bb7128b`](https://github.com/Nikaple/nest-typed-config/commit/bb7128b99f1e6c1935f1ad322186d2895d967bd0).

  Add option to transform environment variable keys before parsing them.
  This allows changes to be made prior to parsing which makes having to
  use complex normalize functions obsolete.

- drop Node.js 12.x support [`49e3508`](https://github.com/Nikaple/nest-typed-config/commit/49e3508c4301d8bd3c590ebcefc1e470003856be).

- expand values implementation for cosmic file loaders [`edd4d49`](https://github.com/Nikaple/nest-typed-config/commit/edd4d4959a60162eb89418391619b3bcd6763cf8).

- implement ability to override environment variables with dotenv loader ([#510](https://github.com/Nikaple/nest-typed-config/issues/510)) [`1017118`](https://github.com/Nikaple/nest-typed-config/commit/101711805150f61935e31fdd89a3240b4478b2ea).

  Co-authored-by: picu <curdin.pitsch@wuerth-it.com>

- implemented ability to set default values for file loaders, with dotenv-expand syntax [`b8860b1`](https://github.com/Nikaple/nest-typed-config/commit/b8860b1beeb0ab3aa221b4b138a38016d9463eb8).

- support environment variable substitution ([#128](https://github.com/Nikaple/nest-typed-config/issues/128)) [`0116497`](https://github.com/Nikaple/nest-typed-config/commit/0116497e237ed6fda38765024040919efd4a8430).

- support selecting optional configs with selectConfig ([#82](https://github.com/Nikaple/nest-typed-config/issues/82)) [`fbca6d7`](https://github.com/Nikaple/nest-typed-config/commit/fbca6d759f1f75c0c8a5f8ab9498b43b37c3309d).

- trigger ci [`c17c90c`](https://github.com/Nikaple/nest-typed-config/commit/c17c90cbcf7d0ca081aa03207489d9d94dc98861).

### 🐛 Fixes

- add an option to allow empty env variables [`fdafad6`](https://github.com/Nikaple/nest-typed-config/commit/fdafad66c2ce27427062a8f614dbf6ab675c3e13).

  closes [#195](https://github.com/Nikaple/nest-typed-config/issues/195);

- add ignoreEnvironmentVariableSubstitution for directoryLoader [`3cac232`](https://github.com/Nikaple/nest-typed-config/commit/3cac232ac3f72aacec6b7c4f106873e273d5bf2e).

- allow reflect-metadata versions in the 0.2 series [`87017e4`](https://github.com/Nikaple/nest-typed-config/commit/87017e4f5edecf835f1bdff00ade350d6c20290b).

- **ci:** build before release [`af2bb2b`](https://github.com/Nikaple/nest-typed-config/commit/af2bb2b17f17c0108a660ef2a73248750d433e42).

- **deps:** fix lodash.set vulnerability issue [`a5e3d4a`](https://github.com/Nikaple/nest-typed-config/commit/a5e3d4a657ccaecdcb410eecbe489718d4e38658).

- **deps:** update dependency debug to v4.3.4 [`d046524`](https://github.com/Nikaple/nest-typed-config/commit/d046524101eb550f095bd71859707e30c4c7e312).

- do not attempt substitution if the loader failed [`dd1153a`](https://github.com/Nikaple/nest-typed-config/commit/dd1153ae090b2739eccc9ea1ee28e475c8d0d4f4).

- support Nest.js v11 [`51d486f`](https://github.com/Nikaple/nest-typed-config/commit/51d486f05e04c013b57eaa27fbde0d17205e71c5).

- support webpack bundle. Closes [#499](https://github.com/Nikaple/nest-typed-config/issues/499) [`9a3cd6f`](https://github.com/Nikaple/nest-typed-config/commit/9a3cd6f450882e2a5bc8e049a81040b11de17ade).

- trigger release workflow [`b233baf`](https://github.com/Nikaple/nest-typed-config/commit/b233baf9309d8f6884dd209263353d56fa2c0b69).

- trigger release workflow [`b03aed5`](https://github.com/Nikaple/nest-typed-config/commit/b03aed53fcb524d8eec048392dc125642cf46c90).

- try to require class-validator/transform from root node_modules first [`b9d6c1f`](https://github.com/Nikaple/nest-typed-config/commit/b9d6c1f36acc280d97b322d536f999a6da0572e6).

  closes [#149](https://github.com/Nikaple/nest-typed-config/issues/149);

- use default values for undefined properties [`1213bec`](https://github.com/Nikaple/nest-typed-config/commit/1213beca096dbc3a602320801c3e1f2c4419a8c1).

- use expand method to expand dotenv config [`4ca698b`](https://github.com/Nikaple/nest-typed-config/commit/4ca698b04ff1e910d2b3465e1ab3dbaa540b2b1b).

### 🔐 Security Patches

- fixed issue with class-validator dependency cve ([#214](https://github.com/Nikaple/nest-typed-config/issues/214)) [`3713b92`](https://github.com/Nikaple/nest-typed-config/commit/3713b926880306167a86a136984a621d56758fc0).

  Co-authored-by: Akatsuki Levi <akatsukilevi@yahoo.co.jp>

### 📚 Documentations

- updated documentation for substitution feature [`deaebe9`](https://github.com/Nikaple/nest-typed-config/commit/deaebe9fec8717306117041b8fb6d46172788d62).

- use `@ValidatedNested` when needed [`831355c`](https://github.com/Nikaple/nest-typed-config/commit/831355cb5677e04e72ec5e531193269495f153bf).

  closes [#210](https://github.com/Nikaple/nest-typed-config/issues/210);

### [2.10.1](https://github.com/Nikaple/nest-typed-config/compare/v2.10.0...v2.10.1) (2025-05-31)

### 🐛 Fixes

- support webpack bundle. Closes [#499](https://github.com/Nikaple/nest-typed-config/issues/499) [`9a3cd6f`](https://github.com/Nikaple/nest-typed-config/commit/9a3cd6f450882e2a5bc8e049a81040b11de17ade).

## [2.10.0](https://github.com/Nikaple/nest-typed-config/compare/v2.9.4...v2.10.0) (2025-05-28)

### ✨ Features

- implement ability to override environment variables with dotenv loader ([#510](https://github.com/Nikaple/nest-typed-config/issues/510)) [`1017118`](https://github.com/Nikaple/nest-typed-config/commit/101711805150f61935e31fdd89a3240b4478b2ea).

  Co-authored-by: picu <curdin.pitsch@wuerth-it.com>

### [2.9.4](https://github.com/Nikaple/nest-typed-config/compare/v2.9.3...v2.9.4) (2025-02-14)

### 🐛 Fixes

- support Nest.js v11 [`51d486f`](https://github.com/Nikaple/nest-typed-config/commit/51d486f05e04c013b57eaa27fbde0d17205e71c5).

### [2.9.3](https://github.com/Nikaple/nest-typed-config/compare/v2.9.2...v2.9.3) (2024-03-04)

### 🐛 Fixes

- allow reflect-metadata versions in the 0.2 series [`87017e4`](https://github.com/Nikaple/nest-typed-config/commit/87017e4f5edecf835f1bdff00ade350d6c20290b).

### [2.9.2](https://github.com/Nikaple/nest-typed-config/compare/v2.9.1...v2.9.2) (2023-12-06)

### 🐛 Fixes

- do not attempt substitution if the loader failed [`dd1153a`](https://github.com/Nikaple/nest-typed-config/commit/dd1153ae090b2739eccc9ea1ee28e475c8d0d4f4).

### [2.9.1](https://github.com/Nikaple/nest-typed-config/compare/v2.9.0...v2.9.1) (2023-10-07)

### 🐛 Fixes

- **deps:** fix lodash.set vulnerability issue [`a5e3d4a`](https://github.com/Nikaple/nest-typed-config/commit/a5e3d4a657ccaecdcb410eecbe489718d4e38658).

## [2.9.0](https://github.com/Nikaple/nest-typed-config/compare/v2.8.0...v2.9.0) (2023-09-24)

### ✨ Features

- implemented ability to set default values for file loaders, with dotenv-expand syntax [`b8860b1`](https://github.com/Nikaple/nest-typed-config/commit/b8860b1beeb0ab3aa221b4b138a38016d9463eb8).

### 📚 Documentations

- updated documentation for substitution feature [`deaebe9`](https://github.com/Nikaple/nest-typed-config/commit/deaebe9fec8717306117041b8fb6d46172788d62).

## [2.8.0](https://github.com/Nikaple/nest-typed-config/compare/v2.7.0...v2.8.0) (2023-09-06)

### ✨ Features

- expand values implementation for cosmic file loaders [`edd4d49`](https://github.com/Nikaple/nest-typed-config/commit/edd4d4959a60162eb89418391619b3bcd6763cf8).

## [2.7.0](https://github.com/Nikaple/nest-typed-config/compare/v2.6.0...v2.7.0) (2023-06-30)

### ✨ Features

- trigger ci [`c17c90c`](https://github.com/Nikaple/nest-typed-config/commit/c17c90cbcf7d0ca081aa03207489d9d94dc98861).

## [2.6.0](https://github.com/Nikaple/nest-typed-config/compare/v2.5.2...v2.6.0) (2023-06-06)

### ✨ Features

- **dotenv-loader:** add key transformer option [`bb7128b`](https://github.com/Nikaple/nest-typed-config/commit/bb7128b99f1e6c1935f1ad322186d2895d967bd0).

  Add option to transform environment variable keys before parsing them.
  This allows changes to be made prior to parsing which makes having to
  use complex normalize functions obsolete.

### [2.5.2](https://github.com/Nikaple/nest-typed-config/compare/v2.5.1...v2.5.2) (2023-03-16)

### 🐛 Fixes

- use expand method to expand dotenv config [`4ca698b`](https://github.com/Nikaple/nest-typed-config/commit/4ca698b04ff1e910d2b3465e1ab3dbaa540b2b1b).

### [2.5.1](https://github.com/Nikaple/nest-typed-config/compare/v2.5.0...v2.5.1) (2023-02-10)

### 🐛 Fixes

- **ci:** build before release [`af2bb2b`](https://github.com/Nikaple/nest-typed-config/commit/af2bb2b17f17c0108a660ef2a73248750d433e42).

## [2.5.0](https://github.com/Nikaple/nest-typed-config/compare/v2.4.8...v2.5.0) (2023-02-09)

### ✨ Features

- drop Node.js 12.x support [`49e3508`](https://github.com/Nikaple/nest-typed-config/commit/49e3508c4301d8bd3c590ebcefc1e470003856be).

### [2.4.8](https://github.com/Nikaple/nest-typed-config/compare/v2.4.7...v2.4.8) (2023-02-09)

### 🔐 Security Patches

- fixed issue with class-validator dependency cve ([#214](https://github.com/Nikaple/nest-typed-config/issues/214)) [`3713b92`](https://github.com/Nikaple/nest-typed-config/commit/3713b926880306167a86a136984a621d56758fc0).

  Co-authored-by: Akatsuki Levi <akatsukilevi@yahoo.co.jp>

### [2.4.7](https://github.com/Nikaple/nest-typed-config/compare/v2.4.6...v2.4.7) (2023-01-02)

### 📚 Documentations

- use `@ValidatedNested` when needed [`831355c`](https://github.com/Nikaple/nest-typed-config/commit/831355cb5677e04e72ec5e531193269495f153bf).

  closes [#210](https://github.com/Nikaple/nest-typed-config/issues/210);

### [2.4.6](https://github.com/Nikaple/nest-typed-config/compare/v2.4.5...v2.4.6) (2022-09-06)

### 🐛 Fixes

- add an option to allow empty env variables [`fdafad6`](https://github.com/Nikaple/nest-typed-config/commit/fdafad66c2ce27427062a8f614dbf6ab675c3e13).

  closes [#195](https://github.com/Nikaple/nest-typed-config/issues/195);

### [2.4.5](https://github.com/Nikaple/nest-typed-config/compare/v2.4.4...v2.4.5) (2022-08-31)

### 🐛 Fixes

- **deps:** update dependency debug to v4.3.4 [`d046524`](https://github.com/Nikaple/nest-typed-config/commit/d046524101eb550f095bd71859707e30c4c7e312).

### [2.4.4](https://github.com/Nikaple/nest-typed-config/compare/v2.4.3...v2.4.4) (2022-08-22)

### 🐛 Fixes

- try to require class-validator/transform from root node_modules first [`b9d6c1f`](https://github.com/Nikaple/nest-typed-config/commit/b9d6c1f36acc280d97b322d536f999a6da0572e6).

  closes [#149](https://github.com/Nikaple/nest-typed-config/issues/149);

### [2.4.3](https://github.com/Nikaple/nest-typed-config/compare/v2.4.2...v2.4.3) (2022-08-22)

### 🐛 Fixes

- use default values for undefined properties [`9216cf5`](https://github.com/Nikaple/nest-typed-config/commit/9216cf5b632dcde4659cf9fc3924e4ea5be56c3b).

### [2.4.2](https://github.com/Nikaple/nest-typed-config/compare/v2.4.1...v2.4.2) (2022-07-28)

### 🐛 Fixes

- trigger release workflow [`b233baf`](https://github.com/Nikaple/nest-typed-config/commit/b233baf9309d8f6884dd209263353d56fa2c0b69).

- trigger release workflow [`b03aed5`](https://github.com/Nikaple/nest-typed-config/commit/b03aed53fcb524d8eec048392dc125642cf46c90).

### [2.4.1](https://github.com/Nikaple/nest-typed-config/compare/v2.4.0...v2.4.1) (2022-03-28)

### 🐛 Fixes

- add ignoreEnvironmentVariableSubstitution for directoryLoader [`3cac232`](https://github.com/Nikaple/nest-typed-config/commit/3cac232ac3f72aacec6b7c4f106873e273d5bf2e).

## [2.4.0](https://github.com/Nikaple/nest-typed-config/compare/v2.3.0...v2.4.0) (2022-02-08)

### ✨ Features

- support environment variable substitution ([#128](https://github.com/Nikaple/nest-typed-config/issues/128)) [`cb9bdc3`](https://github.com/Nikaple/nest-typed-config/commit/cb9bdc3599e6c296c1eeff4ab6b52b48311a2963).

## [2.3.0](https://github.com/Nikaple/nest-typed-config/compare/v2.2.3...v2.3.0) (2021-12-27)

### ✨ Features

- support selecting optional configs with selectConfig ([#82](https://github.com/Nikaple/nest-typed-config/issues/82)) [`5852b52`](https://github.com/Nikaple/nest-typed-config/commit/5852b52ee621f4833f17d0a514e3428f5d299e27).

### [2.2.3](https://github.com/Nikaple/nest-typed-config/compare/v2.2.2...v2.2.3) (2021-12-09)

### 🐛 Fixes

- **deps:** update dependency class-validator to v0.13.2 ([#35](https://github.com/Nikaple/nest-typed-config/issues/35)) [`8eef51c`](https://github.com/Nikaple/nest-typed-config/commit/8eef51c744a3ed4f88309b295998606f2701dfeb).

  Co-authored-by: Renovate Bot <bot@renovateapp.com>

### [2.2.2](https://github.com/Nikaple/nest-typed-config/compare/v2.2.1...v2.2.2) (2021-12-06)

### 🐛 Fixes

- **deps:** update dependency debug to v4.3.3 ([#36](https://github.com/Nikaple/nest-typed-config/issues/36)) [`dc5b076`](https://github.com/Nikaple/nest-typed-config/commit/dc5b076fdf55a321964ccef08ff44d1e7122cef8).

  Co-authored-by: Renovate Bot <bot@renovateapp.com>

### [2.2.1](https://github.com/Nikaple/nest-typed-config/compare/v2.2.0...v2.2.1) (2021-12-06)

### 🐛 Fixes

- **deps:** update dependency chalk to v4.1.2 ([#34](https://github.com/Nikaple/nest-typed-config/issues/34)) [`341c626`](https://github.com/Nikaple/nest-typed-config/commit/341c626851c8b6159f1c4d6331af5cefd11ffa54).

  Co-authored-by: Renovate Bot <bot@renovateapp.com>

## [2.2.0](https://github.com/Nikaple/nest-typed-config/compare/v2.1.1...v2.2.0) (2021-12-02)

### ✨ Features

- update nestjs to v8, rxjs to v7 ([#24](https://github.com/Nikaple/nest-typed-config/issues/24)) [`efea3f6`](https://github.com/Nikaple/nest-typed-config/commit/efea3f6278f8a4dc33dff6d005a1e61695442764).

### [2.1.1](https://github.com/Nikaple/nest-typed-config/compare/v2.1.0...v2.1.1) (2021-12-02)

### 📚 Documentations

- update changelog file name [`c3c63f6`](https://github.com/Nikaple/nest-typed-config/commit/c3c63f6e09780a933597f052e97822a369c9c6b4).

### [2.1.0](https://github.com/Nikaple/nest-typed-config/compare/v2.0.1...v2.1.0) (2021-11-04)

### ✨ Features

- dotenv loader will assign env variables to process.env [`2e09bad`](https://github.com/Nikaple/nest-typed-config/commit/2e09bad858d9158b460f6298698f4c6b5d8739c2).

### 📚 Documentations

- add docs for normalize option and getters [`a45f54d`](https://github.com/Nikaple/nest-typed-config/commit/a45f54df8ddc1b4706df40cfb9533be48bd59d66).

## [1.6.0](https://github.com/Nikaple/nest-typed-config/compare/1.5.0...1.6.0) (2021-09-02)

### ✨ Features

- support include specific file for directory loader ([c54b857](https://github.com/Nikaple/nest-typed-config/commit/c54b857fd3a8e1ac901e6d5a1a74103b7e0e7fd8))

## [1.5.0](https://github.com/Nikaple/nest-typed-config/compare/1.4.0...1.5.0) (2021-07-21)

### ✨ Features

- support directory loader ([1ae405b](https://github.com/Nikaple/nest-typed-config/commit/1ae405b095e96f40e0a714cac997af887439abd7))

## [1.4.0](https://github.com/Nikaple/nest-typed-config/compare/1.3.1...1.4.0) (2021-06-03)

### 🐛 Fixes

- improve typing for forRootAsync ([add3b4b](https://github.com/Nikaple/nest-typed-config/commit/add3b4b974b63c4b29779cef754f9a5e6833dce3))

### ✨ Features

- expose getConfigErrorMessage ([631e550](https://github.com/Nikaple/nest-typed-config/commit/631e5500876cf08ec79526c5c8e8bc3894337db7))

### [1.3.1](https://github.com/Nikaple/nest-typed-config/compare/1.3.0...1.3.1) (2021-05-17)

### 🐛 Fixes

- improve typing for forRoot and forRootAsync ([46e15cb](https://github.com/Nikaple/nest-typed-config/commit/46e15cb3486bf16030f16334b7c3f8ccb308a9cf))

## [1.3.0](https://github.com/Nikaple/nest-typed-config/compare/1.2.0...1.3.0) (2021-05-10)

### ✨ Features

- support using config in decorators with selectConfig ([532e978](https://github.com/Nikaple/nest-typed-config/commit/532e9784984f6d0694d1aef6d7850023574db9b9))

## [1.2.0](https://github.com/Nikaple/nest-typed-config/compare/1.1.0...1.2.0) (2021-05-09)

### ✨ Features

- support multiple loaders, support custom basename for file-loader ([0d72673](https://github.com/Nikaple/nest-typed-config/commit/0d726732bb631a31aabdfe4ce1700aa32cb34bae))

## [1.1.0](https://github.com/Nikaple/nest-typed-config/compare/1.0.3...1.1.0) (2021-05-08)

### ✨ Features

- **remote-loader:** support retry when failed to fetch config ([a327775](https://github.com/Nikaple/nest-typed-config/commit/a327775ad1f7832f81804b67280e0c369d824f93))

## [1.0.3](https://github.com/Nikaple/nest-typed-config/compare/1.0.2...1.0.3) (2021-05-07)

### 🐛 Fixes

- isGlobal works properly now ([01fc48a](https://github.com/Nikaple/nest-typed-config/commit/01fc48a9def304995b209a48e3f2a88e9c2a09a2))

## [1.0.2](https://github.com/Nikaple/nest-typed-config/compare/1.0.2...1.0.3) (2021-05-07)

### 🐛 Fixes

- **file-loader:** fix absolutePath option not working on windows ([27ba20a](https://github.com/Nikaple/nest-typed-config/commit/27ba20acd585debd45217f51fb292ba209c94251))
- **file-loader:** remove dead code ([97572fb](https://github.com/Nikaple/nest-typed-config/commit/97572fbf0d8d5a2e31c71217243d3f33aff2a61a))
