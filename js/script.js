window.onload = init;
let ctx; // global audio context
let osc; // global oscillator node
let gainNode; // global gain node
let pannerNode; // global panner node

function init() {
    // called when the page is displayed
    // i.e the DOM is ready
    console.log("DOM is ready");

    // get the audio context
    ctx = new AudioContext();

    createAudioNodes();
    buildAudioGraph();

    defineListeners();
}

function defineListeners() {
    const startButton = document.querySelector("#startButton");
    const stopButton = document.querySelector("#stopButton");

    startButton.onclick = () => {
        start();
    }

    stopButton.onclick = () => {
        stop();
    }

    // for changing the frequency
    const frequencySlider = document.querySelector("#freqSlider");
    // when the slider changes, update the oscillator frequency
    frequencySlider.oninput = (event) => {
        osc.frequency.value = frequencySlider.value;
        // update the value of the span element
        let span = document.querySelector("#spanFreq")
        span.innerHTML = frequencySlider.value;
    }

    // for changing the volume
    // for changing the frequency
    const volSlider = document.querySelector("#volSlider");
    // when the slider changes, update the oscillator frequency
    volSlider.oninput = (event) => {
        gainNode.gain.value = volSlider.value;
    }
}

function createAudioNodes() {
   createOscillator();

    // create a gain node
    gainNode = ctx.createGain();
    // set its volume to 0.5
    gainNode.gain.value = 0.5;

    // create a panner node
    pannerNode = ctx.createStereoPanner();
    // set its pan value to 0
    // goes from -1 (left) to 1 (right)
    pannerNode.pan.value = 0;
}

function createOscillator() {
 // create an oscillator
 osc = ctx.createOscillator();
 // make it a sin wave
 osc.type = "sine";
 // its frequency is 440Hz
 osc.frequency.value = 440;
}
function buildAudioGraph() {
    // here we're going to create the audio graph
    // i.e connect the nodes together
    // first connect the oscillator to the gain node
    osc.connect(gainNode);
    // then connect the gain node to the panner node
    gainNode.connect(pannerNode);
    // finally connect the panner node to the speakers
    pannerNode.connect(ctx.destination);

    // we could have written this in one line
    // osc.connect(gainNode).connect(pannerNode).connect(ctx.destination);
}

function start() {
    // recreate the oscillator
    createOscillator();
    // connect it to the gain node again
    osc.connect(gainNode);
    
    // start the oscillator
    osc.start();
}

function stop() {
    // stop the oscillator
    osc.stop();
}   