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

import React, { useState } from 'react';

import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import useAccordionToggle from 'react-bootstrap/useAccordionToggle';

import { DELEGATION_TYPES } from '../actions/constants';
import { DELEGATION_OPTIONS_UI } from '../reducers/ui-constants';
import AccordionToggle from '../containers/AccordionToggle';
import { nextUI } from '../reducers/setup-ui-reducer';
import InlineError from './InlineError';

const DELEGATION_LINK =
    "https://github.com/matrix-org/synapse/blob/master/docs/federate.md"

export default ({ servername, skip, onClick }) => {

    const defaultType = DELEGATION_TYPES.DNS;
    const [type, setType] = useState(defaultType);

    const [delegatedServername, setDelegatedServerName] = useState("");

    const [fedPort, setFedPort] = useState("");
    const [clientPort, setClientPort] = useState("");

    const [clientPortValid, setClientPortValid] = useState(true)
    const [fedPortValid, setFedPortValid] = useState(true)

    const updateValidity = (port, setValid) => setValid(
        !port ||
        (!isNaN(port) && 0 < port && port <= 65535),
    )

    const onFederationChange = event => {

        const val = event.target.value;
        setFedPort(val);
        updateValidity(val, setFedPortValid);

    }

    const onClientChange = event => {

        const val = event.target.value;
        setClientPort(val);
        updateValidity(val, setClientPortValid);

    }

    const toggle = useAccordionToggle(nextUI(DELEGATION_OPTIONS_UI));

    const portSelection = <div>
        <p>Please enter the domain name of the server synapse is installed on.</p>
        <input
            type="text"
            onChange={e => setDelegatedServerName(e.target.value.toLowerCase())}
            autoFocus
            placeholder="Enter server name"
            value={delegatedServername}
            className="lowercaseInput"
        />
        <p>
            Homeserver Port
        </p>
        <InlineError error={fedPortValid ? undefined : "Invalid port"}>
            <input
                type="text"
                onChange={onFederationChange}
                className={fedPortValid ? undefined : "invalid"}
                placeholder="Use Default 8448"
                value={fedPort}
            />
        </InlineError>
        <p>
            Client Port
        </p>
        <InlineError error={clientPortValid ? undefined : "Invalid port"}>
            <input
                type="text"
                onChange={onClientChange}
                className={clientPortValid ? undefined : "invalid"}
                placeholder="Use Default 443"
                value={clientPort}
            />
        </InlineError>
        <button
            disabled={
                delegatedServername && clientPortValid && fedPortValid ?
                    undefined :
                    true
            }
            onClick={() => {

                toggle();
                onClick(type, delegatedServername, fedPort, clientPort)

            }}
        >
            Use {type}
        </button>
    </div >

    return <Card>
        <AccordionToggle as={Card.Header} eventKey={DELEGATION_OPTIONS_UI}>
            Delegation (optional)

        </AccordionToggle>
        <Accordion.Collapse eventKey={DELEGATION_OPTIONS_UI}>
            <Card.Body>
                <p>
                    If you'd like your synapse to be hosted on a different server to the
                    one known on the network by '{servername}' you can use
                    delegation.&nbsp;
                    <a
                        href={DELEGATION_LINK}
                        target="_blank"
                    >
                        Learn more
                </a>
                </p>
                <p>
                    If you're not sure if you need delegation, we recommending
                    skipping this step.
                </p>
                <button onClick={() => {

                    toggle();
                    skip();

                }}>
                    Skip
                </button>
                <hr />
                <p>
                    Other federation servers will connect to {servername}:8448
                    over the network.
                </p>
                <p>
                    There are two forms of delegation:
                </p>

                <Tabs defaultActiveKey={defaultType} onSelect={k => setType(k)}>
                    <Tab eventKey={DELEGATION_TYPES.DNS} title={DELEGATION_TYPES.DNS}>
                        <p>
                            You will need access to {servername}'s domain zone DNS
                            records. This method also requires the synapse install's
                            server to provide a valid TLS cert for {servername}
                        </p>
                        <p>
                            You will need to add an SRV record to {servername}'s DNS zone.
                            (Once again, we'll print the SRV record out for you later.)
                        </p>
                        {portSelection}
                    </Tab>
                    <Tab
                        eventKey={DELEGATION_TYPES.WELL_KNOWN}
                        title={DELEGATION_TYPES.WELL_KNOWN}
                    >
                        <p>
                            {servername} provides the url
                            https://{servername}/.well-known/matrix/server which gives
                            federating servers information about how to contact the actual
                            server hosting the synapse install. (Don't worry! We'll print
                            out the .well-known file for you later.)
                        </p>
                        {portSelection}
                    </Tab>
                </Tabs>
            </Card.Body>
        </Accordion.Collapse>
    </Card>

}
