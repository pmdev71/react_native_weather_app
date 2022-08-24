/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useCallback, useState} from 'react';
import axios from 'axios';

import {
  ActivityIndicator,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

const App = () => {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const API_KEY = '0f4486b55be8c40c937d88800ed6991a';

  const fetchDataHandler = useCallback(() => {
    setLoading(true);
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${input}&units=metric&appid=${API_KEY}`,
      )
      .then(res => {
        // console.log(res.data);
        setData(res.data);
        setLoading(false);
        setInput('');
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  }, [API_KEY, input]);

  return (
    <View style={styles.root}>
      <ImageBackground
        resizeMode="cover"
        style={styles.image}
        source={require('./assets/background.png')}>
        <View style={styles.topBar}>
          <TextInput
            style={styles.textInput}
            placeholder="Enter city name"
            placeholderTextColor={'black'}
            onChangeText={val => setInput(val)}
            onSubmitEditing={fetchDataHandler}
            value={input}
          />
        </View>
        {loading && (
          <View>
            <ActivityIndicator size="large" color="white" />
          </View>
        )}

        {data && (
          <View style={styles.infoView}>
            <Text style={styles.cityCountryText}>
              {`${data?.name}, ${data?.sys?.country}`}
            </Text>
            <Text style={styles.dateText}>{new Date().toLocaleString()}</Text>
            <Text style={styles.tempText}>
              {`${Math.round(data?.main?.temp)} °C`}
            </Text>
            <Text style={styles.minMaxText}>
              {`Min ${Math.round(data?.main?.temp_min)} °C || Max ${Math.round(
                data?.main?.temp_max,
              )} °C`}
            </Text>
          </View>
        )}
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#fff',
  },
  image: {
    flex: 1,
    flexDirection: 'column',
  },
  topBar: {
    alignItems: 'center',
  },
  textInput: {
    width: '80%',
    height: 40,
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#000',
    marginVertical: 20,
    marginTop: 30,
  },
  cityCountryText: {
    marginTop: '40%',
    color: '#fff',
    fontSize: 35,
    fontWeight: '700',
  },

  infoView: {
    alignItems: 'center',
  },

  dateText: {
    color: '#fff',
    fontSize: 22,
    marginVertical: 10,
  },
  tempText: {
    fontSize: 35,
    fontWeight: '700',
    color: '#fff',
    marginVertical: 10,
  },
  minMaxText: {
    fontSize: 18,
    color: '#fff',
    marginVertical: 10,
    fontWeight: '500',
  },
});

export default App;
