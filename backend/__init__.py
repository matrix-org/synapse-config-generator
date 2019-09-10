#! python

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

import argparse
import os.path as path
import sys

from server import Server
from model import Model

from twisted.internet import endpoints, reactor
from twisted.web.server import Site

from twisted.logger import (
    eventsFromJSONLogFile,
    textFileLogObserver,
    globalLogPublisher,
)

globalLogPublisher.addObserver(textFileLogObserver(sys.stdout))

parser = argparse.ArgumentParser(description="Synapse configuration util")
parser.add_argument(
    "config_dir",
    metavar="CONFIG_DIR",
    type=str,
    help="Path the directory containing synapse's configuration files.",
)


args = parser.parse_args()

if not path.isdir(args.config_dir):
    print("'{}' is not a directory.".format(args.config_dir))
    exit(1)


model = Model(args.config_dir)

server = Server(model)

server.app.run("localhost", 8888)
