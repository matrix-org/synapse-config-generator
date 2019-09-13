/*
Copyright 2019 The Matrix.org Foundation C.I.C.

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
    SERVER_NAME_UI,
    STATS_REPORT_UI,
    KEY_EXPORT_UI,
    DELEGATION_OPTIONS_UI,
    PORT_SELECTION_UI,
    DATABASE_UI,
    COMPLETE_UI,
    TLS_UI,
} from './ui-constants';

const setupUI = "setupUI";
const activeBlocks = "activeBlocks";
const configUI = "configUI";
const baseConfig = "baseConfig";
const setupDone = "setupDone";
const baseConfigChecked = "baseConfigChecked";
const servername = "servername";
const reportStats = "reportStats";
const secretKeyLoaded = "secretKeyLoaded";
const secretKey = "secretKey";
const delegationType = "delegationType";
const delegationServername = "delegationServername";
const delegationFederationPort = "delegationFederationPort";
const delegationClientPort = "delegationClientPort";
const reverseProxy = "reverseProxy";
const tls = "tls";
const testingCertPaths = "testingCertPaths";
const uploadingCerts = "uploadingCerts";
const certPathInvalid = "certPathInvalid";
const certKeyPathInvalid = "certKeyPathInvalid";
const tlsCertPath = "tlsCertPath";
const tlsCertKeyPath = "tlsCertKeyPath";
const tlsCertFile = "tlsCertFile";
const tlsCertKeyFile = "tlsCertKeyFile";
const tlsPath = "tlsPath";
const verifyingPorts = "verifyingPorts";
const synapseFederationPortFree = "synapseFederationPortFree";
const synapseClientPortFree = "synapseClientPortFree";
const synapseFederationPort = "synapseFederationPort";
const synapseClientPort = "synapseClientPort";
const databaseConf = "databaseConf";
const configDir = "configDir";

const state = {
    [setupUI]: {
        [activeBlocks]: ["block1"],
    },
    [configUI]: {

    },
    [baseConfig]: {
        [setupDone]: true,
        [baseConfigChecked]: false,
        [configDir]: "sadfasdf",
        [servername]: "server_name",
        [reportStats]: false,
        [secretKeyLoaded]: false,
        [secretKey]: "asdfsadf",
        [delegationType]: "local|well_known|DNS_SRV",
        [delegationServername]: "name",
        [delegationFederationPort]: "\"\"|325",
        [delegationClientPort]: "\"\"|325",
        [reverseProxy]: "nginx|caddy|apache|haproxy|other|none",
        [tls]: "acme|tls|reverseproxy",
        [testingCertPaths]: true,
        [uploadingCerts]: true,
        [certPathInvalid]: true,
        [certKeyPathInvalid]: true,
        [tlsCertPath]: "sadfaf",
        [tlsCertKeyPath]: "sdfasdf",
        [tlsCertFile]: "sadfa;dlf;sad;fkla;sdlfjkas;dlfkjas;dflkja;sdfkljadf ------",
        [tlsCertKeyFile]: "sadfa;dlf;sad;fkla;sdlfjkas;dlfkjas;dflkja;sdfkljadf ------",
        [verifyingPorts]: true,
        [synapseFederationPortFree]: true,
        [synapseClientPortFree]: true,
        [synapseFederationPort]: 1234,
        [synapseClientPort]: 1234,
        [databaseConf]: "{dadtabaseType, databaseUsername, databasePassword, database}",
    },
}

export const uiStateMapping = {
    base: [
        setupDone,
        baseConfigChecked,
        configDir,
    ],
    [SERVER_NAME_UI]: [
        servername,
        secretKeyLoaded,
        secretKey,
    ],
    [STATS_REPORT_UI]: [
        reportStats,
    ],
    [KEY_EXPORT_UI]: [
    ],
    [DELEGATION_OPTIONS_UI]: [
        delegationType,
        delegationServername,
        delegationClientPort,
        delegationFederationPort,
    ],
    [TLS_UI]: [
        tls,
        reverseProxy,
        testingCertPaths,
        uploadingCerts,
        certPathInvalid,
        certKeyPathInvalid,
        tlsCertPath,
        tlsCertKeyPath,
        tlsCertFile,
        tlsCertKeyFile,
    ],
    [PORT_SELECTION_UI]: [
        verifyingPorts,
        synapseClientPort,
        synapseFederationPort,
        synapseClientPortFree,
        synapseFederationPortFree,
    ],
    [DATABASE_UI]: [
        databaseConf,
    ],
    [COMPLETE_UI]: [
    ],
}
