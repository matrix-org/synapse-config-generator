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

from os.path import join

import yaml

from synapse.config.homeserver import HomeServerConfig


def create_config(config_dir_path, data_dir_path, conf):
    """
    Generates a config by interfacing with synapse's
    `synapse.config.homeserver.HomeSErverConfig`. See
    `synapse.config._base.Config.generate_config` for all options.

    Args:
        config_dir_path (str): Path to config directory.
        data_dir_path (str): Path to the data directory.
        conf (dict): Options for the config generator.
            example conf = {
                "server_name": "banterserver",
                "listeners": [
                    {
                        "port": 8008,
                        "resources": [{"names": ["client", "federation"]}],
                        "tls": True,
                        "type": "http",
                    }
                ],
                "report_stats": True,
                "tls_certificate_path": self.tls_certificate_path,
                "tls_private_key_path": self.tls_private_key_path,
            }

    Returns
        (dict): {"filename": "config_content"}
    """

    server_name = conf["server_name"]
    del conf["server_name"]

    server_config_in_use = conf.get("server_config_in_use")
    if server_config_in_use is not None:
        del conf["server_config_in_use"]

    database_conf = conf.get("database")
    if database_conf is not None:
        del conf["database"]

        if database_conf["name"] == "sqlite3":
            database_conf.setdefault(
                "args", {"database": join(data_dir_path, "homeserver.db")}
            )

    config_args = {
        "config_dir_path": config_dir_path,
        "data_dir_path": data_dir_path,
        "server_name": server_name,
        "database_conf": database_conf,
        "generate_secrets": True,
        **conf,
    }

    home_server_config = HomeServerConfig()
    config_yaml = home_server_config.generate_config(**config_args)

    config = {}
    config.update(yaml.safe_load(config_yaml))

    home_server_config.generate_missing_files(config, config_dir_path)

    return {
        "homeserver.yaml": config_yaml
        + "\n\nserver_config_in_use: {}".format(server_config_in_use)
    }
