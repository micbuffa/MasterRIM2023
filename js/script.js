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
}

function createAudioNodes() {
    // create an oscillator
    osc = ctx.createOscillator();
    // make it a sin wave
    osc.type = "sine";
    // its frequency is 440Hz
    osc.frequency.value = 440;

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
    // start the oscillator
    osc.start();
}

function stop() {
    // stop the oscillator
    osc.stop();
}   