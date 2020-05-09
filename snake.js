const cvs = document.getElementById("snake");
const ctx = cvs.getContext("2d");

const ground = new Image();
ground.src = "img/Background.jpg";

ctx.fillStyle = "red";
ctx.fillRect(12,12,20,30);
ctx.drawImage(ground,12,12);