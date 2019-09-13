# -*- coding: utf-8 -*-
# Copyright 2014 - 2016 OpenMarket Ltd
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

import subprocess
from os.path import abspath, dirname, isabs, join

from canonicaljson import json
from twisted.web.static import File

from klein import Klein
from synapseconfiggenerator.model import constants

from .schemas import BASE_CONFIG_SCHEMA, CERTS_SCHEMA, PORTS_SCHEMA, SECRET_KEY_SCHEMA
from .utils import port_checker, validate_schema

from pkg_resources import resource_filename


class Server:
    """Server is a klein-based api for creating configs. It uses a Model
    instance to broker communication with synapse."""

    app = Klein()

    def __init__(self, model):
        self.model = model

    def server_webui(self, request):
        """Serves the static files for the webui."""
        return File(resource_filename("synapseconfiggenerator", "static/"))

    # Serves the static files at root. The branch option allows for
    # subdirectories to be accessed. In this case it allows access to the css
    # files.
    app.route("/", branch=True)(server_webui)

    @app.route("/setup", methods=["GET"])
    def get_config_setup(self, request):
        """Queried by the webui at startup. This api indicates whether the
        config exists and has been used by synapse through CONFIG_LOCK. It
        also tells the ui where the config directory is in order to make
        relative paths absolute.

        CONFIG_LOCK is true if the Model believes the config has been used by
        a running synapse instance.

        CONFIG_LOCK is false if any existing configs do not appear to have been
        used or no config exists.
        """
        return json.dumps(
            {
                constants.CONFIG_LOCK: self.model.config_in_use(),
                "config_dir": self.model.config_dir,
            }
        )

    @app.route("/secretkey", methods=["POST"])
    @validate_schema(SECRET_KEY_SCHEMA)
    def get_secret_key(self, request, body):
        """
        Makes the model write out a secret key file and returns it's content
        to the caller. Requires the servername to be passed.
        """
        return json.dumps(
            {"secret_key": self.model.generate_secret_key(body["server_name"])}
        )

    @app.route("/config", methods=["GET"])
    def get_config(self, request):
        """Returns the text content of the config in config_dir"""
        return str(self.model.get_config())

    @app.route("/config", methods=["POST"])
    @validate_schema(BASE_CONFIG_SCHEMA)
    def write_config(self, request, body):
        """
        Writes out a full, commented config for synapse based on the
        arguments passed by the requester. The body of the request can be
        composed of any of the args in
        `synapse.config._base.Config.generate_config`
        """
        self.model.write_config(body)

    @app.route("/testcertpaths", methods=["POST"])
    def test_cert_paths(self, request):
        """
        Given an array of file paths this returns an array of booleans
        stating that the file exists and that synapse has read access to
        it.
        """
        body = json.loads(request.content.read())
        result = {}
        config_path = self.model.config_dir
        for name, path in body.items():
            if not isabs(path):
                path = abspath(join(config_path, path))
            try:
                with open(path, "r"):
                    result[name] = {"invalid": False, "absolute_path": path}
            except Exception:
                result[name] = {"invalid": True}
        return json.dumps(result)

    @app.route("/ports", methods=["POST"])
    @validate_schema(PORTS_SCHEMA)
    def check_ports(self, request, body):
        """
        Given an array of ports this returns an array of booleans specifying that
        the api was capable of starting a process listening on that port. This
        gives a loose indication that a port is generally available.
        """
        results = []
        for port in body["ports"]:
            results.append(port_checker(port))
        return json.dumps({"ports": results})

    @app.route("/start", methods=["POST"])
    def start_synapse(self, request):
        """Starts synapse as a deamonised process using synctl using the
        config_dir as the config directory."""
        print("Starting synapse")
        subprocess.check_output(["synctl", "start", self.model.config_dir])

    @app.route("/favicon.ico")
    def noop(self, request):
        """We don't have a favison yet. matrix logo perhaps?"""
        return
