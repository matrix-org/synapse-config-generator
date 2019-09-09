/*
Copyright 2018 The Matrix.org Foundation C.I.C.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

import React from 'react';
export default ({
    delegationFedPort,
    delegationClientPort,
    fedPort,
    clientPort,
    synapseServerName,
}) => `listen {delegationClientPort} ssl;
listen [::]:${delegationClientPort} ssl;
server_name ${synapseServerName};

  location /_matrix {
    proxy_pass http://localhost:${clientPort};
    proxy_set_header X-Forwarded-For $remote_addr;
  }
}

server {
  listen ${delegationFedPort} ssl default_server;
  listen [::]:${delegationFedPort} ssl default_server;
  server_name ${synapseServerName};

  location / {
    proxy_pass http://localhost:${fedPort};
    proxy_set_header X-Forwarded-For $remote_addr;
  }
}`
