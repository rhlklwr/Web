import React, { Component } from 'react';
import './App.css';

import Particles from 'react-particles-js';
import Clarifai, { FACE_DETECT_MODEL } from 'clarifai';

import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';



const app = new Clarifai.App(
  {apiKey: 'cd2cbe6f65f34f41a30f45d4722fbb2f'}
)

const  particlesOptions = {
  particles: {
        number: {
          value: 30,
          density:{
            enable: true,
            value_area: 200
          }
        }
    }
};
class App extends Component {
  constructor(){
    super();
    this.state = {
      input: '',
      imageUrl: '',
    }
  }

  onInputChange = (event) =>{
    this.setState({input: event.target.value});
  }

  onButtonSubmit = () =>{
    this.setState({imageUrl: this.state.input})
    app.models.predict(FACE_DETECT_MODEL, this.state.input)
    .then(
    function(response){
      console.log(response.outputs[0].data.regions[0].region_info.bounding_box)
    },
    function(err){
      console.log(err)
    }
    );
    console.log()
  }

  render(){
    return (
      <div className="App">
        <Particles className='particles'
        params={particlesOptions}
        />
       <Navigation />
       <Logo />
       <Rank />
       <ImageLinkForm onInputChange={this.onInputChange}onButtonSubmit={this.onButtonSubmit}/>
        <FaceRecognition imageUrl={this.state.imageUrl}/>
      </div>
    );
  }; 
}

export default App;
