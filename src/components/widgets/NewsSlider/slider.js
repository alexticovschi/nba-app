import React, { Component } from 'react';
import { firebase, firebaseArticles, firebaseLooper } from '../../../firebase';

import SliderTemplates from './slider_templates';

class NewsSlider extends Component {

    state = {
        news:[]
    }

    componentDidMount() {
        firebaseArticles.limitToFirst(3).once('value') // get only 3 articles
            .then((snapshot) => {
                const news = firebaseLooper(snapshot);

                // news.forEach((item, i) => {
                //     firebase.storage().ref('images')
                //     .child(item.image).getDownloadURL()
                //     .then( url => {
                //         news[i].image = url;
                //         this.setState({
                //             news
                //         })
                //     })
                // })

                // make the request to storage, go to image directory, pass whatever is inside item, 
                // access the image, get the URL, run a promise, set the image URL equal to url
                // then call the callback(callback is equal to resolve) which will end the promise
                // whenever we call resolve, the promise will end
                const asyncFunction = (item, i, callback) => {
                    firebase.storage().ref('images')
                        .child(item.image).getDownloadURL()
                        .then( url => {
                            news[i].image = url;
                            //console.log('news[i].image',news[i].image)
                            callback();
                        })
                }

                // requests = [promise1, promise2, promise3]
                // Iterate over the articles, return a promise, let asyncFunction do its job
                // ...then call the callback which will end the promise or resolve the promise
                let requests = news.map((item,i) => {
                    return new Promise((resolve) => {
                        asyncFunction(item, i, resolve)
                    })
                })
                
                // This will run after the script reaches the requests, 
                // ... i.e. everything inside requests gets resolved
                // After everything is ready(all the promises are resolved)
                // ... the state will be updated
                Promise.all(requests).then(() => {
                    this.setState({
                        news
                    })
                })


            });



        // axios.get(`http://localhost:3004/articles?_start=${this.props.start}&_end=${this.props.amount}`)
        //     .then( response => {
        //         this.setState({
        //              news:response.data
        //         })
        //     })
    }

    render() {
        //console.log(this.state.news);

        return (
            <div>
                <SliderTemplates data ={this.state.news} type={this.props.type}/>
            </div>
        )
    }
}


export default NewsSlider;