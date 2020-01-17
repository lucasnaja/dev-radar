import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    Image,
    View,
    TextInput,
    Text,
    Keyboard,
} from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import {
    requestPermissionsAsync,
    getCurrentPositionAsync,
} from 'expo-location';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { MaterialIcons } from '@expo/vector-icons';

import devradar_api from '../../services/DevRadar.service';

export default function Main({ navigation }) {
    const [devs, setDevs] = useState([]);
    const [currentRegion, setCurrentRegion] = useState(null);
    const [techs, setTechs] = useState('');

    useEffect(function() {
        (async function() {
            const { granted } = await requestPermissionsAsync();

            if (granted) {
                const { coords } = await getCurrentPositionAsync({
                    enableHighAccuracy: true,
                });

                const { latitude, longitude } = coords;

                setCurrentRegion({
                    latitude,
                    longitude,
                    latitudeDelta: 0.04,
                    longitudeDelta: 0.04,
                });
            }
        })();
    }, []);

    if (!currentRegion) return null;

    async function loadDevs() {
        const { latitude, longitude } = currentRegion;

        const { data } = await devradar_api.get('/search', {
            params: {
                latitude,
                longitude,
                techs,
            },
        });

        setDevs(data);
    }

    return (
        <>
            <MapView
                onRegionChangeComplete={region => setCurrentRegion(region)}
                initialRegion={currentRegion}
                style={styles.map}
            >
                {devs.map(
                    ({
                        _id,
                        login,
                        name,
                        avatar_url,
                        bio,
                        techs,
                        location,
                    }) => (
                        <Marker
                            key={_id}
                            coordinate={{
                                longitude: location.coordinates[0],
                                latitude: location.coordinates[1],
                            }}
                        >
                            <Image
                                style={styles.avatar}
                                source={{ uri: avatar_url }}
                            />

                            <Callout
                                onPress={() => {
                                    navigation.navigate('Profile', {
                                        login,
                                        name,
                                    });
                                }}
                            >
                                <View style={styles.callout}>
                                    <Text style={styles.devName}>{name}</Text>
                                    <Text style={styles.devBio}>{bio}</Text>
                                    <Text style={styles.devTechs}>
                                        {techs.join(', ')}
                                    </Text>
                                </View>
                            </Callout>
                        </Marker>
                    )
                )}
            </MapView>

            <View style={styles.searchForm}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Buscar DEVs por Techs..."
                    placeholderTextColor="#999"
                    autoCapitalize="words"
                    autoCorrect={false}
                    onChangeText={setTechs}
                />

                <TouchableOpacity onPress={loadDevs} style={styles.loadButton}>
                    <MaterialIcons name="my-location" size={20} color="#fff" />
                </TouchableOpacity>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    map: { flex: 1 },

    avatar: {
        width: 54,
        height: 54,
        borderRadius: 4,
        borderWidth: 4,
        borderColor: '#fff',
    },

    callout: { width: 260 },

    devName: { fontWeight: 'bold', fontSize: 16 },

    devBio: { color: '#666', marginTop: 5 },

    devTechs: { marginTop: 5 },

    searchForm: {
        position: 'absolute',
        top: 20,
        left: 20,
        right: 20,
        zIndex: 5,
        flexDirection: 'row',
    },

    searchInput: {
        flex: 1,
        height: 50,
        backgroundColor: '#fff',
        color: '#333',
        borderRadius: 25,
        paddingHorizontal: 20,
        fontSize: 16,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: { width: 4, height: 4 },
        elevation: 2,
    },

    loadButton: {
        width: 50,
        height: 50,
        backgroundColor: '#8e4dff',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 25,
    },
});
