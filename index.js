const fs = require('fs')
const inquirer = require("inquirer");
const {Circle, Square, Triangle} = require("./lib/shapes");

class svgConstruction{
    constructor(){
        this.textEl = ''
        this.shapeEl = ''
    }
    render(){

        return `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="300" height="200">${this.shapeEl}${this.textEl}</svg>`
    }
    setTextEl(text,color){
        this.textEl = `<text x="150" y="125" font-size="60" text-anchor="middle" fill="${color}">${text}</text>`
    }
    setShapeEl(shape){
        this.shapeEl = shape.render()

    }
    
}

// Defines array of 'questions' using the 'inquirer' library with the following questions.
// Each question is an object that specifies the properties of TEXT, TEXT COLOR, SHAPE COLOR, and Pixel Image.
const questions = [
    {
        type: "input",
        name: "text",
        message: "What would you like your TEXT to be?:",
        validate: textInput => {
            if (textInput.length > 0 && textInput.length < 4) {
                return true;
            } else {
                return console.log('\nPlease make sure that your TEXT is between 1-3 characters.');
            }
        }
    },
    {
        type: "input",
        name: "textColor",
        message: "Please enter a color for your Text (OR a hexadecimal number):",
    },
    {
        type: "input",
        name: "shapeColor",
        message: "Please enter a color for your SHAPE (OR a hexadecimal number):",
    },
    {
        type: "list",
        name: "shapeType",
        message: "Choose which Pixel Image you would like?",
        choices: ["Circle", "Square", "Triangle"],
    },
];

// Function to write data to file
function writeToFile(logoSvg, data) {
	console.log(`Writing ${data} to file ${logoSvg}`)
    fs.writeFile(logoSvg, data, function (err) {
        if (err) {
            return console.log(err);
        }
        console.log("Generated logo.svg!");
    });
}

async function init() {
    console.log("Welcome to my SVG generator. Please follow the prompts below!");
    console.log("Your TEXT should only be between 1-3 characters long.")
	let svgText = "";
	let svgFile = "logo.svg";
    let textColor = '';

    // waits for the prompts to be answered
    const userInput = await inquirer.prompt(questions);

	//user text is set to empty until given data. 
    // takes input and test to see if between 1-3 characters long
	let userText = "";
    if (userInput.text === '') {
        return false
    } else {
        userText = userInput.text;
    }

    // logs user input for each question into terminal
	console.log(`\nUser text: ${userText}`);
	textColor = userInput.textColor;
	console.log(`User font color: ${textColor}`);
	shapeColor = userInput.shapeColor;
	console.log(`User shape color is: ${shapeColor}`);
	shapeType = userInput.shapeType;
	console.log(`User shape chosen: ${shapeType}\n`);
	
	// setting shape for new svg
	let userShape;
	if (shapeType === "Square") {
		userShape = new Square();
	}
	else if (shapeType === "Circle") {
		userShape = new Circle();
	}
	else if (shapeType === "Triangle") {
		userShape = new Triangle();
	}

	// have to set shapeColor before construction
    userShape.setColor(shapeColor);
    
    // final generation of SVG
	const svg = new svgConstruction();
	svg.setTextEl(userText, textColor);
	svg.setShapeEl(userShape);
	svgText = svg.render();
	writeToFile(svgFile, svgText); 
}
init()