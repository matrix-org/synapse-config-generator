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

import React from 'react';
import ButtonDisplay from './ButtonDisplay';

const download = (filename, text) => {

    const e = document.createElement('a');
    e.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    e.setAttribute('download', filename);

    e.style.display = 'none';
    document.body.appendChild(e);

    e.click();

    document.body.removeChild(e);

}

export default ({ content, fileName, onClick = () => undefined }) => {

    const downloadOnClick = () => {

        download(fileName, content);
        onClick();

    }

    const copyOnClick = () => {

        navigator.clipboard.writeText(content);
        onClick();

    }

    return <ButtonDisplay>
        <div className='buttonGroup'>
            <button onClick={downloadOnClick}>Download</button>
            <span className='or'>or</span>
            <button onClick={copyOnClick}>Copy</button>
        </div>
    </ButtonDisplay>

}
