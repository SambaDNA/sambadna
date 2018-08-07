import * as React from 'react';
import tmpl from 'blueimp-tmpl';
import decorate, { IStyle } from './style';
import { WithStyles } from '@material-ui/core/styles/withStyles';
import { Icon } from '@material-ui/core';
import { CardRecord, CardTagRecord, TagTypeRecord, ConfigManager } from 'sambadna-core';

class CardTagWrapper {
    private tag: CardTagRecord;
    private card: CardRecord;

    constructor(tag: CardTagRecord, card: CardRecord) {
        this.tag = tag;
        this.card = card;
    }

    get name() { return this.tag.name; }
    get value() { return this.tag.value; }
    get source() { return this.tag.source; }
    get target() { return this.tag.target; }
    get amount() { return this.tag.amount; }
    get quantity() { return this.tag.quantity; }
    get balance() { return this.card.getTagTotal(this.tag); }
}

interface ITagsProps {
    card: CardRecord;
    parentCard: CardRecord | undefined;
    handleCardClick: (card: CardRecord) => void;
}

const getCustomDisplay = (template: string, tag: CardTagWrapper, classes: Record<keyof IStyle, string>) => {
    const content = tmpl(template, tag);
    return <div
        className={classes.tagItemContent}
        style={{ width: '100%' }}
        dangerouslySetInnerHTML={{ __html: content }}
    />;
};

const getTagDisplay = (card: CardRecord, tag: CardTagRecord, iconClass: string) => {
    const tt = ConfigManager.getTagTypeById(tag.typeId);
    if (tt && tt.icon) {
        if (tt.icon === '_') { return tt.getValueDisplay(tag); }
        return (<span >
            <Icon className={iconClass}>
                {tt.icon}
            </Icon>
            <span>{tt.getValueDisplay(tag)}</span>
        </span>);
    }
    return tag.name !== 'Name' ? tag.display : tag.getFormattedValueDisplay(tag.unit, tag.quantity, tag.formattedValue || tag.value);
};

const getPriceDisplay = (tag: CardTagRecord) => {
    return tag.amount !== 0 ? (tag.amount * Math.max(1, tag.quantity)).toFixed(2) : '';
}

const getDefaultDisplay = (card: CardRecord, tag: CardTagRecord, classes: Record<keyof IStyle, string>) => {
    const tagTotal = card.getTagTotal(tag);
    const st = tag.locationDisplay;
    return <>
        <div className={classes.tagItemContent}>
            <div>{getTagDisplay(card, tag, classes.icon)}</div>
            {st && <div className={classes.tagLocation}>
                {tag.source}<Icon style={{
                    fontSize: '1.2em', verticalAlign: 'bottom', fontWeight: 'bold'
                }}>keyboard_arrow_right</Icon>{tag.target}
            </div>}
        </div>
        <div className={classes.tagBalance}>
            {tagTotal !== 0 ? Math.abs(tagTotal).toFixed(2) : getPriceDisplay(tag)}
        </div>
    </>
};

const getDisplayFor = (
    card: CardRecord, tag: CardTagRecord, tagType: TagTypeRecord | undefined,
    classes: Record<keyof IStyle, string>) => {
    if (tagType && tagType.displayFormat) {
        return getCustomDisplay(tagType.displayFormat, new CardTagWrapper(tag, card), classes);
    }
    return getDefaultDisplay(card, tag, classes);
};

const getTagItemClassName = (
    tag: CardTagRecord, tagType: TagTypeRecord | undefined, classes: Record<keyof IStyle, string>) => {
    if (!tagType) { return (tag.amount !== 0 && !tag.isModifier) || !tag.name.startsWith('_') ? classes.tagItemAmount : classes.tagItem; }
    return !tagType.icon || tagType.icon === '_' || (tag.amount > 0 && !tag.isModifier)
        ? classes.tagItemAmount
        : classes.tagItem;
};

const Tags = (props: ITagsProps & WithStyles<keyof IStyle>) => {
    if (props.card.tags.count() === 0) {
        const ct = ConfigManager.getCardTypeById(props.card.typeId);
        const type = ct ? ct.reference : 'Card';
        return <div
            className={props.classes.newCard}
            onClick={() => {
                props.handleCardClick(props.card);
            }}>
            New {type}
        </div>
    }
    return (
        <div className={props.classes.tagSection}
            onClick={() => {
                props.handleCardClick(props.card);
            }}>
            {
                props.card.tags.entrySeq()
                    .filter(x => props.parentCard || props.card.tags.count() === 1 || x[1].name !== 'Name')
                    .sortBy(x => x[1].index)
                    .map(([key, tag]) => {
                        const tagType = ConfigManager.getTagTypeById(tag.typeId);
                        return (
                            <span
                                key={key}
                                className={getTagItemClassName(tag, tagType, props.classes)}
                            >
                                {getDisplayFor(props.card, tag, tagType, props.classes)}
                            </span>);
                    })
            }
        </div>
    );
};

export default decorate(Tags);