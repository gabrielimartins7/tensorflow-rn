import React from 'react';
import { Text, View } from 'react-native';

import { styles } from './styles';

export type ClassificationProps = {
    probability: number;
    className: string;
}

type Props = {
    data: ClassificationProps;
}

export function Classification({ data }: Props) {
  return (
    <View style={styles.container}>
        <Text style={styles.probability}>{data.probability}</Text>
        <Text style={styles.className}>{data.className}</Text>
    </View>
  );
}