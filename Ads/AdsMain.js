import {
    AdMobBanner,
    AdMobInterstitial,
    PublisherBanner,
    AdMobRewarded,
    TestIds,
} from 'react-native-admob'


import React from 'react'
import {
    Button,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    View
} from 'react-native'

const BannerExample = ({ style, title, children, ...props }) => (
    <View {...props} style={[styles.example, style]}>
        <Text style={styles.title}>{title}</Text>
        <View>{children}</View>
    </View>
);



const AdsMain = () => {
    return (
        <View style={styles.container}>
            <ScrollView>
            <Text>Testi</Text>

                <AdMobBanner
                    adSize="banner"
                    adUnitID="ca-app-pub-3940256099942544/6300978111"
                    testDevices={[PublisherBanner.simulatorId]}
                    onAdFailedToLoad={error => console.error(error)}
                />

                <PublisherBanner
                    adSize="fullBanner"
                    adUnitID="ca-app-pub-3940256099942544/6300978111"
                    testDevices={[PublisherBanner.simulatorId]}
                    
                    onAdFailedToLoad={error => console.error(error)}
                    onAppEvent={event => console.log(event.name, event.info)}
                />


            </ScrollView>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        marginTop: Platform.OS === 'ios' ? 30 : 10,
    },
    example: {
        paddingVertical: 10,
    },
    title: {
        margin: 10,
        fontSize: 20,
    },
});

export default AdsMain;

/*
    // Display a banner


    // Display a DFP Publisher banner
    < PublisherBanner
adSize = "fullBanner"
adUnitID = "your-admob-unit-id"
testDevices = { [PublisherBanner.simulatorId]}
onAdFailedToLoad = { error => console.error(error) }
onAppEvent = { event => console.log(event.name, event.info) }
    />

    // Display an interstitial
    AdMobInterstitial.setAdUnitID('your-admob-unit-id');
AdMobInterstitial.setTestDevices([AdMobInterstitial.simulatorId]);
AdMobInterstitial.requestAd().then(() => AdMobInterstitial.showAd());

// Display a rewarded ad
AdMobRewarded.setAdUnitID('your-admob-unit-id');
AdMobRewarded.requestAd().then(() => AdMobRewarded.showAd());
*/