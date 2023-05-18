let sound = new Howl({
    src: ['../tools/Disco (mp3cut.net).mp3'],
    volume:0.7,
    html5: true,
});
const playMusic = () => sound.play() 
const pauseMusic = () => sound.pause() 
const stopMusic = () => sound.stop()

export {playMusic, pauseMusic, stopMusic}

