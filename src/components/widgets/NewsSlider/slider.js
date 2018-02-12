import React, { Component } from 'react';
import axios from 'axios';

import SliderTemplates from './slider_templates';
import { URL } from '../../../config';

class NewsSlider extends Component {

    state = {
        news:[]
    }

    componentDidMount() {
        axios.get(`http://localhost:3004/articles?_start=${this.props.start}&_end=${this.props.amount}`)
            .then( response => {
                this.setState({
                     news:response.data
                })
            })
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