const fs = require('fs')
const inquirer = require("inquirer");
const {Circle, Square, Triangle} = require("./lib/shapes");

class svgConstructor{
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
        message: "Please make sure that your TEXT is between 1-3 characters:",
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
        message: "Please enter a color for your Text:",
    },
    {
        type: "input",
        name: "shapeColor",
        message: "What color would you like your shape to be:",
    },
    {
        type: "list",
        name: "shapeType",
        message: "Choose which Pixel Image you would like?",
        choices: ["Circle", "Square", "Triangle"],
    },
];

// Function to write data to file
function writeToFile(fileName, data) {
	console.log(`Writing ${data} to file ${fileName}`)
    fs.writeFile(fileName, data, function (err) {
        if (err) {
            return console.log(err);
        }
        console.log("Congratulations, you have Generated a logo.svg!");
    });
}

async function init() {
    console.log("Welcome to my SVG generator. Please follow the prompts below!");
	let svgText = "";
	let svgFile = "logo.svg";
    let textColor = '';

    // Prompt the user for answers then waits for the input
    const answers = await inquirer.prompt(questions);

	//user text is set to empty until given prompt. 
    // takes input and test to see if between 1-3 characters long
	let userText = "";
	if (answers.text.length > 0 && answers.text.length < 4) {
		userText = answers.text;
	}

    // logs user input for each question into terminal
	console.log(`User text: ${userText}`);
	textColor = answers["textColor"];
	console.log(`User font color: ${textColor}`);
	shapeColor = answers.shapeColor;
	console.log(`User shape color is: ${shapeColor}`);
	shapeType = answers.shapeType;
	console.log(`User shape chosen: ${shapeType}`);
	
	// setting shape for new svg
	let userShape;
	if (shapeType === "Square" || shapeType === "square") {
		userShape = new Square();
		console.log("User selected Square shape");
	}
	else if (shapeType === "Circle" || shapeType === "circle") {
		userShape = new Circle();
		console.log("User selected Circle shape");
	}
	else if (shapeType === "Triangle" || shapeType === "triangle") {
		userShape = new Triangle();
		console.log("User selected Triangle shape");
	}
	else {
		console.log("Uh oh something went wrong! Lets try again!");
	}
	// have to set shapeColor before construction
    userShape.setColor(shapeColor);
    
    // final generation of SVG
	const svg = new svgConstructor();
	svg.setTextEl(userText, textColor);
	svg.setShapeEl(userShape);
	svgText = svg.render();
	writeToFile(svgFile, svgText); 
}
init()