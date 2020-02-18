import { floor, random } from 'lodash';
import { Accelerometer } from 'expo-sensors';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, StatusBar, TouchableOpacity } from 'react-native';

export default function App() {
  const [data, setData] = useState({});
  const [play, setPlay] = useState(0);
  const [alwaysBlue, setAlwaysBlue] = useState(true);

  // once we mount app lets subscribe the accelerometer
  useEffect(() => {
    if (this._subscription) {
      _unsubscribe();
    } else {
      _subscribe();
    }
  }, []);

  const _reset = () => {
    setAlwaysBlue(true);
    _subscribe();
  }

  const _subscribe = () => {
    this._subscription = Accelerometer.addListener(accelerometerData => {
      setData(accelerometerData);
    });
  };

  const _unsubscribe = () => {
    this._subscription && this._subscription.remove();
    this._subscription = null;
  };


  let { x, y, z } = data;

  if(floor(y) > 0.8 && Math.random() >= 0.1){
    _subscribe();
    setAlwaysBlue(false);
  }


  return (
      <>
        <StatusBar barStyle="light-content" backgroundColor="#6a51ae" />

        {alwaysBlue && (
            <View style={styles.blueContainer}>
              <Text style={styles.blueText}>
                ALWAYS BLUE
              </Text>
            </View>
        )
        }

        {!alwaysBlue && (
            <View style={styles.yellowContainer}>
              <Text style={styles.blackText}>
                NOT BLUE
              </Text>
              <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={_reset} style={styles.button}>
                  <Text>RESET</Text>
                </TouchableOpacity>
              </View>
            </View>
        )
        }
      </>
  );
}

const BLUE = "#0276FD";
const WHITE = "#FFFFFF";
const BLACK = "#000000";
const YELLOW = "#FFFF00";

const styles = StyleSheet.create({
  sensor: {
    paddingHorizontal: 10,
  },
  blueContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: BLUE,
  },
  yellowContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: YELLOW,
  },
  blueText: {
    color: WHITE,
    fontSize: 32,
    textAlign: 'center',
  },
  blackText: {
    color: BLACK,
    fontSize: 32,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'stretch',
    marginTop: 15,
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
});

