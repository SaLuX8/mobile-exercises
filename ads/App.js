import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { AdMobBanner, AdMobInterstitial, PublisherBanner, AdMobRewarded } from 'expo-ads-admob';

export default function App() {
  const [count, setCount] = useState(0);

  getInter = async () => {
    // Display an interstitial
    await AdMobInterstitial.setAdUnitID('ca-app-pub-3940256099942544/1033173712'); // Test ID, Replace with your-admob-unit-id
    await AdMobInterstitial.requestAdAsync({ servePersonalizedAds: true });
    await AdMobInterstitial.showAdAsync();
  }

  getRewarded = async () => {
    AdMobRewarded.addEventListener('rewardedVideoDidRewardUser', () =>
    setCount(count + 1),
    );
    await AdMobRewarded.setAdUnitID('ca-app-pub-3940256099942544/5224354917'); // Test ID, Replace with your-admob-unit-id
    await AdMobRewarded.requestAdAsync();
    await AdMobRewarded.showAdAsync();
  }

  bannerError = () => {
    console.log('banner ad not loading')
  };

  return (
    <View style={styles.container}>
      <Button onPress={() => getInter()} title="Show Inter" />
      <Button onPress={() => getRewarded()} title="Show Rewarded" />
      <AdMobBanner
        style={styles.bottomBanner}
        bannerSize="banner"
        adUnitID="ca-app-pub-3940256099942544/6300978111" // Test ID, Replace with your-admob-unit-id
        servePersonalizedAds // true or false
        onDidFailToReceiveAdWithError={()=>bannerError()} 
      />
      <Text>You have been rewarded {count} times</Text>

    </View>
  );
}

const styles = StyleSheet.create({
  bottomBanner: {
    position: "absolute",
    bottom: 0
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
   
  },

});
