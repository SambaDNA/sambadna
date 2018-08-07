import * as React from 'react';
import { connect } from 'react-redux';
import { extend } from '../../lib/Extender';
import { IApplicationState } from '../../store';
import * as ClientStore from '../../store/Client';
import * as ConfigStore from '../../store/Config';
import { RouteComponentProps } from 'react-router';
import TopBar from '../TopBar';
import { Card, Typography } from '@material-ui/core';

export type PageProps =
    ClientStore.IClientState
    & typeof ClientStore.actionCreators
    & typeof ConfigStore.actionCreators
    & RouteComponentProps<{}>;

class HomePage extends React.Component<PageProps> {
    public render() {
        return (
            <div>
                <TopBar title="About SambaDNA" />
                <Card style={{ margin: '8px', padding: '8px' }}>
                    <Typography variant="body2">
                        This project contains PoC's and Tests to demonstrate
                    some features of future SambaPOS versions.

                    </Typography>
                </Card>
                <Card style={{ margin: '8px', padding: '8px' }}>
                    <Typography variant="body1">
                        Version: {process.env.REACT_APP_VERSION}
                    </Typography>
                </Card>
                <Card style={{ margin: '8px', padding: '8px' }}>
                    <a href="https://github.com/SambaDNA">
                        https://github.com/SambaDNA
                        </a>
                </Card>
            </div>
        );
    }
}

export default connect(
    (state: IApplicationState) => state.client,
    extend(ClientStore.actionCreators, ConfigStore.actionCreators)
)(HomePage);