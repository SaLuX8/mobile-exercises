/* eslint-disable prettier/prettier */
/* eslint-disable no-trailing-spaces */
/* eslint-disable quotes */

import React, { Component, useCallback } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import YouTube from 'react-native-youtube';

export default class VideoPlayer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isReady: false,
            status: "",
            quality: "",
            error: "",
            key: "",
            playing: false,
        }
    }

    componentDidMount() {
        this.setKey();
    }
    // tuodaan propseista videon id
    setKey() {
        let key = this.props.route.params.videoKey;
        this.setState({ key: key });
    }

    render() {
      //console.log(this.state);
      return (
        <View style={styles.container}>
          <YouTube
          apiKey="AIzaSyAOfp1_NhZl7H9R68lEMwa7lgU50G0HuYc"
          videoId={this.state.key} // The YouTube video ID
          play // control playback of video with true/false
          fullscreen={false} // video should play in fullscreen or inline
          loop={false} // control whether the video should loop when ended
          onReady={e => this.setState({ isReady: true })}
          onChangeState={e => this.setState({ status: e.state })}
          onChangeQuality={e => this.setState({ quality: e.quality })}
          onError={e => this.setState({ error: e.error })}
          style={styles.youtube}
          />
          <Text>{`Status: ${this.state.status}`}</Text>
        </View>
        
      );
    }
  }
  
  const styles = StyleSheet.create({
      container: {
          flex: 1,
      },
      youtube: {
      alignSelf: 'stretch',
      height: 300
      }
  });