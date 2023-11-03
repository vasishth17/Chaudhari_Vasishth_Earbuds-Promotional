const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
});

document.querySelectorAll(".nav-link").forEach(n => n.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
}));









(() => {
    const canvas = document.querySelector("#explode-view");
    const context = canvas.getContext("2d");
    canvas.width = 1920;
    canvas.height = 1080;
    const frameCount = 450; //how many still frames do we have?
    const images = []; // array to hold all of our images

    //object literal, that has a property of frame to hold the current frame
    const buds = {
        frame: 0
    }

    //run a for loop to populate our images array
    for (let i = 0; i < frameCount; i++) {
        // console.log(i);
        const img = new Image();
        //srting I am trying to create: images/explode_0017.webp
        img.src = `image/explode_${(i + 1).toString().padStart(4, '0')}.webp`;
        images.push(img);
    }

    // console.table(images);

    //we are not actually animating a DOM element, but rather an object which contains a frame count, as the user scrolls we increase the value by 1. We tell GreenSock there is a total of 449 frames to cycle though, so it know when to stop. GreenSock 
    gsap.to(buds, {
        frame: 449,
        snap: "frame",
        scrollTrigger: {
            trigger: "#explode-view",
            pin: true,
            scrub: 1,
            // markers: true,
            start: "top top"
        },
        onUpdate: render
    })

    images[0].addEventListener("onload", render)

    function render() {
        console.log(buds.frame);
        console.log(images[buds.frame]);
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(images[buds.frame], 0, 0);
    }


})();










// xray
(() => {
    //vaiables
    let imageCon = document.querySelector('#imageCon'),
        drag = document.querySelector('.image-drag'),
        left = document.querySelector('.image-left'),
        dragging = false,
        min = 0,
        max = imageCon.offsetWidth;


    function onDown() {
        dragging = true;
        console.log("on Down called")
    }

    function onUp() {
        dragging = false;
        console.log("on Up called")
    }

    function onMove(event) {
        // Calculate 'max' every time to account for responsive changes
        max = imageCon.offsetWidth;
        if (dragging === true) {
            let rect = imageCon.getBoundingClientRect();
            let x = event.clientX - rect.left;

            x = Math.max(min, x); // Ensures 'x' is not less than 'min'
            x = Math.min(max, x); // Ensures 'x' is not more than 'max'

            drag.style.left = x + 'px';
            left.style.width = x + 'px';
        }
    }


    //event listeners

    drag.addEventListener('mousedown', onDown);
    document.body.addEventListener('mouseup', onUp);
    document.body.addEventListener('mousemove', onMove)


})();









// Ar object


// Variables
const model = document.querySelector("#model");
const hotspots = document.querySelectorAll(".Hotspot");

const hotspotData = [
    {
        slot: "hotspot-1",
        annotation: "Silicone Tips",
        description: "These are the comfortable silicone tips for the earbuds.",
        img: "../images/silicon tips.jpg"
    },
    {
        slot: "hotspot-3",
        annotation: "LED",
        description: "Indicates battery and connection status.",
        img: "../images/led.jpeg"
    },
    {
        slot: "hotspot-4",
        annotation: "Charging Connectors",
        description: "Metallic connectors used to charge the earbuds.",
        img: "../images/charging_connectors.jpeg"
    },
    {
        slot: "hotspot-5",
        annotation: "Touch Control",
        description: "Sensitive touch area for controlling playback and calls.",
        img: "../images/touch-controls.jpg"
    },
    {
        slot: "hotspot-6",
        annotation: "Active Noise Cancellation",
        description: "Technology to reduce ambient noise for a clearer audio experience.",
        img: "../images/active-noice-cancellation.webp"
    },
    {
        slot: "hotspot-7",
        annotation: "Battery",
        description: "Powers the earbuds for several hours of playback.",
        img: "../images/battery.jpeg"
    }
];

// Functions
const modelLoaded = () => {
    hotspots.forEach(hotspot => {
        const annotation = hotspot.querySelector('.HotspotAnnotation');
        gsap.set(annotation, { autoAlpha: 0, y: 10 });
        hotspot.style.display = "block";
    });

    model.setAttribute('auto-rotate', '');
}

const showInfo = function () {
    const annotation = this.querySelector('.HotspotAnnotation');
    const hotspotInfo = hotspotData.find(h => h.slot === this.getAttribute("slot"));

    model.removeAttribute('auto-rotate');

    if (hotspotInfo) {
        const { annotation: hotspotAnnotation, description, img } = hotspotInfo;
        annotation.querySelector('h2').textContent = hotspotAnnotation;
        annotation.querySelector('p').textContent = description;

        const imageElement = annotation.querySelector('img');
        if (img && imageElement) {
            imageElement.src = img;
            imageElement.style.display = "block";
        } else {
            imageElement.style.display = "none";
        }

        gsap.to(annotation, { autoAlpha: 1, y: 0, duration: 0.5 });

        // Adjust position if the annotation is out of viewport
        const rect = annotation.getBoundingClientRect();
    }


}

const hideInfo = function () {
    const annotation = this.querySelector('.HotspotAnnotation');
    gsap.to(annotation, { autoAlpha: 0, y: 10, duration: 0.5 });
    annotation.querySelector('h2').textContent = "";
    annotation.querySelector('p').textContent = "";
    annotation.querySelector('img').style.display = "none";

    model.setAttribute('auto-rotate', '');
}

// Event Listeners
model.addEventListener("load", modelLoaded);

hotspots.forEach(hotspot => {
    hotspot.addEventListener("mouseover", showInfo);
    hotspot.addEventListener("mouseout", hideInfo);
});
