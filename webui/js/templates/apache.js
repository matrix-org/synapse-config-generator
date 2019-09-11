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

export default ({
    delegationFedPort,
    delegationClientPort,
    fedPort,
    clientPort,
    synapseServerName,
}) => `
<VirtualHost *:${delegationClientPort}>
    SSLEngine on
    ServerName ${synapseServerName};

    AllowEncodedSlashes NoDecode
    ProxyPass /_matrix http://127.0.0.1:${clientPort}/_matrix nocanon
    ProxyPassReverse /_matrix http://127.0.0.1:${clientPort}/_matrix
</VirtualHost>

<VirtualHost *:${delegationFedPort}>
    SSLEngine on
    ServerName ${synapseServerName};

    AllowEncodedSlashes NoDecode
    ProxyPass /_matrix http://127.0.0.1:${fedPort}/_matrix nocanon
    ProxyPassReverse /_matrix http://127.0.0.1:${fedPort}/_matrix
</VirtualHost>
`
