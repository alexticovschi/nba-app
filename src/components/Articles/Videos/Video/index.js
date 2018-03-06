import React, { Component } from 'react';
import { firebaseDB, firebaseLooper, firebaseTeams, firebaseVideos } from '../../../../firebase';

import styles from '../../articles.css';
import Header from './header';
import VideosRelated from '../../../widgets/VideosList/VideosRelated/videosRelated';

class VideoArticle extends Component {
    state = {
        article: [],
        team: [],
        teams: [],
        related: []
    }

    componentDidMount() {
        firebaseDB.ref(`videos/${this.props.match.params.id}`).once('value')
        .then((snapshot) => {
            let article = snapshot.val();
            console.log(article);

            firebaseTeams.orderByChild('teamId').equalTo(article.team).once('value')
                .then((snapshot) => {
                    const team = firebaseLooper(snapshot);
    
                    this.setState({
                        article,
                        team
                    });
                    this.getRelated();
                })
                .catch(error => console.log(error));
        })

        // axios.get(`${URL}/videos?id=${this.props.match.params.id}`)
        // .then( response => {
        //     let article = response.data[0];

        //     axios.get(`${URL}/teams?id=${article.team}`)
        //         .then( response => {
        //             this.setState({
        //                 article, 
        //                 team: response.data
        //             });
        //             this.getRelated();
        //         });
        // });
    }

    // get a list of all teams
    getRelated = () => {
        firebaseTeams.once('value')
            .then((snapshot) => {
                const teams = firebaseLooper(snapshot);

                firebaseVideos.orderByChild('team')
                    .equalTo(this.state.article.team)
                    .limitToFirst(3).once('value')
                    .then((snapshot) => {
                        const related = firebaseLooper(snapshot);

                        this.setState({
                            teams,
                            related: related
                        });
                        console.log('get related:', this.state.related)
                    })
        });
        // axios.get(`${URL}/teams`)
        //     .then( response => {
        //         let teams = response.data

        //         axios.get(`${URL}/videos?q=${this.state.team[0].city}&_limit=3`)
        //             .then( response => {
        //                 this.setState({
        //                     teams,
        //                     related: response.data
        //                 })
        //             })
        //     });
    }

    render() {
        const article = this.state.article;
        const team = this.state.team;

        return(
            <div>
                <Header teamData={team[0]}/>
                <div className={styles.videoWrapper}>
                    <h1>{article.title}</h1>
                    <iframe 
                        title="videoplayer"
                        frameborder="0"
                        src={`https://www.youtube.com/embed/${article.url}`}
                        width="100%"
                        height="300px"
                    >
                    </iframe>
                    <VideosRelated 
                        data={this.state.related}
                        teams={this.state.teams}
                    />
                </div>
            </div>
        )
    }
}

export default VideoArticle;