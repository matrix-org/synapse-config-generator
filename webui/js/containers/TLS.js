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

import TLS from '../components/TLS';

import {
    advanceUI,
    setTls,
    setTlsCertPaths,
    setTlsCertFiles,
    setReverseProxy,
} from '../actions';

import { TLS_TYPES } from '../actions/constants';

const mapStateToProps = (state, ownProps) => ({
    testingCertPaths: state.baseConfig.testingCertPaths,
    uploadingCertPaths: state.baseConfig.uploadingCerts,
    certPathInvalid: state.baseConfig.certPathInvalid,
    certKeyPathInvalid: state.baseConfig.certKeyPathInvalid,
});

const mapDispathToProps = (dispatch) => ({
    onClickACME: () => {

        dispatch(advanceUI(TLS_TYPES.ACME));
        dispatch(setTls(TLS_TYPES.ACME));

    },
    onClickReverseProxy: proxyType => {

        dispatch(advanceUI());
        dispatch(setTls(TLS_TYPES.REVERSE_PROXY))
        dispatch(setReverseProxy(proxyType))

    },
    onClickCertPath: (certPath, certKeyPath, callback) => {

        dispatch(setTlsCertPaths(certPath, certKeyPath, callback));

    },
    onClickCertUpload: (tlsCertFile, tlsKeyFile, callback) => {

        dispatch(setTlsCertFiles(tlsCertFile, tlsKeyFile));
        callback();

    },
});

export default connect(
    mapStateToProps,
    mapDispathToProps,
)(TLS)
