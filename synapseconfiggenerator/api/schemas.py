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

BASE_CONFIG_SCHEMA = {
    "type": "object",
    "properties": {
        "server_name": {"type": "string", "minlength": 1},
        "report_stats": {"type": "boolean"},
        "log_config": {"type": "string", "minlength": 1},
        "media_store_path": {"type": "string", "minlength": 1},
        "uploads_path": {"type": "string", "minlength": 1},
        "pid_file": {"type": "string", "minlength": 1},
        "listeners": {"type": "array"},
        "acme": {"type": "object"},
        "database": {
            "type": "object",
            "properties": {
                "name": {"type": "string", "minlength": 1},
                "args": {"type": "object"},
            },
            "required": ["name"],
        },
        "tls_certificate_path": {"type": "string", "minlength": 1},
        "tls_private_key_path": {"type": "string", "minlength": 1},
        "server_config_in_use": {"type": "boolean"},
    },
    "required": ["server_name", "report_stats", "database"],
}

CERTS_SCHEMA = {
    "type": "object",
    "properties": {
        "cert": {"type": "string", "minlength": 1},
        "cert_key": {"type": "string", "minlength": 1},
    },
    "required": ["cert", "cert_key"],
}

PORTS_SCHEMA = {
    "type": "object",
    "properties": {"ports": {"type": "array"}},
    "required": ["ports"],
}

SECRET_KEY_SCHEMA = {
    "type": "object",
    "properties": {"server_name": {"type": "string", "minlength": "1"}},
    "required": ["server_name"],
}
