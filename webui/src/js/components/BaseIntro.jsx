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
