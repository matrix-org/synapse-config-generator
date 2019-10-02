synapse-config-generator (SCG)
==============================

synapse-config-generator is a config generator for synapse. It gathers together
the critical decision points of a first time synapse install and provides a
pretty ui to walk new users through them. The result of using
SCG is a yaml file akin to the sample config found in
`synapse's docs <https://github.com/matrix-org/synapse/tree/develop/docs>`_.
Through using SCG the user also gains a knowledge of the environment in
which synapse will be running.

Getting started
===============

.. code::

  pip install .
  synapse-config-generator --configdir config_dir
