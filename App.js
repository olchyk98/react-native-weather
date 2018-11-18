import React, { Component, Fragment } from 'react';
import {
  Text,
  Image,
  View,
  Animated,
  Easing,
  BackAndroid
} from 'react-native';
import { LinearGradient } from 'expo';

import styles from './styles';

const apikey  = "6486085a849f33ab16d294ebe45ac73d"; // Oles Odynets
const reqcity = "Lund";

// todo: loading screen
// todo error handling

const iconsPath = '/assets/icons/';
const icons = { // All names must be in lowercase
  "thunderstorm": {
    "day": require('.' + iconsPath + 'thunderstorm_day.png'),
    "night": require('.' + iconsPath + 'thunderstorm_day.png')
  },
  "drizzle": {
    "day": require('.' + iconsPath + 'drizzle_day.png'),
    "night": require('.' + iconsPath + 'drizzle_night.png')
  },
  "rain": {
    "day": require('.' + iconsPath + 'rain_day.png'),
    "night": require('.' + iconsPath + 'rain_night.png')
  },
  "snow": {
    "day": require('.' + iconsPath + 'snow_day.png'),
    "night": require('.' + iconsPath + 'snow_night.png')
  },
  "atmosphere": {
    "day": require('.' + iconsPath + 'atmosphere_day.png'),
    "night": require('.' + iconsPath + 'atmosphere_day.png')
  },
  "clouds": {
    "day": require('.' + iconsPath + 'clouds_day.png'),
    "night": require('.' + iconsPath + 'clouds_night.png')
  },
  "clear": {
    "day": require('.' + iconsPath + 'clear_day.png'),
    "night": require('.' + iconsPath + 'clear_night.png')
  },
  "mist": {
    "day": require('.' + iconsPath + 'atmosphere_day.png'),
    "night": require('.' + iconsPath + 'atmosphere_day.png')
  }
}

const backgrounds = {
  storm: ['#0f0c29', '#191939'],
  sky: ['#1881FC', '#8f94fb'],
  sad: ['#141e30', '#243b55'],
  night: ['#0A0000', '#070D28', '#08121B'],
  atmnight: ['#0F252D', '#02295C', '#250712'],
  stormnight: ['#08174D', '#000', '#02091B']
}

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      temp: "...",
      reqcity,
      icon: "",
      background: null,
      isFetching: false
    }
  }

  async componentDidMount() {
    this.fetchAPI();
  }

  panic = () => BackAndroid.exitApp();

  fetchAPI = () => {
    this.setState(() => ({ isFetching: true }));
    let a =
        `https://api.openweathermap.org/data/2.5/weather?q=${ reqcity }&APPID=${ apikey }&units=metric`; // json
    fetch(a)
    .then(res => res.json())
    .then(({ main: { temp }, name: reqcity, weather }) => {
      this.setState(() => ({ isFetching: false }));

      let a = weather[0].main.toLowerCase(), // (drizzle)
          b = (new Date()).getHours(),
          c = (b >= 9 && b <= 21) ? "day" : "night",
          d = icons[a][c],
          e = backgrounds[{
            "day": {
              "thunderstorm":"storm",
              "drizzle":"sky",
              "rain":"storm",
              "snow":"sad",
              "atmosphere":"sky",
              "clouds":"sky",
              "clear":"sky"
            },
            "night": {
              "snow":"atmnight",
              "thunderstorm":"stormnight",
              "rain":"stormnight"
            }
          }[c][a]];

      if(!d || !e) return this.panic();

      this.setState(() => ({
        temp, reqcity,
        icon: d,
        weather: a.charAt(0).toUpperCase() + a.slice(1),
        background: e
      }));
    }).catch(this.panic);
  }

  render() {
    return (
      <Fragment>
          <LinearGradient
            colors={ this.state.background || ['black', 'black']  }
            start={[ 0, 0 ]}
            end={[ 1, 1 ]}
            style={ styles.view }>
            <Text style={ styles.reqcity }>{ this.state.reqcity }</Text>
            <Image style={ styles.icon } source={ this.state.icon || icons.rain.day } />
            <Text style={ styles.temp }>{ this.state.temp }°</Text>
            <Text style={ styles.desc }>{ this.state.weather }</Text>
          </LinearGradient>
      </Fragment>
    );
  }
}

export default App;