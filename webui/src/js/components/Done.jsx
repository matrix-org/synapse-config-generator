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

import React, { useState } from 'react';

import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import AccordionToggle from '../containers/AccordionToggle';
import { DONE_UI } from '../reducers/ui-constants';

export default ({ configDir }) => {


    return <Card>
        <AccordionToggle as={Card.Header} eventKey={DONE_UI} >
            Done
        </AccordionToggle>
        <Accordion.Collapse eventKey={DONE_UI}>
            <Card.Body>
                <p>
                    Synapse is running!
                </p>
                <p>
                    There are many settings to play with in the yaml files in
                    <code>{configDir}</code>.
                </p>
            </Card.Body>
        </Accordion.Collapse>
    </Card>;

}
