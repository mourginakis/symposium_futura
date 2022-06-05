const audio = new Audio("../ill-find-you-crystal-river-inmysleep.mp3");


class MasterAnimation {
    // elemShape: HTMLElement | null;

    constructor() {
        // this.elemShape = document.getElementById("rectangle1");
    }
  
    animateIn() {
        // this.elemShape!.style.transition = "stroke-dashoffset 1s, stroke-dasharray 1s";
        // this.elemShape!.style.strokeDashoffset = "400";
        // this.elemShape!.style.strokeDasharray = "760";
    }
  
    animateOut() {
    }
  }




export function animateIn() {
    const elem = document.getElementById("maincontent");
    const elemnav = document.getElementById("nav");
    elem!.animate([{
      transform: 'translate(42px, 0px)',
      filter: 'blur(10px)',
    }], {
      duration: 1000,
      fill: 'forwards',
      easing: 'ease-out',
    })
    elemnav!.animate([{
      transform: 'translate(20px, -20px)',
      filter: 'blur(10px)',
    }], {
      duration: 1000,
      fill: 'forwards',
      easing: 'ease-out',
    })

    const elemShape = document.getElementById("rectangle1");
    elemShape!.style.transition = "stroke-dashoffset 1s, stroke-dasharray 1s";
    elemShape!.style.strokeDashoffset = "400";
    elemShape!.style.strokeDasharray = "760";
    audio.play();

  }

  export function animateOut() {
    //clearInterval(this.timerID);
    const elem = document.getElementById("maincontent");
    const elemnav = document.getElementById("nav");
    elem!.animate([{
      transform: 'translate(0px, 0px)',
      filter: 'blur(0px)',
    }], {
      duration: 50,
      fill: 'forwards',
      easing: 'ease-in',
    })
    elemnav!.animate([{
      transform: 'translate(0px, 0px)',
      filter: 'blur(0px)',
    }], {
      duration: 50,
      fill: 'forwards',
      easing: 'ease-in',
    })



    const elemShape = document.getElementById("rectangle1");
    elemShape!.style.transition = "stroke-dashoffset 0.1s, stroke-dasharray 0.1s";
    elemShape!.style.strokeDashoffset = "-600";
    elemShape!.style.strokeDasharray = "140 540";


    audio.pause();
    audio.load();
  }