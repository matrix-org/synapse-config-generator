Sytopology
==========

Sytopology is a config generator for synapse. It gathers together the critical
descision points of a first time synapse install and provides a pretty ui to
walk new users through them. The result of using sytopology is a yaml file akin
to the sample config found in
`synapse's docs`__.
Through using sytopology the user also gains a knowledge of the environment in
which synapse will be running.


Backend
=======

.. code::

  cd backend
  pip install .
  sytopology config_dir


Frontend
========
Start the Backend and then

.. code:: bash

  cd view/webui
  yarn install
  yarn watch

.. _sample_config https://github.com/matrix-org/synapse/tree/develop/docs
__ _sample_config
