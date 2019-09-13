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

# Paths
DATA_SUBDIR = "data"

# Config options
SERVER_NAME = "server_name"
CONFIG_LOCK = "server_config_in_use"
SECRET_KEY = "macaroon_secret_key"

CONFIG_LOCK_DATA = """

##  CONFIG LOCK ##


# Specifies whether synapse has been started with this config.
# If set to True the setup util will not go through the initialization
# phase which sets the server name and server keys.
{}: {{}}


""".format(
    CONFIG_LOCK
)
