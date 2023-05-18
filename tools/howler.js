let sound = new Howl({
    src: ['/tools/Disco.3000.Vol.8.mp3'],
    volume:0.7,
    html5: true,
});
const playMusic = () => sound.play() 
const pauseMusic = () => sound.pause() 
const stopMusic = () => sound.stop()

export {playMusic, pauseMusic, stopMusic}

