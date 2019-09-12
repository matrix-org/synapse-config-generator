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

import { connect } from 'react-redux';

import ReverseProxySampleConfig from '../components/ReverseProxySampleConfig';

import { REVERSE_PROXY_TYPES } from '../actions/constants';

import apacheConfig from '../templates/apache';
import caddyConfig from '../templates/caddy';
import haproxyConfig from '../templates/haproxy';
import nginxConfig from '../templates/nginx';

const sampleConfig = reverseProxyType => {

    switch (reverseProxyType) {

        case REVERSE_PROXY_TYPES.APACHE:
            return apacheConfig;
        case REVERSE_PROXY_TYPES.CADDY:
            return caddyConfig;
        case REVERSE_PROXY_TYPES.HAPROXY:
            return haproxyConfig;
        case REVERSE_PROXY_TYPES.NGINX:
            return nginxConfig;
        case REVERSE_PROXY_TYPES.OTHER:
            return otherConfig;
        default:
            return () => { }

    }

}

const mapStateToProps = state => ({
    proxyType: state.baseConfig.reverseProxy,
    sampleConfig: sampleConfig(state.baseConfig.reverseProxy)({
        delegationFedPort: state.baseConfig.delegationFederationPort ?
            state.baseConfig.delegationFederationPort :
            8448,
        delegationClientPort: state.baseConfig.delegationClientPort ?
            state.baseConfig.delegationClientPort :
            443,
        fedPort: state.baseConfig.synapseFederationPort,
        clientPort: state.baseConfig.synapseClientPort,
        synapseServerName: state.baseConfig.delegationServerName ?
            state.baseConfig.delegationServerName :
            state.baseConfig.servername,
    }),
    fileName: "synapse_reverse_proxy.conf",
});

const mapDispatchToProps = (dispatch, { onClick }) => ({
    onClick,
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ReverseProxySampleConfig);
