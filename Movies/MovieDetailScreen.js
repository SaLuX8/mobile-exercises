/* eslint-disable prettier/prettier */
import React from 'react';
import {
    Text,
    View,
    Image,
    StyleSheet,
} from 'react-native';


export default class MovieDetailScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            details: [],
        };
    }

    componentDidMount() {
        this.getDetails();
    }

    async getDetails() {
        const { route } = this.props;
        const { movie } = route.params;

        let APIKEY = 'dff4c502a9bfae25d639f42770b1e551';
        let BASEURL = 'https://api.themoviedb.org/3/movie/';
        let url = BASEURL + movie.id + '?api_key=' + APIKEY + '&append_to_response=videos';
        let response = await fetch(url);
        let data = await response.json();
        this.setState({  details: data });
        // check console - a movie data should be visible there
        console.log('state: ' + this.state.details.genres);
        
    }

     videoLinkHandler= (id) => {
        //alert(id);
        this.props.navigation.navigate('VideoPlayer', { videoKey: id });
    }

    render() {
        const { route } = this.props;
        const { movie } = route.params;
        let IMAGEPATH = 'http://image.tmdb.org/t/p/w500';
        let imageurl = IMAGEPATH + movie.backdrop_path;
        console.log(movie.id);
        // movie details
        let details = this.state.details;
        // genres
        let genres = details.genres;
        //console.log(genres);
        let genresList = null;
        if (genres) {
            genresList = genres.map(function (genre) {
                return (
                    <Text key={genre.id}>*{genre.name} </Text>
                )
            })
        };

        // links
        let videos = details.videos;
        let videosList = [];
        if (videos) {
            videosList = videos.results.map(function (video) {
                return (
                    <Text style={styles.link} onPress={() => this.videoLinkHandler(video.key)} key={video.id}>
                        {video.name}{"\n"}
                    </Text>
                )
            }.bind(this))
        };

        // const { details }  = this.state.details.genres;
        //let genu = movieGenres.map((genre, index)=> {return(<Text style={styles.text}>{genre.name}</Text>)});

        return (
            <View>
                <Image source={{ uri: imageurl }} style={styles.image} />
                <Text style={styles.title}>{movie.title}</Text>
                <Text style={styles.text}>{movie.release_date}</Text>
                <Text style={styles.text}>{movie.overview}</Text>
                <Text style={styles.text}>Genres: {genresList}</Text>
                <Text style={styles.text}>Homepage: {details.homepage}</Text>
                <Text style={styles.text}>Popularity Value: {movie.popularity}</Text>
                <Text style={styles.text}>Videos: {"\n"}{videosList}</Text>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    image: {
        aspectRatio: 670 / 250
    },
    title: {
        fontWeight: 'bold',
        fontSize: 15,
        margin: 5,
    },
    text: {
        fontSize: 12,
        flexWrap: 'wrap',
        margin: 5,
    }
});
