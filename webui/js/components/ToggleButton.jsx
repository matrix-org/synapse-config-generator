import React from 'react';
import useAccordionToggle from 'react-bootstrap/useAccordionToggle';
import { nextUI } from '../reducers/setup-ui-reducer';

export default ({ eventKey, onClick, children }) => {

    const toggle = useAccordionToggle(nextUI(eventKey), onClick)
    return <button onClick={toggle}>{children}</button>

}