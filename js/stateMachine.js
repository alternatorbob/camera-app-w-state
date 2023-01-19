import { appInit } from "./init.js";
import { modelDetect, clearDetections } from "./detection.js";
import { swapFace } from "./swapFace.js";
import { base64ToImg } from "./utils.js";
import { closePhoto, takePhoto } from "./canvasManagement.js";

const machine = {
  state: "START",
  transitions: {
    //initialise model
    //launch video
    //attach events to UI buttons
    START: {
      init: function () {
        appInit();
        this.changeState("SHOOT");
      },
    },
    SHOOT: {
      //on shutter click switch to result
      //    UI: Show shutter
      //        close and submit hidden
      clicked: function () {
        //takePhoto
        takePhoto();
        //remove shutter button
        this.changeState("RESULT");
      },
    },
    RESULT: {
      //wait that user selects faces to be replaced
      //display message telling user to select faces
      //submit button as soon as face is selected
      closed: function () {
        closePhoto();

        //clear detections canvas
        //empty previous detections array
        clearDetections();
        this.changeState("SHOOT");
      },
      //if was selected
      selected: function () {
        this.changeState("SWAPPED");
      },
      wasSwapped: function () {
        this.changeState("SWAPPED");
      },
    },
    SELECTED: {
      closed: function () {
        this.changeState("SHOOT");
      },
      //add submit button
      //call api to replace
      //show loading
      updateUI: function () {
        //show submit button
        document.querySelector("#submit--trigger").classList.remove("hidden");
      },
      swapFace: function (img) {
        swapFace();
      },
    },
    SWAPPED: {
      //display image with replaced faces
      //call base64 to img
      //update camera--result canvas with new image
      display: function (result) {
        console.log("result displayed from statemachine");
        //get canvas here
        drawImage();
        console.log(result.result);
      },
    },
  },
  dispatch(actionName, ...payload) {
    const actions = this.transitions[this.state];
    const action = this.transitions[this.state][actionName];

    if (action) {
      action.apply(machine, ...payload);
    } else {
      //action is not valid for current state
      console.log("action not valid for current state");
    }
  },
  changeState(newState) {
    //validate that newState actually exists
    this.state = newState;
  },
};

export let Camera = Object.create(machine, {
  name: {
    writable: false,
    enumerable: true,
    value: "Camera",
  },
});

Camera.dispatch("init");
console.log(Camera.state);
