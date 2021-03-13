import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient,  } from 'expo-linear-gradient';

import { Ionicons } from '@expo/vector-icons'

export default function Header(){
    return(
        <LinearGradient 
        style={styles.header}
        colors={['#1ED6CC', '#97C1EE']}
        >
            <Text style={styles.date}>03-12-2021</Text>
            <Text style={styles.city}>Osasco - SP</Text>

            <Ionicons style={{margin: 14}}
                name="partly-sunny-outline"
                color= "#FFB300"
                size={150}
            />

            <Text style={styles.temperatura}>30º</Text>


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