const audio = new Audio("../ill-find-you-crystal-river-inmysleep.mp3");


class Rectangle {
  element: HTMLElement | null;

  constructor(elementid) {
    this.element = document.getElementById(elementid);
  }

  

}



export const Ribbons = {
  // getElement() { return document.getElementById("rectangle2")},
  init() {
    const contentbox_height = document.getElementById("content")!.clientHeight;
    const contentbox_width = document.getElementById("content")!.clientWidth;

    // Softcoded vars
    const strokeWidth = 12; //px
    const baseWidth = contentbox_width + 6; //px
    const baseHeight = contentbox_height + 6; //px

    const weird_padding = strokeWidth / 2;
    const svgcontainer = document.getElementById("colordrawing");
    svgcontainer!.style.top = weird_padding + "px";
    svgcontainer!.style.left = weird_padding + "px";

    // svgcontainer!.style.width = "245px";
    // svgcontainer!.style.height = "200px";


    const css_vals = getComputedStyle(document.documentElement);
    const settings = [
      {
        // ribbon 1
        stroke: css_vals.getPropertyValue("--ribbon-color-one"),
        strokeWidth: strokeWidth + "px",
        width: baseWidth + "px",
        height: baseHeight + "px",
        strokeDasharray: "50 670",
        strokeDashoffset: "-850",
        //transition: "stroke-dashoffset 1s, stroke-dasharray 1s",
      },
      {
        // ribbon 2
        stroke: css_vals.getPropertyValue("--ribbon-color-two"),
        strokeWidth: strokeWidth + "px",
        width: strokeWidth + baseWidth + "px",
        height: strokeWidth + baseHeight + "px",
        strokeDasharray: "50 700",
        strokeDashoffset: "-890",
        // transition: "stroke-dashoffset 1s, stroke-dasharray 1s",
      },
      {
        // ribbon 3
        stroke: css_vals.getPropertyValue("--ribbon-color-three"),
        strokeWidth: strokeWidth + "px",
        width: strokeWidth + strokeWidth + baseWidth + "px",
        height: strokeWidth + strokeWidth + baseHeight + "px",
        strokeDasharray: "50 730",
        strokeDashoffset: "-930",
        // transition: "stroke-dashoffset 1s, stroke-dasharray 1s",
      },
      {
        // ribbon 4 (invisible)
        stroke: "white",
        strokeWidth: strokeWidth + "px",
        width: strokeWidth + strokeWidth + strokeWidth + baseWidth + "px",
        height: strokeWidth + strokeWidth + strokeWidth + baseHeight + "px",
        strokeDasharray: "50 800",
        strokeDashoffset: "-1000",
        // transition: "stroke-dashoffset 1s, stroke-dasharray 1s",
      },
    ];

    

    Object.assign(document.getElementById("rectangle1")!.style, settings[0]);
    Object.assign(document.getElementById("rectangle2")!.style, settings[1]);
    Object.assign(document.getElementById("rectangle3")!.style, settings[2]);
    Object.assign(document.getElementById("rectangle4")!.style, settings[3]);
  },
};


export const AnimateBorder = {
  animateIn() {
    let elemShape = document.getElementById("rectangle1");
    elemShape!.style.transition = "stroke-dashoffset 6s, stroke-dasharray 6s ease-out";
    // elemShape!.style.strokeDasharray = "760 540";
    elemShape!.style.strokeDasharray = "800 270";
    elemShape!.style.strokeDashoffset = "-150";

    elemShape = document.getElementById("rectangle2");
    elemShape!.style.transition = "stroke-dashoffset 6s, stroke-dasharray 6s ease-out";
    elemShape!.style.strokeDasharray = randInt(1001) + " " + randInt(1001);
    elemShape!.style.strokeDashoffset = String(randInt(1001));

    elemShape = document.getElementById("rectangle3");
    elemShape!.style.transition = "stroke-dashoffset 6s, stroke-dasharray 6s ease-out";
    elemShape!.style.strokeDasharray = randInt(1001) + " " + randInt(1001);
    elemShape!.style.strokeDashoffset = String(randInt(1001));

    elemShape = document.getElementById("rectangle4");
    elemShape!.style.transition = "stroke-dashoffset 1s, stroke-dasharray 1s ease-out";
    elemShape!.style.strokeDasharray = "200 600";
    elemShape!.style.strokeDashoffset = "-900";
    // elemShape!.style.filter = "blur(10px)";
  },
  animateOut() {
    let elemShape = document.getElementById("rectangle1");
    elemShape!.style.transition = "stroke-dashoffset 0.1s, stroke-dasharray 0.1s ease-out";
    elemShape!.style.strokeDasharray = "50 670";
    elemShape!.style.strokeDashoffset = "-850";

    elemShape = document.getElementById("rectangle2");
    elemShape!.style.transition = "stroke-dashoffset 0.1s, stroke-dasharray 0.1s ease-out";
    elemShape!.style.strokeDasharray = "50 700";
    elemShape!.style.strokeDashoffset = "-890";

    elemShape = document.getElementById("rectangle3");
    elemShape!.style.transition = "stroke-dashoffset 0.1s, stroke-dasharray 0.1s ease-out";
    elemShape!.style.strokeDasharray = "50 730";
    elemShape!.style.strokeDashoffset = "-930";

    elemShape = document.getElementById("rectangle4");
    elemShape!.style.transition = "stroke-dashoffset 0.1s, stroke-dasharray 0.1s ease-out";
    elemShape!.style.strokeDasharray = "50 800";
    elemShape!.style.strokeDashoffset = "-1000";
  }
}


export const AnimateNav = {
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

export const AnimateContent = {
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
  // Ribbons.init();
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

function randInt(n) {
  return Math.floor(Math.random() * n);
}