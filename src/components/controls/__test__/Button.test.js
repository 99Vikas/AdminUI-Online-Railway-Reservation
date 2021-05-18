import React from 'react';
import ReactDOM from 'react-dom';
import Button from '../Button';
import ActionButton from '../ActionButton';
import PopUP from '../Popup';
import CheckBox from '../Checkbox';

it("renders without crashing", ()=>{
    const div = document.createElement("div");
    ReactDOM.render(<Button></Button>, div)
})

it("renders ActionButton test without crashing", ()=>{
    const div = document.createElement("div");
    ReactDOM.render(<ActionButton></ActionButton>, div)
})

it("renders PopUp without crashing", ()=>{
    const div = document.createElement("div");
    ReactDOM.render(<PopUP></PopUP>, div)
})

it("renders without crashing CheckBOx", ()=>{
    const div = document.createElement("div");
    ReactDOM.render(<CheckBox></CheckBox>, div)
})
