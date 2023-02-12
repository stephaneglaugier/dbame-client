import React from 'react';
import { View, Text } from 'react-native';

const JSONText = ({ data }) => {
    const renderValue = (value) => {
        if (typeof value === 'string') {
            return `"${value}"`;
        } else if (Array.isArray(value)) {
            return `[${value.map(renderValue).join(', ')}]`;
        } else if (typeof value === 'object') {
            return `{${Object.entries(value)
                .map(([key, subValue]) => `"${key}": ${renderValue(subValue)}`)
                .join(', ')}}`;
        } else {
            return String(value);
        }
    };

    return (
        <View>
            <Text>{renderValue(data)}</Text>
        </View>
    );
};

export default JSONText;
