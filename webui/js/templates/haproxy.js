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

/* eslint-disable max-len */
export default ({
    delegationFedPort,
    delegationClientPort,
    fedPort,
    clientPort,
    synapseServerName,
}) => {

    if (fedPort == clientPort) {

        return `frontend https
  bind :::${delegationClientPort} v4v6 ssl crt /etc/ssl/haproxy/ strict-sni alpn h2,http/1.1

  # Matrix client traffic
  acl matrix-host hdr(host) -i ${synapseServerName}
  acl matrix-path path_beg /_matrix

  use_backend matrix if matrix-host matrix-path

frontend matrix-federation
  bind :::${delegationFedPort} v4v6 ssl crt /etc/ssl/haproxy/<your_tls_cert>.pem alpn h2,http/1.1
  default_backend matrix

backend matrix
  server matrix 127.0.0.1:${fedPort}
`

    } else {

        return `frontend https
  bind:::${delegationClientPort} v4v6 ssl crt /etc/ssl/haproxy/ strict-sni alpn h2, http / 1.1

# Matrix client traffic
acl matrix-host hdr(host) -i ${synapseServerName}
acl matrix-path path_beg /_matrix

use_backend matrix-client if matrix-host matrix-path

frontend matrix - federation
bind::: ${delegationFedPort} v4v6 ssl crt /etc/ssl/haproxy/<your_tls_cert>.pem alpn h2,http/1.1
default_backend matrix

backend matrix
  server matrix 127.0.0.1:${fedPort}

backend matrix-client 127.0.0.1:${clientPort}`

    }

}
