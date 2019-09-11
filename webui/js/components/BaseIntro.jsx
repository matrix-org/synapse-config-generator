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

import ButtonDisplay from './ButtonDisplay';
import MatrixLogo from './MatrixLogo';
import ContentWrapper from '../containers/ContentWrapper';

import useAccordionToggle from 'react-bootstrap/useAccordionToggle';
import { nextUI } from '../reducers/setup-ui-reducer';

export default ({ started, servername, onClick }) => {

    const toggle = useAccordionToggle(nextUI())
    const wrappedOnClick = () => {

        onClick();
        toggle();

    }

    const prompt = servername ?
        "Configuring " + servername :
        "Let's configure your Synapse server."

    return <ContentWrapper>
        <div className='baseintro'>
            <MatrixLogo />
            <h1>Setting up Synapse</h1>
            <p>{prompt}</p>
            {
                !started ?
                    <ButtonDisplay>
                        <button onClick={wrappedOnClick}>Get Started</button>
                    </ButtonDisplay> :
                    undefined
            }
        </div>
    </ContentWrapper>

}
