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

from functools import wraps

from canonicaljson import json
from jsonschema import validate

from contextlib import closing
import socket


def validate_schema(schema):
    def _wrap_validate(func):
        @wraps(func)
        def _do_validate(self, request):
            body = json.loads(request.content.read())
            print(body)
            validate(instance=body, schema=schema)
            return func(self, request, body)

        return _do_validate

    return _wrap_validate


def port_checker(port):
    if port < 0 or 65535 < port:
        return False

    with closing(socket.socket(socket.AF_INET, socket.SOCK_STREAM)) as sock:
        try:
            sock.bind(("0.0.0.0", port))
            sock.listen()
            return True
        except:
            return False


def log_body_if_fail(func):
    @wraps(func)
    def _log_wrapper(self, request):
        try:
            return func(self, request)
        except Exception:
            body = json.loads(request.content.read())
            print(body)
            raise

    return _log_wrapper
