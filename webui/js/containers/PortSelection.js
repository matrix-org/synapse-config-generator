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

import PortSelection from '../components/PortSelection';

import { setSynapsePorts } from '../actions';
import { TLS_TYPES } from '../actions/constants';

const defaultFedPort = state => {

    if (state.tls == TLS_TYPES.REVERSE_PROXY) {

        return 8008;

    }

    return state.delegationFederationPort ? state.delegationFederationPort : 8448;

}

const defaultClientPort = state => {

    if (state.tls == TLS_TYPES.REVERSE_PROXY) {

        return 8008;

    }

    return state.delegationFederationPort ?
        state.delegationFederationPort :
        443;

}

const mapStateToProps = ({ baseConfig }) => ({
    servername: baseConfig.servername,
    verifyingPorts: baseConfig.verifyingPorts,
    fedPortInUse: baseConfig.synapseFederationPortFree != undefined ?
        !baseConfig.synapseFederationPortFree :
        false,
    clientPortInUse: baseConfig.synapseClientPortFree != undefined ?
        !baseConfig.synapseClientPortFree :
        false,
    canChangePorts: baseConfig.tls == TLS_TYPES.REVERSE_PROXY,
    defaultFedPort: defaultFedPort(baseConfig),
    defaultClientPort: defaultClientPort(baseConfig),
});

const mapDispathToProps = (dispatch) => ({
    onClick: (fedPort, clientPort, callback) => {

        dispatch(setSynapsePorts(fedPort, clientPort, callback));

    },
});

export default connect(
    mapStateToProps,
    mapDispathToProps,
)(PortSelection);
