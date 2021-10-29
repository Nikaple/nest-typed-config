# Skipping optional dependencies

To reduce dependency size, you can install `nest-typed-config` without optional dependencies with:

```bash
# No optional dependency is installed
$ npm i --no-optional nest-typed-config
```

By skipping optional dependencies, you have to install the dependencies of configuration loaders by yourself. Please checkout the installation guide for corresponding loader:

- [dotenv loader](#Dotenv-loader)
- [file loader](#File-loader)
- [directory loader](#Directory-loader)
- [remote loader](#Remote-loader)
- [custom loader](#Custom-loader)

# Installation guide for different loaders

## Dotenv loader

To use `dotenvLoader`, you should install `dotenv` first. If you want to expand environment variables, `dotenv-expand` should be installed as well.

```bash
# For NPM
$ npm i --save dotenv

# If you want to expand environment variables, remember to install dotenv-expand
$ npm i --save dotenv dotenv-expand
```

## File loader

To use `fileLoader`, you should install `cosmiconfig` first. If you want to load `.toml` configuration files, `@iarna/toml` should be installed as well.

```bash
# For NPM
$ npm i --save cosmiconfig

# If you want to load .toml configs, remember to install @iarna/toml
$ npm i --save @iarna/toml
```

## Directory loader

To use `directoryLoader`, you should install `cosmiconfig` first. If you want to load `.toml` configuration files, `@iarna/toml` should be installed as well.

```bash
# For NPM
$ npm i --save cosmiconfig

# If you want to load .toml configs, remember to install @iarna/toml
$ npm i --save @iarna/toml
```

## Remote loader

To use `remoteLoader`, you should install `@nestjs/axios` first. Then, depending on the config file format, you should install corresponding config file parser. That is:

- `parse-json` to parse `.json` configurations.
- `yaml` to parse `.yml` or `.yaml` configurations.
- `toml` to parse `.toml` configurations.

```bash
$ npm i --save @nestjs/axios

# For .toml config
$ npm i --save @iarna/toml
# For .json config
$ npm i --save parse-json
# For .yaml/.yml config
$ npm i --save yml
```

## Custom loader

Just implement your own logic, no extra dependency is required!
