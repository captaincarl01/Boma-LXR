//* HERO SLIDER */

let slides = document.querySelectorAll(".hero-slider img");
let index = 0;

setInterval(()=>{

slides[index].classList.remove("active");

index = (index + 1) % slides.length;

slides[index].classList.add("active");

},5000);


/* COUNTDOWN */

const drop = new Date("April 5, 2026 00:00:00").getTime();

setInterval(()=>{

const now = new Date().getTime();

const distance = drop - now;

const days = Math.floor(distance / (1000*60*60*24));
const hours = Math.floor((distance%(1000*60*60*24))/(1000*60*60));
const minutes = Math.floor((distance%(1000*60*60))/(1000*60));

document.getElementById("countdown").innerHTML =
days + " Days : " + hours + " Hours : " + minutes + " Minutes";

},1000);
