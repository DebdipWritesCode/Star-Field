import "./style.css";

let speed = 0;

class Star {
  constructor() {
    this.x = Math.random() * window.innerWidth * 2 - window.innerWidth;
    this.y = Math.random() * window.innerHeight * 2 - window.innerHeight;
    this.z = Math.random() * window.innerWidth;
    this.pz = this.z;
  }

  update() {
    this.z -= speed;
    if (this.z < 1) {
      this.z = window.innerWidth;
      this.x = Math.random() * window.innerWidth * 2 - window.innerWidth;
      this.y = Math.random() * window.innerHeight * 2 - window.innerHeight;
      this.pz = this.z;
    }
  }

  show() {
    let star = this.element;
    if (!star) {
      star = document.createElement("div");
      star.classList.add("star");
      this.element = star;
      document.body.querySelector("#app").appendChild(star);
    }

    let sx = (this.x / this.z) * window.innerWidth;
    let sy = (this.y / this.z) * window.innerWidth;

    let maxRadius = 16;
    let radius = maxRadius - (maxRadius * this.z) / window.innerWidth;

    star.style.width = radius + "px";
    star.style.height = radius + "px";

    star.style.left = sx + "px";
    star.style.top = sy + "px";

    let px = (this.x / this.pz) * window.innerWidth;
    let py = (this.y / this.pz) * window.innerWidth;

    this.pz = this.z;
  }
}

const stars = new Array(800);
for (let i = 0; i < stars.length; i++) {
  stars[i] = new Star();
}

document.addEventListener("mousemove", (e) => {
  speed = (e.clientX / window.innerWidth) * 20;
});

function animate() {
  for (let i = 0; i < stars.length; i++) {
    stars[i].update();
    stars[i].show();
  }
  requestAnimationFrame(animate);
}

animate();
