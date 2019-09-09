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

import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import useAccordionToggle from 'react-bootstrap/useAccordionToggle';

import ReverseProxySampleConfig from '../containers/ReverseProxySampleConfig'
import DelegationSampleConfig from '../containers/DelegationSampleConfig';
import AccordionToggle from '../containers/AccordionToggle';
import InlineError from '../components/InlineError';

import { TLS_TYPES, DELEGATION_TYPES } from '../actions/constants';
import { COMPLETE_UI } from '../reducers/ui-constants';
import { nextUI } from '../reducers/setup-ui-reducer';

const synctlLink = "https://manpages.debian.org/testing/matrix-synapse/synctl.1.en.html";

class CompleteSetup extends React.Component {

    constructor(props) {

        super(props);
        this.state = {
            revProxyDownloaded: false,
            delegationDownloaded: false,
            body: 0,
            onClick: () => props.onClick(useAccordionToggle(nextUI(COMPLETE_UI))),
        }

    }

    render() {

        const revProxyBody = <Card.Body>
            <ReverseProxySampleConfig onClick={() => this.setRevProxyDownloaded(true)} />
            <button
                disabled={!this.state.revProxyDownloaded}
                onClick={() => this.setBody(this.state.body + 1)}
            >Next</button>
        </Card.Body >

        const delegationBody = <Card.Body>
            <DelegationSampleConfig onClick={() => this.setDelegationDownloaded(true)} />
            <button
                disabled={!this.state.delegationDownloaded}
                onClick={() => this.setBody(this.state.body + 1)}
            >Next</button>
        </Card.Body>

        const finishedBody = <Card.Body>
            <InlineError error={
                this.props.synapseStartFailed ? "Couldn't start synapse." : undefined
            }>
                <button onClick={this.state.onClick}>Start Synapse</button>
            </InlineError>
            <hr />
            <p>
                In future use <a href={synctlLink}>synctl</a> to start and stop synapse.
                Use the following to start synapse again:
            </p>

            <pre>
                <code>
                    synctl start {this.props.configDir}
                </code>
            </pre>
        </Card.Body>

        const show = [];

        if (this.props.tlsType == TLS_TYPES.REVERSE_PROXY) {

            show.push(revProxyBody);

        }
        if (this.props.delegationType != DELEGATION_TYPES.LOCAL) {

            show.push(delegationBody)

        }
        show.push(finishedBody)



        return <Card>
            <AccordionToggle as={Card.Header} eventKey={COMPLETE_UI}>
                Setup Complete
        </AccordionToggle>
            <Accordion.Collapse eventKey={COMPLETE_UI}>
                {show[this.state.body]}
            </Accordion.Collapse>
        </Card>

    }

    setRevProxyDownloaded(downloaded) {

        this.setState({
            revProxyDownloaded: downloaded,
        })

    }

    setDelegationDownloaded(downloaded) {

        this.setState({
            delegationDownloaded: downloaded,
        })

    }

    setBody(body) {

        this.setState({
            body: body,
        })

    }

}

export default CompleteSetup;