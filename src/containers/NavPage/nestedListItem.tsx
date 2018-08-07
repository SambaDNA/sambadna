import * as React from 'react';
import { ListItem, ListItemText, WithStyles } from '@material-ui/core';
import withStyles from '@material-ui/core/styles/withStyles';

const decorate = withStyles(({ palette, spacing }) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        background: palette.background.paper,
    },
    nested: {
        paddingLeft: spacing.unit * 4,
    },
}));

interface INestedListItemProps {
    label: string;
    onClick: () => void;
}

type Props = INestedListItemProps & WithStyles<'root' | 'nested'>;

class NestedListItem extends React.Component<Props, {}> {

    public render() {
        return (
            <ListItem
                className={this.props.classes.nested}
                button
                onClick={() => this.props.onClick()}
            >
                <ListItemText primary={this.props.label} />
            </ListItem>
        );
    }
}
export default decorate<INestedListItemProps>(NestedListItem);