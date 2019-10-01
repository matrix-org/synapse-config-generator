# synapse-config-generator (SCG)

`synapse-config-generator` is a config generator for synapse. It gathers
together the critical descision points of a first time synapse install and
provides a pretty UI to walk new users through them.

The result of using SCG is one or more yaml files akin to Synapse's [sample
config](https://github.com/matrix-org/synapse/tree/develop/docs). Through
using SCG the user also gains knowledge of the environment in which synapse
will be running.

## Running

Create and activate a new virtualenv:

```
virtualenv -p python3 env
source env/bin/active
```

Install the Python dependencies:

```
pip install .
```

`synapse-config-generator` is a command provided to start the web UI. The
default port is `16333`. You can view the available options with:

```
synapse-config-generator --help
```

And start SCG with the following:

```
synapse-config-generator --configdir config_dir
```

## Development

The UI's source files are contained in `webui/`, whereas the python backend
is located in `synapseconfiggenerator/`.

By default the compiled webUI files are included in
`synapseconfiggenerator/static`. This is so Synapse admins don't need to set
up a node environment in order to get Synapse running. This does mean that
any changes to the UI requires the compiled webpack bundle and other files to
be included in every change, so be sure to include those changes in your PRs
if they are modified.

Install [yarn](https://yarnpkg.com):

```
npm install -g yarn
```

Install the web UI build dependencies:

```
yarn
```

You can build the UI with the following:

```
yarn run build
```

Alternatively, you can have webpack "watch" the source files so that it
rebuilds the UI automatically on every change:

```
yarn run watch
```
