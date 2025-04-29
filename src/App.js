import logo from './logo.svg';
import { Piano } from 'react-piano';
import 'react-piano/dist/styles.css';
// import { Layout, Flex } from 'antd';
import './App.css';

function App() {
  let currentSource = null

  function playSound(array, sampleRate) {
    // We have to start with creating AudioContext
    const audioContext = new AudioContext({sampleRate});
    // create audio buffer of the same length as our array
    const audioBuffer = audioContext.createBuffer(1, array.length, sampleRate);
    // this copies our sine wave to the audio buffer
    audioBuffer.copyToChannel(array, 0);
    // some JavaScript magic to actually play the sound
    const source = audioContext.createBufferSource();
    source.connect(audioContext.destination);
    source.buffer = audioBuffer;
    source.start();

    if (currentSource !== null) {
      currentSource.stop();
    }
  
    currentSource = source;
  }

  function playNote(note) {
    const sampleRate = 44100;
    const sineWaveArray = new Float32Array(sampleRate);
    const n = (note-49.0)/12
    const hz = Math.pow(2,n)*440;
    // fill all 44100 elements of array with Math.sin() values
    for (var i = 0; i < sineWaveArray.length; i++) {
      sineWaveArray[i] = Math.sin(i * Math.PI * 2 * hz / sampleRate);
    }
    playSound(sineWaveArray, sampleRate);
  }

  return (
    <>
    {/* <Layout.Content> */}
      <Piano
        noteRange = {{first:41, last:71}}
        width={600}
        playNote = { (midiNumber) => {
          playNote(midiNumber-8)
          console.log(midiNumber);
        }}
        stopNote = { (midiNumber) => {

        }}
      />
    {/* </Layout.Content> */}
    </>
  );
}


export default App;
