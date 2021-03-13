import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient,  } from 'expo-linear-gradient';

import { Ionicons } from '@expo/vector-icons';

export default function Header({ background, weather, icon }){
    return(
        <LinearGradient 
        style={styles.header}
        colors={background}
        >
            <Text style={styles.date}>{weather.results.date}</Text>
            <Text style={styles.city}>{weather.results.city}</Text>

            <Ionicons style={{margin: 14}}
                name= {icon.name}
                color= {icon.color}
                size={150}
            />

            <Text style={styles.temperatura}>{weather.results.temp}º</Text>


        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    header:{
        width: '95%',
        height: '50%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8
    },
    date:{
        color: '#FFF',
        fontSize: 19,
        margin: 15
    },
    city:{
        color: '#FFF',
        fontSize: 28,
        fontWeight: 'bold'
    },
    temperatura:{
        color: '#FFF',
        fontSize: 80,
        fontWeight: 'bold'

    }
});