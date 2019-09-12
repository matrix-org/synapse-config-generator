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

import baseConfigReducer from './base-config-reducer';

import configUIReducer from './config-ui-reducer';
import setupUIReducer from './setup-ui-reducer';


import { uiStateMapping } from './state';
import { BACK_UI } from '../actions/types';

export default (state = {
    setupUI: {
        activeBlocks: [],
    },
    configUI: {
    },
    baseConfig: {
        baseConfigChecked: false,
    },
}, action) => {

    const setupUI = setupUIReducer(state, action);

    const rState = {
        configUI: configUIReducer(state, action),
        setupUI,
        baseConfig: filterBaseConfig(
            baseConfigReducer(state.baseConfig, action),
            action,
            setupUI.activeBlocks.slice(0, setupUI.activeBlocks.length - 1),
        ),
    }

    console.log(action);
    console.log(rState);

    return rState;

};

const filterBaseConfig = (baseConfig, action, activeBlocks) => {

    if (action.type == BACK_UI) {

        return filterObj(
            baseConfig,
            Object.values(
                filterObj(
                    uiStateMapping,
                    [...activeBlocks, "base"]),
            ).flat(),
        );

    } else {

        return baseConfig;

    }

}

const filterObj = (object, filterList) => {

    return Object.keys(object)
        .filter(key => filterList.includes(key))
        .reduce((obj, key) => {

            obj[key] = object[key];
            return obj;

        },
            {},
        );

}
