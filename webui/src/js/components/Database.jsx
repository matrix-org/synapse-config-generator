import React from 'react';

import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import useAccordionToggle from 'react-bootstrap/useAccordionToggle';

import {
    DATABASE_TYPES,
} from '../actions/constants'

import { DATABASE_UI } from '../reducers/ui-constants';

import AccordionToggle from '../containers/AccordionToggle';

import { nextUI } from '../reducers/setup-ui-reducer';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';

const defaultDatabase = DATABASE_TYPES.POSTGRES;
const defaultHost = "localhost"

class Database extends React.Component {

    constructor(props) {

        super(props);
        this.state = {
            databaseType: defaultDatabase,
            databaseHost: defaultHost,
            postgresDatabase: undefined,
            databaseUsername: undefined,
            databasePassword: undefined,
            database: undefined,
        }

    }

    render() {

        const onClick = (() => useAccordionToggle(nextUI(DATABASE_UI), this.props.onClick(this.state)));
        return <Card>
            <AccordionToggle as={Card.Header} eventKey={DATABASE_UI}>
                Database
            </AccordionToggle>
            <Accordion.Collapse eventKey={DATABASE_UI}>
                <Card.Body>
                    <p>Synapse can use either SQLite3 or Postgres as it's database.</p>
                    <p>Postgres is recommended.</p>

                    <Tabs
                        defaultActiveKey={defaultDatabase}
                    >
                        <Tab eventKey={DATABASE_TYPES.POSTGRES} title={"Postgres"}>
                            This will connect to the given Postgres database via
                            {DATABASE_TYPES.POSTGRES}
                            <p>
                                Host
                            </p>
                            <input
                                type="text"
                                onChange={e => this.setState({
                                    databaseHost:
                                        e.target.value ?
                                            e.target.value :
                                            hostDefault,
                                })}
                                autoFocus
                                placeholder="localhost"
                            />
                            <p>
                                Database name
                            </p>
                            <input
                                type="text"
                                onChange={e => this.setState({
                                    database: e.target.value,
                                })}
                                placeholder="unspecified"
                            />
                            <p>
                                User name
                            </p>
                            <input
                                type="text"
                                onChange={e => this.setState({
                                    databaseUsername: e.target.value,
                                })}
                                placeholder="unspecified"
                            />
                            <p>
                                Password
                            </p>
                            <input
                                type="text"
                                onChange={e => this.setState({
                                    databasePassword: e.target.value,
                                })}
                                placeholder="unspecified"
                            />
                            <button
                                className='inputButton'
                                disabled={this.state.databaseHost ? undefined : true}
                                onClick={onClick}
                            >Use Postgres</button>
                        </Tab>
                        <Tab
                            eventKey={DATABASE_TYPES.SQLITE3}
                            title={DATABASE_TYPES.SQLITE3}
                        >
                            <button
                                className='inputButton'
                                onClick={onClick}
                            >Use {DATABASE_TYPES.SQLITE3}</button>
                        </Tab>
                    </Tabs>
                </Card.Body>
            </Accordion.Collapse>
        </Card >

    }

}

export default Database;