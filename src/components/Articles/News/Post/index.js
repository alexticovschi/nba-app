import React, { Component } from 'react';
import { firebase, firebaseDB, firebaseLooper, firebaseTeams } from '../../../../firebase';

import styles from '../../articles.css';
import Header from './header';

class NewsArticle extends Component {
    state = {
        article:[],
        team:[],
        imageURL: ''
    }

    componentDidMount() {
        firebaseDB.ref(`articles/${this.props.match.params.id}`).once('value')
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

                        this.getImageURL(article.image)
                    })
                    .catch(error => console.log(error));
            })
        
        // axios.get(`${URL}/articles?id=${this.props.match.params.id}`)
        //     .then( response => {
        //         let article = response.data[0];

        //         axios.get(`${URL}/teams?id=${article.team}`)
        //             .then( response => {
        //                 this.setState({
        //                     article, 
        //                     team:response.data
        //                 })
        //             });
        //     });
    }

    // takes a filename as an argument, it access the database, 
    //returns the url and updates the state with an imageURL
    getImageURL = (filename) => {
        firebase.storage().ref('images').child(filename)
            .getDownloadURL().then(url => {
                this.setState({
                    imageURL: url
                })
            })
    }



    render() {
        const article = this.state.article;
        const team = this.state.team;

        return(
            <div className={styles.articleWrapper}>
                <Header
                    teamData={team[0]}
                    date={article.date}
                    author={article.author}
                />
                <div className={styles.articleBody}>
                    <h1>{article.title}</h1>
                    <div className={styles.articleImage}
                        style={{
                            background:`url('${this.state.imageURL}')`
                        }}
                    ></div>
                    <div className={styles.articleText}
                        dangerouslySetInnerHTML={{
                            __html:article.body
                        }}
                    >
                    </div>
                </div>
            </div>
        )
    }
}


export default NewsArticle;