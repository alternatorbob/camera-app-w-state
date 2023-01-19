

import { modelDetect, updateDetections } from "./detection.js";
import { Camera } from "./stateMachine.js";
import { swapFace } from "./swapFace.js";

let cameraView,
  cameraResult,
  cameraTrigger,
  photoClose,
  detectionsCanvas,
  submitTrigger;

export const interactionStart = () => {
  cameraTrigger = document.querySelector("#camera--trigger");

  photoClose = document.querySelector("#photo--close");
  submitTrigger = document.querySelector("#submit--trigger");

  // Take a picture when cameraTrigger is tapped
  cameraTrigger.addEventListener("click", takePhoto);
  photoClose.addEventListener("click", closePhoto);
  submitTrigger.addEventListener("click", swapFace);
};

export const takePhoto = () => {
  console.log("takePhoto called", Camera.state);
  cameraResult.width = cameraView.videoWidth;
  cameraResult.height = cameraView.videoHeight;
  cameraResult.getContext("2d").drawImage(cameraView, 0, 0);

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
  cameraTrigger.classList.remove("hidden");
  cameraResult.classList.add("hidden");
  photoClose.classList.add("hidden");

  Camera.dispatch("closed");
};

export const addDetectionsClick = () => {
  detectionsCanvas.addEventListener(
    "click",
    (e) => {
      updateDetections(e);
    },
    false
  );
};
