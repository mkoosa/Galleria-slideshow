let sound = new Howl({
    // src: ['https://res.cloudinary.com/dwp8gkrp5/video/upload/v1684437755/Disco_mp3cut.net_pgh7rm.mp3'],
    volume:0.7,
    html5: true,
});
const playMusic = () => sound.play() 
const pauseMusic = () => sound.pause() 
const stopMusic = () => sound.stop()

export {playMusic, pauseMusic, stopMusic}

