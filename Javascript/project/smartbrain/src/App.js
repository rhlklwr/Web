import React, { Component } from 'react';
import './App.css';

import Particles from 'react-particles-js';
import Clarifai, { FACE_DETECT_MODEL } from 'clarifai';

import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';



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
      box: {},
      route: 'signin',
      isSignedIn: false,
      user: {
         id: '',
         name: '',
         email: '',
         entries: 0,
         joined: '',
      }
    }
  }

  loadUser = (data) => {
    this.setState({user:{
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined,
    }
    })
  }

  calculateFaceLocation = (data) =>{
    const calrifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return{
      leftCol: calrifaiFace.left_col * width,
      topRow: calrifaiFace.top_row * height,
      rightCol: width - (calrifaiFace.right_col * width),
      bottomRow: height - (calrifaiFace.bottom_row * height),
    }
  }

  displayFaceBox = (box) =>{
    this.setState({box: box})
  }

  onInputChange = (event) =>{
    this.setState({input: event.target.value});
  }

  onButtonSubmit = () =>{
    this.setState({imageUrl: this.state.input})
    app.models.predict(FACE_DETECT_MODEL, this.state.input)
    .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
    .catch(err => console.log(err))
  }

  onRouteChange = (route) =>{
    if (route === 'signout') {
      this.setState({isSignedIn: false})
    }else if (route === 'home'){
      this.setState({isSignedIn: true})
    }
      this.setState({route: route});
    }
    


  render(){
    return (
      <div className="App">
        <Particles className='particles'
        params={particlesOptions}
        />
       <Navigation isSignedIn={this.state.isSignedIn} onRouteChange={this.onRouteChange} />
       {this.state.route === 'home'
              ? <div>
                  <Logo />
                  <Rank name={this.state.user.name} entries={this.state.user.entries}/>
                  <ImageLinkForm 
                  onInputChange={this.onInputChange}
                  onButtonSubmit={this.onButtonSubmit}
                  />
                    <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl}/>
                </div>
              :(
                this.state.route === 'signin'
                ? <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
                : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
              )
          }
      </div>
    );
  }; 
}

export default App;
