import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, TextInput, Keyboard } from 'react-native';

import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import api, { key } from '../../services/api';
import { LinearGradient } from 'expo-linear-gradient';
import Conditions from '../../components/Conditions';
import { Ionicons } from '@expo/vector-icons';

export default function Search() {

    const navigation = useNavigation();

    const [input, setInput] = useState('');
    const [city, setCity] = useState(null);
    const [error, setError] = useState(null);

    const [icon, setIcon] = useState({ name: 'cloud', color: '#FFF' });


    async function handleSearch() {

        const response = await api.get(`weather?key=${key}&city_name=${input}`)
        // console.log(response.data);

        if (response.data.by === 'default') {
            setError('Hmm, cidade não encontrada! 🤔');
            setInput('');
            setCity(null);
            Keyboard.dismiss();
            return;
        }


        setCity(response.data);
        setInput('');
        Keyboard.dismiss();

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


    }

    if (city) {
        return (
            <SafeAreaView style={styles.container}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Home')}>
                    <Feather
                        name="chevron-left"
                        size={28}
                        color="#000"
                    />
                    <Text style={{ fontSize: 26 }}>Home</Text>
                </TouchableOpacity>

                <View style={styles.searchBox}>
                    <TextInput
                        value={input}
                        onChangeText={(valor) => setInput(valor)}
                        placeholder="Ex: Brasília, DF"
                        style={styles.input}
                    />
                    <TouchableOpacity style={styles.icon} onPress={handleSearch}>
                        <Feather
                            name="search"
                            size={22}
                            color="#FFF"
                        />
                    </TouchableOpacity>

                </View>

                <LinearGradient
                    style={styles.header}
                    colors={['#1ED6CC', '#97C1EE']}
                >
                    <Text style={styles.date}>{city.results.date}</Text>
                    <Text style={styles.date}>Time: {city.results.time}</Text>

                    <Text style={styles.city}>{city.results.city}</Text>

                    <Ionicons style={{ margin: 14 }}
                        name={icon.name}
                        color={icon.color}
                        size={150}
                    />
                    <View>
                        <Text style={styles.temp}>{city.results.temp}º</Text>
                    </View>
                    <Conditions weather={city} />
                </LinearGradient>

            </SafeAreaView>
        )
    }


    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Home')}>
                <Feather
                    name="chevron-left"
                    size={28}
                    color="#000"
                />
                <Text style={{ fontSize: 26 }}>Home</Text>
            </TouchableOpacity>

            <View style={styles.searchBox}>
                <TextInput
                    value={input}
                    onChangeText={(valor) => setInput(valor)}
                    placeholder="Ex: Brasília, DF"
                    style={styles.input}
                />
                <TouchableOpacity style={styles.icon} onPress={handleSearch}>
                    <Feather
                        name="search"
                        size={22}
                        color="#FFF"
                    />
                </TouchableOpacity>

            </View>

            {error && <Text style={{ marginTop: 25, fontSize: 18 }}>{error}</Text>}

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: '10%',
        backgroundColor: '#E8F0FF'
    },
    backButton: {
        flexDirection: 'row',
        marginLeft: 15,
        alignSelf: 'flex-start',
        alignItems: 'center',
        marginBottom: 10

    },
    searchBox: {
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: '#DDD',
        width: '90%',
        height: 50,
        borderRadius: 8
    },
    input: {
        width: '85%',
        height: 50,
        backgroundColor: '#FFF',
        borderTopLeftRadius: 8,
        borderBottomLeftRadius: 8,
        padding: 7
    },
    icon: {
        width: '15%',
        backgroundColor: '#1ED6FF',
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        borderTopRightRadius: 8,
        borderBottomRightRadius: 8
    },
    header: {
        marginTop: '5%',
        width: '90%',
        paddingTop: '5%',
        paddingBottom: '5%',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 8
    },
    date: {
        color: '#FFF',
        fontSize: 18
    },
    city: {
        fontSize: 25,
        paddingTop: '2%',
        paddingBottom: '2%',
        fontWeight: 'bold',
        color: '#FFF'
    },
    temp: {
        color: '#FFF',
        fontSize: 90,
        fontWeight: 'bold'
    }
})