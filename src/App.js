import React from 'react';
import { VideoRecorder } from './components/video-recorder';

function App() {
  if (!navigator.mediaDevices) {
    return (<div className="App">Sorry, this app is not supported by your browser or device.</div>);
  }

  const onStart = () => {
    console.log('It has started!');
  }

  const onDataAvailable = (e) => {
    console.log('On data available: ', e.data)
  }

  const onStop = (audioUrl, recorderState) => {
    console.log('I got the audio and the state: ', audioUrl, recorderState);
  }

  return (
    <div className="App">
      <h1>Recorder Test</h1>
      <VideoRecorder
        onStart={onStart}
        onDataAvailable={onDataAvailable}
        onStop={onStop}
      />
    </div>
  );
}

export default App;
