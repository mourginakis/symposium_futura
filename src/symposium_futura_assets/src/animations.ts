const audio = new Audio("../ill-find-you-crystal-river-inmysleep.mp3");






const Rectangle1 = {
  getElement() { return document.getElementById("rectangle2")},
  init() {
    const svgcontainer = document.getElementById("colordrawing");
    svgcontainer!.style.width = "230px";
    svgcontainer!.style.height = "400px";


    const styles = {
      strokeWidth: "8px",
      stroke: "rgba(255, 255, 0, 0.9)",
      width: "224px",
      height: "364px",
      strokeDasharray: "140 540",
      strokeDashoffset: "-600",
      transition: "stroke-dashoffset 1s, stroke-dasharray 1s",
    }


    const element = this.getElement();
    Object.assign(element!.style, styles);
  }
}


const AnimateBorder = {
  getElement() {return document.getElementById("rectangle1")},
  animateIn() {
    const elemShape = this.getElement();
    elemShape!.style.transition = "stroke-dashoffset 1s, stroke-dasharray 1s";
    elemShape!.style.strokeDashoffset = "400";
    elemShape!.style.strokeDasharray = "760";
  },
  animateOut() {
    const elemShape = this.getElement();
    elemShape!.style.transition = "stroke-dashoffset 0.1s, stroke-dasharray 0.1s";
    elemShape!.style.strokeDashoffset = "-600";
    elemShape!.style.strokeDasharray = "140 540";
  }
}


const AnimateNav = {
  getElement() {return document.getElementById("nav")},
  animateIn() {
    const elemnav = this.getElement();
    elemnav!.animate([{
      transform: 'translate(20px, -20px)',
      filter: 'blur(10px)',
    }], {
      duration: 1000,
      fill: 'forwards',
      easing: 'ease-out',
    });
  },
  animateOut() {
    const elemnav = this.getElement();
    elemnav!.animate([{
      transform: 'translate(0px, 0px)',
      filter: 'blur(0px)',
    }], {
      duration: 50,
      fill: 'forwards',
      easing: 'ease-in',
    })
  }
}

const AnimateContent = {
  getElement() {return document.getElementById("maincontent")},
  animateIn() {
    const elem = this.getElement();
    elem!.animate([{
      transform: 'translate(42px, 0px)',
      filter: 'blur(10px)',
    }], {
      duration: 1000,
      fill: 'forwards',
      easing: 'ease-out',
    })
  },
  animateOut() {
    const elem = this.getElement();
    elem!.animate([{
      transform: 'translate(0px, 0px)',
      filter: 'blur(0px)',
    }], {
      duration: 50,
      fill: 'forwards',
      easing: 'ease-in',
    })
  }
}



export function animateIn() {
  Rectangle1.init();
  AnimateBorder.animateIn();
  AnimateNav.animateIn();
  AnimateContent.animateIn();

  audio.play();
}

  export function animateOut() {

    AnimateBorder.animateOut();
    AnimateNav.animateOut();
    AnimateContent.animateOut();

    audio.pause();
    audio.load();
  }