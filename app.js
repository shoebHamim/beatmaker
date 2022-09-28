class DrumKit {
  constructor() {
    this.pads = document.querySelectorAll('.pad');
    this.kickAudio = document.querySelector('.kick-sound');
    this.snareAudio = document.querySelector('.snare-sound');
    this.hihatAudio = document.querySelector('.hihat-sound');
    this.playButton = document.querySelector('.play');
    this.currenKick='./allSounds/kick-classic.wav';
    this.currentSnare='./allSounds/snare-acoustic01.wav';
    this.currenHihat='./allSounds/hihat-acoustic01.wav';
    this.index = 0;
    this.bpm = 100;
    this.isPlaying = null;
    // grab or capture or catch or fetch the selections
    this.selects=document.querySelectorAll('select');
    // mute functionality
    this.kickMute=false;
    this.snareMute=false;
    this.hihatMute=false;
    this.mutebtns=document.querySelectorAll('.mute');
    this.tempoSlider=document.querySelector('.tempo-slider');

  }
  activePad() {
    this.classList.toggle('active');
  }
  repeat() {
    let step = this.index % 8;
    const activeBar = document.querySelectorAll(`.b${step}`);
    // loop over the pads
    activeBar.forEach(bar => {
      bar.style.animation = 'playTrack .3s alternate ease-in-out 2';
      // check if pads are active
      if (bar.classList.contains('active')) {
        // check each sound
        if (bar.classList.contains('kick-pad') && !this.kickMute) {
          this.kickAudio.currentTime = 0
          this.kickAudio.play();
        }
        if (bar.classList.contains('snare-pad') && !this.snareMute){
          this.snareAudio.currentTime = 0
          this.snareAudio.play();
        }
        if (bar.classList.contains('hihat-pad') && !this.hihatMute) {
          this.hihatAudio.currentTime = 0
          this.hihatAudio.play();
        }

      }
    });

    this.index++;


  }
  start() {
    const interval = (60 / this.bpm) * 1000;
    
    //check if it's playing
    if (!this.isPlaying) {
      this.isPlaying = setInterval(() => {
        this.repeat();
      }, interval);
      this.updateBtn()
    }// stop the player by clearing the interval
    else {
      clearInterval(this.isPlaying);
      this.isPlaying = null;
      this.updateBtn()
    }
  }
  updateBtn(){
    if(this.isPlaying){
      this.playButton.innerText='Pause';
      this.playButton.classList.add('active')
    }
    else{
      this.playButton.innerText="Play";
      this.playButton.classList.remove('active')
    }
  }
  changeSound(e){
    const selectionName=e.target.name;
    const selectionValue=e.target.value; 
    switch(selectionName){
      case "kick-select":
        this.kickAudio.src=selectionValue;
        break;
        case "snare-select":
          this.snareAudio.src=selectionValue;
          break;
          case "hihat-select":
            this.hihatAudio.src=selectionValue;
        break;
        
      }
      
    }
    muteAudio(clsList){
      if(clsList.contains('kick-volume')){
        this.kickMute=!this.kickMute;
        document.querySelector('.kick-volume').classList.toggle('muted')

      }
      else if(clsList.contains('snare-volume')){
        this.snareMute=!this.snareMute;
        document.querySelector('.snare-volume').classList.toggle('muted')
    }
    else if(clsList.contains('hihat-volume')){
      this.hihatMute=!this.hihatMute;
      document.querySelector('.hihat-volume').classList.toggle('muted')

    }
  }
  changeTempo(e){
    this.bpm=parseInt(e.target.value);
    if(this.isPlaying){

      const interval = (60 / this.bpm) * 1000;
      clearInterval(this.isPlaying);
      this.isPlaying = null;
  
      this.isPlaying = setInterval(() => {
        this.repeat();
      }, interval);
    }
    
  }


}


const drumkit = new DrumKit();

// Event Listener
drumkit.playButton.addEventListener('click', () => drumkit.start())


drumkit.pads.forEach(pad => {
  pad.addEventListener('click', drumkit.activePad)
  pad.addEventListener('animationend', function () {
    this.style.animation = '';
  })
})


drumkit.selects.forEach(select=>{
  select.addEventListener('change',function(e){
    drumkit.changeSound(e);
  })
})

// event listener for muting
drumkit.mutebtns.forEach(mutebtn=>{
  mutebtn.addEventListener('click',(e)=>{
    const whichBtn=e.path[1].classList;
    drumkit.muteAudio(whichBtn)
  })
})

// update tempo value
drumkit.tempoSlider.addEventListener('input',function(e){
  document.getElementById('tempo-value').innerText=e.target.value;
})

drumkit.tempoSlider.addEventListener('change',function(e){
  drumkit.changeTempo(e);
})
