import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, StyleSheet, FlatList, View } from 'react-native';
import * as Location from 'expo-location';

import Menu from '../../components/Menu';
import Header from '../../components/Header';
import Conditions from '../../components/Conditions';
import Forecast from '../../components/Forecast';

import api, { key } from '../../services/api'


export default function Home() {
    const [errorMsg, setErrorMsg] = useState(null);
    const [loading, setLoading] = useState(true);
    const [weather, setWeather] = useState([]);
    const [icon, setIcon] = useState({ name: 'cloud', color: '#FFF' });
    const [background, setBackground] = useState(['#1ED6CC', '#97C1EE']);


    useEffect(() => {

        (async () => {
            let { status } = await Location.requestPermissionsAsync();

            if (status !== 'granted') {
                setErrorMsg('permissão negada para acessar a localização');
                setLoading(false);
                return;
            }

            let location = await Location.getCurrentPositionAsync({});

            // console.log(location.coords.latitude);

            const response = await api.get(`weather?key=${key}&lat=${location.coords.latitude}&lon=${location.coords.longitude}`)

            setWeather(response.data);



            if (response.data.results.currently === 'night') {
                setBackground(['#0C3741', '#0F2F61'])
            }

            switch (response.data.results.condition_slug) {
                case 'clear_day':
                    setIcon({ name: 'sunny', color: '#FFB300' })
                    break;
                case 'snow':
                    setIcon({ name: 'snow', color: '#FFF' })
                    break;
                case 'clear_night':
                    setIcon({ name: 'moon', color: '#FFF' })
                    break;
                case 'cloudly_day':
                    setIcon({ name: 'partly-sunny', color: '#FFF' })
                    break;
                case 'cloudly_night':
                    setIcon({ name: 'cloudy-night', color: '#FFF' })
                    break;
                case 'rain':
                    setIcon({ name: 'rainy', color: '#FFF' })
                    break;
                case 'storm':
                    setIcon({ name: 'thunderstorm', color: '#FFF' })
                    break;
            }

            setLoading(false);

        })();

    }, []);


    if (loading) {
        return (
            <View style={styles.container}>
                <Text style={{ fontSize: 17, fontStyle: 'italic' }}>Loading data...</Text>
            </View>
        )
    }

    return (
        <SafeAreaView style={styles.container}>

            <Menu />

            <Header background={background} weather={weather} icon={icon} />

            <Conditions weather={weather} />

            <FlatList
                style={styles.list}
                contentContainerStyle={{ paddingTop: '2.5%' }}
                data={weather.results.forecast}
                keyExtractor={item => item.date}
                renderItem={({ item }) => <Forecast data={item} />}
            />

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#E8F0FF',
        paddingTop: '5%',
    },
    list: {
        marginTop: 10,

    }
});