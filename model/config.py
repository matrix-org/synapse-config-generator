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

from synapse.config.database import DatabaseConfig
from synapse.config.homeserver import HomeServerConfig
from synapse.config.logger import LoggingConfig
from synapse.config.server import ServerConfig
from synapse.config.tls import TlsConfig


def create_config(config_dir_path, data_dir_path, conf):
    server_name = conf["server_name"]
    del conf["server_name"]

    server_config_in_use = conf["server_config_in_use"]
    del conf["server_config_in_use"]

    database_conf = conf["database"]
    del conf["database"]

    if database_conf["name"] == "sqlite3":
        database_conf.setdefault(
            "args", {"database": join(data_dir_path, "homeserver.db")}
        )

    base_configs = [ServerConfig, DatabaseConfig, TlsConfig]

    # Generate configs for all the ones we didn't cover explicitely
    uninitialized_configs = [
        x for x in list(HomeServerConfig.__bases__) if x not in base_configs
    ]

    class BaseConfig(*base_configs):
        pass

    class AdvancedConfig(*uninitialized_configs):
        pass

    config_args = {
        "config_dir_path": config_dir_path,
        "data_dir_path": data_dir_path,
        "server_name": server_name,
        **conf,
        "database_conf": database_conf,
        "generate_secrets": True,
    }

    base_config = BaseConfig()
    advanced_config = AdvancedConfig()

    base_config_text = base_config.generate_config(**config_args)
    advanced_config_text = advanced_config.generate_config(**config_args)

    config = {}
    config.update(yaml.safe_load(base_config_text))
    config.update(yaml.safe_load(advanced_config_text))

    base_config.generate_missing_files(config, config_dir_path)
    advanced_config.generate_missing_files(config, config_dir_path)

    return {
        "homeserver_basic_config.yaml": base_config_text
        + "\n\nserver_config_in_use: {}".format(server_config_in_use),
        "homeserver_advanced_config.yaml": advanced_config_text,
    }
