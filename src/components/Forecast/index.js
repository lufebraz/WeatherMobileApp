import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { condition } from '../../utils/condition';
import { weekday } from '../../utils/weekday';

export default function Forecast({ data }) {
    let icon = condition(data.condition)
    let day = weekday(data.weekday)
    return (
        <View style={styles.container}>
            <Text style={styles.date}> {data.date}</Text>
            <Text style={styles.date}>{day.name}</Text>


            <Ionicons name={icon.name} color={icon.color} size={30} />
            <View>
                <Text style={styles.temp}>min: {data.min}º</Text>
                <Text style={styles.temp}>max: {data.max}º</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFF',
        width: 390,
        marginBottom: 12,
        borderRadius: 8,
        padding: 15,
        alignItems: 'center',
        justifyContent: 'space-around',
        flexDirection: 'row',
    },
    date: {
        fontSize: 14
    },
    temp: {
        fontWeight: 'bold'
    }
})