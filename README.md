# synapse-config-generator (SCG)

`synapse-config-generator` is a config generator for Synapse. It gathers
together the critical decision points of a first time Synapse install and
provides a pretty UI to walk new users through them.

The result of using SCG is one or more yaml files akin to Synapse's [sample
config](https://github.com/matrix-org/synapse/blob/develop/docs/sample_config.yaml).

## Running

Create and activate a new Python virtual environment:

```
virtualenv -p python3 env
source env/bin/activate
```

Install the Python dependencies:

```
pip install -e .
```

`synapse-config-generator` is a script provided to start the web UI. The
default port is `16333`. You can view the available options with:

```
synapse-config-generator --help
```

And start SCG with the following:

```
synapse-config-generator --configdir config_dir
```

## Development

### Running python tests

Tests are ran using Twisted's `trial` tool. First install the python
dependencies necessary for running the tests:

```
pip install -e ".[tests]"
```

Then simply use the following command to run them:

```
trial
```

### Modifying the WebUI

The UI's source files are contained in the `webui` directory, whereas the
Python backend is located in the `synapseconfiggenerator` directory.

By default the compiled webUI files are included in
`synapseconfiggenerator/static`. Thus Synapse admins do not need to set up a
node environment in order to run the generator. This does mean that any changes
to the UI requires the compiled webpack bundle and other files to be included
in every change, so be sure to include those changes in your PRs if they are
modified.

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
