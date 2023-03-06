import { signal } from "@preact/signals-react";
import { Attribute } from "../types/Attribute";


const attributesSignal = signal<Attribute[]>([]);


const toggleAttributePrefer = (target: Attribute) => {
    attributesSignal.value = attributesSignal.peek().map((attribute) => {
        if (attribute.name === target.name) {
            return {
                ...attribute,
                prefer: !attribute.prefer,
            };
        }
        return attribute;
    });
};


export { attributesSignal, toggleAttributePrefer };


