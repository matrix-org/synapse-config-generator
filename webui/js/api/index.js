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

import {
    CONFIG,
    SECRET_KEY,
    SERVER_NAME,
    SETUP_CHECK,
    CERT_PATHS,
    TEST_PORTS,
    START,
} from './constants';

const fetchAbs = fetch

export const getServerName = () =>
    fetchAbs(SERVER_NAME)
        .then(res => res.json())


export const postCertPaths = (certPath, certKeyPath) =>
    fetchAbs(
        CERT_PATHS,
        {
            method: 'POST',
            body: JSON.stringify({
                // eslint-disable-next-line camelcase
                cert_path: certPath,
                // eslint-disable-next-line camelcase
                cert_key_path: certKeyPath,
            }),
        },
    ).then(res => res.json())

export const postCerts = (cert, certKey) =>
    fetchAbs(
        CERT_PATHS,
        {
            method: 'POST',
            body: JSON.stringify({
                cert,
                // eslint-disable-next-line camelcase
                cert_key: certKey,
            }),
        },
    )

export const testPorts = (ports) =>
    fetchAbs(
        TEST_PORTS,
        {
            method: 'POST',
            body: JSON.stringify({
                ports,
            }),
        },
    ).then(res => res.json())

export const getSecretkey = serverName =>
    fetchAbs(
        SECRET_KEY,
        {
            method: 'POST',
            body: JSON.stringify({
                server_name: serverName,
            })
        }
    )
        .then(res => res.json())
        .then(json => json.secret_key)


export const postConfig = (config) =>
    fetchAbs(
        CONFIG,
        {
            method: 'POST',
            body: JSON.stringify(config),
        },
    );


// Checks if the server's base config has been setup.
export const getServerSetup = () => fetchAbs(SETUP_CHECK)
    .then(res => res.json())

export const startSynapse = () => fetchAbs(
    START,
    {
        method: 'POST',
    }
)
