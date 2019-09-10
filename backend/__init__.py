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
import sys
from os import path
from os import devnull

from twisted.internet import endpoints, reactor
from twisted.logger import (
    eventsFromJSONLogFile,
    globalLogPublisher,
    textFileLogObserver,
)
from twisted.web.server import Site

from model import Model
from server import Server

port = 16333

parser = argparse.ArgumentParser(description="Synapse configuration util")

parser.add_argument(
    "config_dir",
    metavar="CONFIG_DIR",
    type=str,
    help="Path the directory containing synapse's configuration files.",
)

parser.add_argument("-v", action="store_true", help="Use verbose logging")

parser.add_argument(
    "--port", type=int, default=16333, help="The port on which the webui is served"
)

args = parser.parse_args()

if args.v:
    logFile = None
else:
    logFile = open(devnull, "w")

if args.port:
    port = args.port

if not path.isdir(args.config_dir):
    print("'{}' is not a directory.".format(args.config_dir))
    exit(1)


server = Server(Model(args.config_dir))


print("\nGo to https://localhost:{}\n".format(port))
server.app.run("localhost", port, logFile=logFile)

