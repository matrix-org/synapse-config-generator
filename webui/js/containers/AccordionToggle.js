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

import AccordionToggle from '../components/AccordionToggle';
import { resetUI } from '../actions';
import { DONE_UI } from '../reducers/ui-constants';

const mapStateToProps = (state, { eventKey, as, children }) => ({
    active: state.setupUI.activeBlocks.includes(eventKey) &&
        state.setupUI.activeBlocks[state.setupUI.activeBlocks.length - 1] != DONE_UI,
    open: state.setupUI.activeBlocks[state.setupUI.activeBlocks.length - 1] == eventKey,
    eventKey,
    as,
    children,
});

const mapDispathToProps = (dispatch, { eventKey }) => ({
    reset: () => dispatch(resetUI(eventKey)),
});

export default connect(
    mapStateToProps,
    mapDispathToProps,
)(AccordionToggle);
