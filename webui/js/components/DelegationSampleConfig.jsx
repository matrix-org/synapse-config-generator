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

import React from 'react';

import ContentWrapper from '../containers/ContentWrapper';
import DownloadOrCopy from './DownloadOrCopy';
import { DELEGATION_TYPES } from '../actions/constants';

export default ({
    delegationType,
    serverConfig,
    clientConfig,
    serverConfigFileName,
    clientConfigFileName,
    serverName,
    onClick,
}) => {

    if (delegationType == DELEGATION_TYPES.DNS) {

        return <ContentWrapper>
            <h1 className='setupCompleteTitle'>Configure Delegation</h1>
            <p>
                You will need to add the following SRV record to your DNS zone.
            </p>
            <pre>
                <code>
                    {clientConfig}
                </code>
            </pre>
            <DownloadOrCopy
                content={clientConfig}
                fileName={clientConfigFileName}
                onClick={onClick}
            />
        </ContentWrapper>

    } else {

        return <ContentWrapper>
            <h1 className='setupCompleteTitle'>Configure delegation</h1>
            <p>
                The delegation configuration needs to take place outside the installer.
            </p>
            <p>
                You'll need to host the following at
                https://{serverName}/.well-known/matrix/server
            </p>
            <pre>
                <code>
                    {serverConfig}
                </code>
            </pre>
            <DownloadOrCopy
                content={serverConfig}
                fileName={serverConfigFileName}
                onClick={onClick}
            />
            <p>
                You'll also need to host the following at
                https://{serverName}/.well-known/matrix/client
            </p>
            <pre>
                <code>
                    {clientConfig}
                </code>
            </pre>
            <DownloadOrCopy
                content={clientConfig}
                fileName={clientConfigFileName}
                onClick={onClick}
            />
        </ContentWrapper>;

    }

}
