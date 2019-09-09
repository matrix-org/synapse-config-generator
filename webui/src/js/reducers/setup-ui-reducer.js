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

import { ADVANCE_UI, BACK_UI, BASE_CONFIG_CHECKED } from '../actions/types';
import {
    SETUP_ORDER,
} from './ui-constants';


const newActiveBlocks = activeBlocks => {

    return SETUP_ORDER.slice(0, activeBlocks.length + 1)

}

export default ({ setupUI, baseConfig }, action) => {

    if (!baseConfig.baseConfigChecked) {

        return setupUI;

    }
    if (baseConfig.setupDone) {

        return setupUI;

    }
    switch (action.type) {

        case ADVANCE_UI:
            return {
                activeBlocks: newActiveBlocks(setupUI.activeBlocks),
            };
        case BACK_UI:
            return {
                activeBlocks: resetUI(setupUI.activeBlocks, action.ui),
            };
        default:
            return setupUI;

    }

}

export const nextUI = current => SETUP_ORDER[SETUP_ORDER.lastIndexOf(current) + 1]

export const resetUI = (activeBlocks, destinationBlock) => {

    const indexOfDest = SETUP_ORDER.indexOf(destinationBlock);

    if (indexOfDest >= activeBlocks.length) {

        // The index is in the future
        return activeBlocks;

    }

    return activeBlocks.slice(0, indexOfDest + 1);

}
