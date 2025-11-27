let bgMusic;
let isMusicPlaying;

function initMusic(){
    if(!bgMusic){
        bgMusic = document.getElementById('bgMusic');
        bgMusic.volume = 0.3;

        //restore last playback time
        const musicTime = localStorage.getItem('musicTime');
        if (musicTime){
            bgMusic.currentTime = parseFloat(musicTime);
        }

        bgMusic.play().then(() =>{
            isMusicPlaying = true;
            updateMusicButton();
            localStorage.setItem('musicPlaying', 'true');
        }).catch(err =>{
            console.log('AutoPlay blocked, starting muted:' , err);
            bgMusic.muted = true;
            bgMusic.play().then(()=>{
                isMusicPlaying = true;
                updateMusicButton();
                localStorage.setItem('musicPlaying', 'true');
            }).catch(err2 => console.log('Muted autoplay failed:' , err2));
        });


        document.addEventListener('click', ()=> {
            if(bgMusic.muted){
                bgMusic.muted = false;
            }
        }, {once: true});

        setInterval(() =>{
            if(isMusicPlaying){
                localStorage.setItem('musicTime', bgMusic.currentTime);
            }
        }, 1000);
    }
}

function toggleMusic() {
    if (!bgMusic) return;
    if(bgMusic.paused){
        bgMusic.play().then(() => {
            isMusicPlaying = true;
            localStorage.setItem('musicPlaying', 'true');
            updateMusicButton();
        }).catch(err => console.log('Play failed:', err));
    }else{
        bgMusic.pause();
        isMusicPlaying = false;
        localStorage.setItem('musicPlaying', 'false');
        updateMusicButton();
    }
}


function updateMusicButton(){
    const button = document.getElementById('musicToggle');
    if(button){
        if (isMusicPlaying){
            button.textContent = '🔇 MUSIC OFF';
            button.classList.add('playing');
        }else{
            button.textContent = '🔇 MUSIC ON';
            button.classList.remove('playing');
        }
    }   
}

document.addEventListener('DOMContentLoaded', function(){
    initMusic();
    updateMusicButton();
});