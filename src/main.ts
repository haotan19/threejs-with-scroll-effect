import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import {
  BoxGeometry,
  Color,
  Mesh,
  MeshBasicMaterial,
  MeshPhongMaterial,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
} from "three";
import { directionLight } from "./light";
import "./style.css";

const CUBE_COLOR = ' #F5F5F5'

gsap.registerPlugin(ScrollTrigger)

const renderer = new WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
const app = document.getElementById("app");

if (app) {
  app.appendChild(renderer.domElement);

  const camera = new PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    1,
    500
  );
  camera.position.set(0, 0, 100);
  camera.lookAt(0, 0, 0);

  const scene = new Scene();

  const geometry = new BoxGeometry(10, 10, 10);
  const material = new MeshPhongMaterial({ color: new Color(CUBE_COLOR) , shininess: 30 });
  const cube = new Mesh(geometry, material);
  scene.add(cube);

  scene.add(directionLight(.1, 0, 0, 100))
  scene.add(directionLight(.9, 0, 80, 30))
  scene.add(directionLight(.2, 0, -80, 60))
  scene.add(directionLight(.3, -120, -120, -1))
  scene.add(directionLight(.3, 120, -120, -1))

  app.addEventListener("click", () => {
    console.log("Test");
  });

  const tl = gsap.timeline({ defaults: { ease: "power3.inOut" }, scrollTrigger: {
    trigger: "#app",
    pin: true,
    start: "top top",
    end: "+=2000",
    scrub: 1
  } });
  tl.to(cube.position,
    {
      x: 3,
      y: 3,
    },
  ).to(cube.rotation,
    {
      duration: 3,
      z: Math.PI * 1.25,
      x: Math.PI * 0.75
    },
    "<"
  );

  function render() {
    requestAnimationFrame(render);
    renderer.render(scene, camera);
  }

  render();
  

  const resize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  };
  
  
  window.addEventListener("resize", () => {
    resize();
  });
}

