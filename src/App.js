import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import VideoViewer from './components/VideoViewer';

class App extends Component {
  render() {
    return (
      <div className="App">
        <VideoViewer />
      </div>
    );
  }
}

export default App;
