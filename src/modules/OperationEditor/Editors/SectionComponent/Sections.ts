import { Section } from "./Section";
import { CardTagRecord } from "sambadna-core";
import { SelectedValues } from "./SelectedValues";
import { ValueSelection } from "./ValueSelection";

export class Sections {
    public sections: Section[];

    constructor() {
        this.sections = [];
    }

    public get keys() {
        return this.sections.map(section => section.key);
    }
    public add(section: Section) {
        this.sections.push(section);
    }

    public insert(section: Section) {
        this.sections.unshift(section);
    }

    public addSelectedTag(tag: CardTagRecord) {
        const section = this.getSection(tag.category);
        if (section) {
            section.addSelectedTag(tag);
        }
    }

    public getSelectedValues() {
        let result = new Map<string, ValueSelection[]>();
        for (const section of this.sections) {
            const value = section.getSelectedValues();
            if (value) {
                result = result.set(section.key, value);
            }
        }
        return result;
    }
    public getNewValues(selectedValues: SelectedValues) {
        let resultMap = new Map<string, ValueSelection[]>();
        for (const [key, finalValues] of selectedValues.entries) {
            const result = new Array<ValueSelection>();
            const section = this.getSection(key);
            if (section) {
                const originalValues = section.getSelectedValues();
                for (const finalValue of finalValues) {
                    const ov = originalValues.find(o => o.ref === finalValue.ref);
                    if (!ov || ov.quantity !== finalValue.quantity || ov.amount !== finalValue.amount || ov.value !== finalValue.value) {
                        result.push(finalValue);
                    }
                }
            }
            if (result.length > 0) { resultMap = resultMap.set(key, result); }
        }
        return resultMap;
    }

    public getDeletedValues(selectedValues: SelectedValues) {
        let resultMap = new Map<string, ValueSelection[]>();
        for (const section of this.sections) {
            const result = new Array<ValueSelection>();
            const finalValues = selectedValues.get(section.key);
            for (const originalValue of section.getSelectedValues()) {
                if (!finalValues || finalValues.every(fv => fv.ref !== originalValue.ref)) {
                    result.push(originalValue);
                }
            }
            if (result.length > 0) { resultMap = resultMap.set(section.key, result); }
        }
        return resultMap;
    }

    private getSection(key: string) {
        return this.sections.find(x => x.key === key);
    }
}