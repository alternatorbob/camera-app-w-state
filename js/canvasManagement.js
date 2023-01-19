import { Camera } from "./stateMachine.js";

// let cameraElements = [
//   {
//     name: "cameraView",
//     selector: "camera--view",
//   },
//   { name: "cameraResult", selector: "camera--result", dispatch: "closed" },
//   {
//     name: "detectionsCanvas",
//     selector: "detections--canvas",
//     dispatch: "submit",
//   },
// ];

let cameraView = document.querySelector("#camera--view");
let cameraResult = document.querySelector("#camera--result");
let detectionsCanvas = document.querySelector("#detections--canvas");

export const takePhoto = () => {
  console.log("takePhoto called", Camera.state);
  cameraResult.width = cameraView.videoWidth;
  cameraResult.height = cameraView.videoHeight;
  //   cameraResult.getContext("2d").drawImage(cameraView, 0, 0);
  drawOnCanvas(cameraResult, cameraView);

  cameraTrigger.classList.add("hidden");
  photoClose.classList.remove("hidden");
  cameraResult.classList.remove("hidden");

  Camera.dispatch("clicked");
  modelDetect(cameraResult);
  addDetectionsClick();
  swapFace(cameraResult);
};

export const closePhoto = () => {
  console.log("closePhoto called", Camera.state);
  //   cameraTrigger.classList.remove("hidden");
  //   cameraResult.classList.add("hidden");
  //   photoClose.classList.add("hidden");

  //   Camera.dispatch("closed");
};

export const submitPhoto = () => {
  console.log("photo was submitted");
};

export const drawOnCanvas = (canvas, img) => {
  const ctx = canvas.getContext("2d");
  let image = new Image();
  image.onload = function () {
    ctx.drawOnCanvas(image, 0, 0);
  };
  image.src = img;
};
