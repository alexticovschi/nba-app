import React, { Component } from 'react';
import { firebaseArticles, firebaseLooper } from '../../../firebase';

import SliderTemplates from './slider_templates';

class NewsSlider extends Component {

    state = {
        news:[]
    }

    componentDidMount() {
        firebaseArticles.limitToFirst(3).once('value') // get only 3 articles
            .then((snapshot) => {
                const news = firebaseLooper(snapshot);

                this.setState({
                    news: news
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