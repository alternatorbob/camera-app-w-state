import { modelDetect, updateDetections } from "./detection.js";
import { Camera } from "./stateMachine.js";
import { takePhoto, closePhoto, submitPhoto } from "./canvasManagement.js";
import { swapFace } from "./swapFace.js";

let uiElements = [
  {
    name: "cameraTrigger",
    selector: "camera--trigger",
    dispatch: "clicked",
  },
  { name: "photoClose", selector: "photo--close", dispatch: "closed" },
  {
    name: "submitTrigger",
    selector: "submit--trigger",
    dispatch: "submit",
  },
];

let cameraView,
  cameraResult,
  cameraTrigger,
  photoClose,
  detectionsCanvas,
  submitTrigger;

export const interactionStart = () => {
  uiElements.forEach((element) => {
    document
      .querySelector(`#${element.selector}`)
      .addEventListener("click", () => {
        Camera.dispatch(element.dispatch);
      });
  });

  // photoClose = document.querySelector("#photo--close");
  // submitTrigger = document.querySelector("#submit--trigger");

  // // Take a picture when cameraTrigger is tapped
  // cameraTrigger.addEventListener("click", takePhoto);
  // photoClose.addEventListener("click", closePhoto);
  // submitTrigger.addEventListener("click", swapFace);
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

export const addClickListener = (selector, callback) => {
  document.addEventListener("click", (e) => {
    if (e.target.matches(selector)) callback(e);
  });
};
