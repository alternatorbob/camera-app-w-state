import { Camera } from "./stateMachine.js";
import { interactionStart } from "./eventManagement.js";
let faceapi;

export const appInit = () => {
  const detectionOptions = {
    withLandmarks: true,
    withDescriptors: false,
  };
  // Initialize the magicFeature
  faceapi = ml5.faceApi(detectionOptions, modelLoaded);

  // When the model is loaded
  function modelLoaded() {
    console.log("Model Loaded!");
    cameraStart();
  }

  // Set constraints for the video stream
  var constraints = { video: { facingMode: "user" }, audio: false };
  var track = null;

  // Access the device camera and stream to cameraView
  function cameraStart() {
    const cameraView = document.querySelector("#camera--view");
    navigator.mediaDevices
      .getUserMedia(constraints)
      .then((stream) => {
        track = stream.getTracks()[0];
        cameraView.srcObject = stream;
      })
      .then(() => {
        interactionStart();
        // Camera.changeState("SHOOT");
        // Camera.dispatch("shoot");
      })
      .catch((error) => {
        console.error("Oops. Something is broken.", error);
      });
  }
};

export { faceapi };
