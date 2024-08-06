import { useRef, useState } from 'react'; 
import './App.css';

function App() {

  const [currentMusicDetails, setCurrentMusicDetails] = useState({
    songName:'Thunder',
    ArtistName:'Imagine Dragons',
    songSrc:'https://res.cloudinary.com/dgi1csegx/video/upload/v1722875816/Thunder_hmlr0w.mp3',
    songAvatar:'./Assets/images/image1.jpeg'
  })



  const [audioProgress, setAudioProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [musicIndex,setMusicIndex]=useState(0);
  const [musicTotalLength,setMusicTotalLength]=useState('03 : 03');
  const [musicCurrentTime,setMusicCurrentTime]=useState('00 : 00');
  const [videoIndex,setVideoIndex]=useState(0);

  const currentAudio = useRef()

  const handleMusicProgress = (e)=>{
    setAudioProgress(e.target.value);
    currentAudio.current.currentTime = e.target.value * currentAudio.current.duration / 100;

  }

  let avatarClass = ['objectFitCover','objectFitContain','none']
  const [avatarClassIndex,setAvatarClassIndex]=useState(0)
  const handleAvatar = ()=>{
    if (avatarClassIndex>= avatarClass.length-1){
      setAvatarClassIndex(0)  
    }
    else{
      setAvatarClassIndex(avatarClassIndex+1)
      }
  }


  //Play Audio Function
  const handleAudioPlay = ()=>{
 if (currentAudio.current.paused){
  currentAudio.current.play();
   setIsPlaying(true);
 }
 else{
  currentAudio.current.pause();
  setIsPlaying(false);
  }
  }
  
const musicAPI =[
  {
    songName:'Thunder',
    ArtistName:'Imagine Dragons',
    songSrc:'https://res.cloudinary.com/dgi1csegx/video/upload/v1722875816/Thunder_hmlr0w.mp3',
    songAvatar:'./Assets/images/image1.jpeg'
  },
  {
    songName:'Husn',
    ArtistName:'Anuv Jain',
    songSrc:'https://res.cloudinary.com/dgi1csegx/video/upload/v1722875832/Husn_fv8oq1.mp3',
    songAvatar:'./Assets/images/image4.jpeg'
  },
  {
    songName:'Dandelions',
    ArtistName:'Ruth B',
    songSrc:'https://res.cloudinary.com/dgi1csegx/video/upload/v1722875868/Dandelions_ze0mfo.mp3',
    songAvatar:'./Assets/images/image9.jpeg'
  },
  {
    songName:'Catch Me If I Fall',
    ArtistName:'NEFFEX',
    songSrc:'https://res.cloudinary.com/dgi1csegx/video/upload/v1722875820/Catch_Me_If_I_Fall_c9cfkk.mp3',
    songAvatar:'./Assets/images/image8.jpg'
  },
  {
    songName:'Uff Teri Adaa',
    ArtistName:'Farhan Akhtar',
    songSrc:'https://res.cloudinary.com/dgi1csegx/video/upload/v1722875845/Uff_Teri_Adaa_absg8e.mp3',
    songAvatar:'./Assets/images/image7.jpg'
  }
]

  const  handleNextSong =()=>{
    if (musicIndex >= musicAPI.length-1){
      let setNumber = 0;
      setMusicIndex(setNumber);
      updateCurrentMusicDetails(setNumber)
      }
      else{
       let setNumber = musicIndex+1;
       setMusicIndex(setNumber);
        updateCurrentMusicDetails(setNumber)
  }}

  const handlePrevSong =()=>{
    if (musicIndex === 0){
      let setNumber = musicAPI.length-1;
      setMusicIndex(setNumber);
      updateCurrentMusicDetails(setNumber)
      }
      else{
        let setNumber = musicIndex-1;
        setMusicIndex(setNumber);
        updateCurrentMusicDetails(setNumber)
        }
  }

  const updateCurrentMusicDetails=(number)=>{
    let musicObject = musicAPI[number];
    currentAudio.current.src = musicObject.songSrc;
    currentAudio.current.play();
    setCurrentMusicDetails({
      songName:musicObject.songName,
      ArtistName:musicObject.ArtistName,
      songSrc:musicObject.songSrc,
      songAvatar:musicObject.songAvatar,
      
    })
    setIsPlaying(true);
    }



const handleAudioUpdate = () =>{
  let minutes = Math.floor(currentAudio.current.duration/60);
  let seconds = Math.floor(currentAudio.current.duration%60);
  let musicDuration = `${minutes <10 ? `0${minutes}` : minutes}:${seconds <10 ? `0${seconds}` : seconds}`;
  setMusicTotalLength(musicDuration);


let currentMin = Math.floor(currentAudio.current.currentTime / 60);
let currentSec = Math.floor(currentAudio.current.currentTime % 60);
let musicCurrentT = `${currentMin <10 ? `0${currentMin}` : currentMin} : ${currentSec <10 ? `0${currentSec}` : currentSec}`;
setMusicCurrentTime(musicCurrentT);

const progress = parseInt((currentAudio.current.currentTime / currentAudio.current.duration) * 100);
setAudioProgress(isNaN(progress)? 0 : progress)
}

const vidArray = ['https://res.cloudinary.com/dgi1csegx/video/upload/v1722875325/video1_pszwkb.mp4',
  'https://res.cloudinary.com/dgi1csegx/video/upload/v1722875251/video2_idmjpd.mp4',
'https://res.cloudinary.com/dgi1csegx/video/upload/v1722959579/video3_bgoalc.mp4',
'https://res.cloudinary.com/dgi1csegx/video/upload/v1722875285/video4_dbpee5.mp4',
'https://res.cloudinary.com/dgi1csegx/video/upload/v1722959451/video5_1_p9ahb4.mp4',];

const handleChangeBackground = ()=>{
  if (videoIndex >= vidArray.length-1){
    setVideoIndex(0);
  }
  else{
    setVideoIndex(videoIndex+1);
    }

}

  return (
    <>
    <div className="container">
      <audio src='https://res.cloudinary.com/dgi1csegx/video/upload/v1722875816/Thunder_hmlr0w.mp3' ref={currentAudio} onEnded={handleNextSong} onTimeUpdate={handleAudioUpdate}></audio>
      <video src={vidArray[videoIndex]} loop muted  autoPlay 
      className='backgroundVideo'></video>
      <div className="blackScreen"></div>
      <div className="music-content">
      <p className="musicPlayer">Music Player</p>
      <p className="music-Name">{currentMusicDetails.songName}</p>
      <p className="music-Artist-Name">{currentMusicDetails.ArtistName} </p>
      <img src={currentMusicDetails.songAvatar} className={avatarClass[avatarClassIndex]} onClick={handleAvatar} alt="song Avatar" id="songAvatar" />
      <div className="music-Timer">
        <p className="musicCurrentTime">{musicCurrentTime}</p>
        <p className="musicTotalLength">{musicTotalLength}</p>
      </div>
      <input 
      type="range"
      name="musicProgress" 
      className="musicProgress" 
      value={audioProgress} 
      onChange={handleMusicProgress}/>
      <div className="musicControlers">
        <i className="fa-solid fa-backward musicControler" onClick={handlePrevSong}></i>
        <i className={`fa-solid ${isPlaying ? 'fa-pause-circle' : 'fa-circle-play'} playBtn`} onClick={handleAudioPlay}></i>
        <i className="fa-solid fa-forward musicControler" onClick={handleNextSong}></i>
      </div>
      </div>
      <div className='changeBackbtn' onClick={handleChangeBackground}>Change Background</div>
      
    </div>
    </>
  );
}
export default App;
