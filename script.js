console.log("welcome to spotify")

//variables
let songIndex=0;
let audioElement=new Audio('./1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif=document.getElementById('gif');
let songItems=Array.from(document.getElementsByClassName('songItem'));
let masterSongName=document.getElementById('masterSongName');

let songs = [
    {songName: "like my father",filePath: "./1.mp3",coverPath: "./cover1.jpg"},
    {songName: "Apna Bana Le",filePath: "./2.mp3",coverPath: "./cover2.jpg"},
    {songName: "Raataan Lambiyan",filePath: "./3.mp3",coverPath: "./cover3.jpg"},
    {songName: "Tera Ban Jaunga",filePath: "./4.mp3",coverPath: "./cover4.jpg"},
    {songName: "Agar Tum Saath Ho",filePath: "./5.mp3",coverPath: "./cover5.jpg"},
    {songName: "Mann Bharyaa 2.0",filePath: "./6.mp3",coverPath: "./cover6.jpg"},
    {songName: "Main Teri Ho Gayi",filePath: "./7.mp3",coverPath: "./cover7.jpg"},
    {songName: "Baarish Ban Jaana",filePath: "./8.mp3",coverPath: "./cover8.jpg"},
    {songName: "Teri Aankhon Mein",filePath: "./9.mp3",coverPath: "./cover9.jpg"},
]

songItems.forEach((element, i)=>{
    // console.log(element ,i);
    element.getElementsByTagName('img')[0].src=songs[i].coverPath;
    element.getElementsByClassName('songName')[0].innerText=songs[i].songName;
    element.getElementsByClassName('timeStamp')[0].style.opacity=0;
    
})

// audioElement.play();
masterPlay.addEventListener('click',()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        gif.style.opacity=1;
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        makeAllPlays();
        if(songIndex==0)
            document.getElementsByClassName('songItemPlay')[songIndex].classList.add('fa-circle-pause');
        else
            document.getElementsByClassName('songItemPlay')[songIndex-1].classList.add('fa-circle-pause');
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity=0;
        makeAllPlays();
    }
})


//Listen to events
//song to progress bar
audioElement.addEventListener('timeupdate',()=>{
    // console.log('timeupdate');
    progress=parseFloat((audioElement.currentTime/audioElement.duration)*100);
    // console.log(progress);
    myProgressBar.value= progress;
})

//progressbar to time
myProgressBar.addEventListener('change',()=>{
    audioElement.currentTime = (myProgressBar.value*audioElement.duration/100);
})

const makeAllPlays= ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element,i)=>{
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    })
}

const makeAllDeActive = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element,i)=>{
        element.classList.remove('active');
    })
}



Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click',(e)=>{
        songIndex=parseInt(e.target.id);
        if(e.target.classList.contains('fa-circle-play')){
            makeAllPlays();
            e.target.classList.remove('fa-circle-play');
            e.target.classList.add('fa-circle-pause');
            masterSongName.innerText=songs[songIndex-1].songName;
            if(e.target.classList.contains('active')==false){
                audioElement.src='./'+(songIndex)+'.mp3';
                makeAllDeActive();
                e.target.classList.add('active');
            }
            // console.log(audioElement.currentTime);
           
            audioElement.play();
            gif.style.opacity=1;
            masterPlay.classList.remove('fa-circle-play');
            masterPlay.classList.add('fa-circle-pause');
            console.log(audioElement.duration);
 
        }
        else{
            makeAllPlays();
            audioElement.pause();
            gif.style.opacity=0;
            e.target.classList.remove('fa-circle-pause');
            e.target.classList.add('fa-circle-play');
            masterPlay.classList.remove('fa-circle-pause');
            masterPlay.classList.add('fa-circle-play');
        }
    })
})

document.getElementById('next').addEventListener('click',()=>{
    if(songIndex>=9){
        songIndex=1;
    }
    else{
        songIndex+=1;
    }
    makeAllPlays();
    document.getElementsByClassName('songItemPlay')[songIndex-1].classList.remove('fa-circle-play');
    document.getElementsByClassName('songItemPlay')[songIndex-1].classList.add('fa-circle-pause');
    document.getElementsByClassName('songItemPlay')[songIndex-1].classList.add('active');
    masterSongName.innerText=songs[songIndex-1].songName;
    audioElement.src='./'+(songIndex)+'.mp3';
    audioElement.currentTime=0;
    audioElement.play();
    gif.style.opacity=1;
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
})

document.getElementById('previous').addEventListener('click',()=>{
    if(songIndex<=1){
        songIndex=9;
    }
    else{
        songIndex-=1;
    }
    makeAllPlays();
    document.getElementsByClassName('songItemPlay')[songIndex-1].classList.remove('fa-circle-play');
    document.getElementsByClassName('songItemPlay')[songIndex-1].classList.add('fa-circle-pause');
    document.getElementsByClassName('songItemPlay')[songIndex-1].classList.add('active');
    masterSongName.innerText=songs[songIndex-1].songName;
    audioElement.src='./'+(songIndex)+'.mp3';
    console.log(audioElement.src);
    audioElement.currentTime=0;
    audioElement.play();
    gif.style.opacity=1;
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
})
