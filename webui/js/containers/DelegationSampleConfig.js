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

import { connect } from 'react-redux';

import DelegationSampleConfig from '../components/DelegationSampleConfig';

import DNSConfig from '../templates/dns-srv';
import FedWellKnownConfig from '../templates/federation-well-known'
import ClientWellKnownConfig from '../templates/client-well-known'
import { DELEGATION_TYPES } from '../actions/constants';

const serverConfig = state => {

    if (state.delegationType == DELEGATION_TYPES.DNS) {

        return undefined;

    } else {

        return FedWellKnownConfig({
            synapseServerName: state.delegationServername,
            delegationSynapsePort: state.delegationFederationPort ?
                state.delegationFederationPort :
                8448,
        });

    }

}

const clientConfig = state => {

    if (state.delegationType == DELEGATION_TYPES.WELL_KNOWN) {

        return ClientWellKnownConfig({
            synapseServerName: state.delegationServername,
            delegationClientPort: state.delegationClientPort ?
                state.delegationClientPort :
                443,
        });

    } else {

        return DNSConfig({
            serverName: state.servername,
            synapseServerName: state.delegationServername,
            delegationClientPort: state.delegationClientPort ?
                state.delegationClientPort :
                443,
        })

    }

}

const mapStateToProps = state => ({
    delegationType: state.baseConfig.delegationType,
    serverConfig: serverConfig(state.baseConfig),
    clientConfig: clientConfig(state.baseConfig),
    serverConfigFileName: `${state.baseConfig.servername}_delegation.conf`,
    clientConfigFileName: `${state.baseConfig.servername}_client_delegation.conf`,
    serverName: state.baseConfig.servername,
});

const mapDispatchToProps = (dispatch, { onClick }) => ({
    onClick,
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(DelegationSampleConfig);
