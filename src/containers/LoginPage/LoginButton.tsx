import * as React from 'react';
import { Button, WithStyles } from '@material-ui/core';
import decorate, { IStyle } from './style';
import { vibrate } from '../../lib/helpers';

interface ILoginButtonProps {
    value: string;
    icon?: string;
    onClick: (value: string) => void;
}

type Props = ILoginButtonProps & WithStyles<keyof IStyle>;

const LoginButton = (props: Props) => {
    return (
        <Button
            className={props.classes.loginButton}
            component="div"
            variant="raised"
            color="primary"
            onClick={(e) => {
                vibrate(10);
                props.onClick(props.value)
            }}
        >{!props.icon ? props.value : <i className="material-icons">{props.icon}</i>}
        </Button>
    );
};

export default decorate(LoginButton);