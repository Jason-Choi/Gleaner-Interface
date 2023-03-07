import { signal, computed } from "@preact/signals-react";
import { Attribute } from "../types/Attribute";
import { unSelectTaskType } from "./taskType";


const attributesSignal = signal<Attribute[]>([]);

const attributeWildcardsSignal = computed(() =>
    attributesSignal
        .value
        .filter((attribute) => attribute.prefer)
        .map((attribute) => `attr_${attribute.name}`)
);

const toggleAttributePrefer = (target: Attribute) => {
    unSelectTaskType();
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


export { attributesSignal, attributeWildcardsSignal, toggleAttributePrefer };


