import React from 'react';
import { View, Text } from 'react-native';
import globalStyles from '../globalStyles';

const JSONText = ({ data }) => {
    const renderValue = (value) => {
        if (typeof value === 'string') {
            return `"${value}"`;
        } else if (Array.isArray(value)) {
            return `[${value.map(renderValue).join(', ')}]`;
        } else if (typeof value === 'object') {
            const entries = Object.entries(value)
                .map(([key, subValue]) => `"${key}": ${renderValue(subValue)}`)
                .join(', ');
            return `{${entries}}`;
        } else {
            return String(value);
        }
    };

    const prettyPrint = (data) => {
        return JSON.stringify(data, null, 2); // 2 spaces for indentation
    };

    if (!data) {
        return null;
    }

    return (
        <Text style={globalStyles.text}>{prettyPrint(data)}</Text>
    );
};

export default JSONText;
