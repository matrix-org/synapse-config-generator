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

import ContentWrapper from '../containers/ContentWrapper';
import ButtonDisplay from './ButtonDisplay';
import DownloadOrCopy from './DownloadOrCopy';
import { REVERSE_PROXY_TYPES } from '../actions/constants';

export default ({ proxyType, sampleConfig, fileName, onClick }) => {

    return <ContentWrapper>
        <h1 className='setupCompleteTitle'>Configure the ReverseProxy</h1>
        <p>
            It's time for you to setup the reverse proxy outside of this installer.
        </p>
        {
            proxyType == REVERSE_PROXY_TYPES.OTHER ?
                <p>
                    Here's a sample config for Apache. Since you chose 'other'
                    for your reverse proxy. You'll have to figure it out
                    for yourself. We believe in you.
                </p>
                :
                <p>
                    We can't do it for you
                    but here's the sample configuration for your {proxyType} proxy.
                </p>
        }
        <pre>
            <code>
                {sampleConfig}
            </code>
        </pre>
        <DownloadOrCopy content={sampleConfig} fileName={fileName} onClick={onClick} />
    </ContentWrapper>;

}
