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
    setTextElement(text,color){
        this.textEl = `<text x="150" y="125" font-size="60" text-anchor="middle" fill="${color}">${text}</text>`
    }
    setShapeElement(shape){
        this.shapeEl = shape.render()

    }
    
}

// Defines array of 'questions' using the 'inquirer' library with the following questions.
// Each question is an object that specifies the properties of TEXT, TEXT COLOR, SHAPE COLOR, and Pixel Image.
const questions = [
    {
        type: "input",
        name: "text",
        message: "TEXT: Please enter up to (3) Characters only:",
    },
    {
        type: "input",
        name: "textColor",
        message: "TEXT COLOR: Please enter a color for your Text:",
    },
    {
        type: "input",
        name: "shape",
        message: "SHAPE COLOR: What color would you like your shape to be:",
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
    console.log("Starting init");
	var svgText = "";
	var svg_file = "logo.svg";

    // Prompt the user for answers
    const answers = await inquirer.prompt(questions);

	//user text
	var user_text = "";
	if (answers.text.length > 0 && answers.text.length < 4) {
		// 1-3 chars, valid entry
		user_text = answers.text;
	} else {
		// 0 or 4+ chars, invalid entry
		console.log("Invalid user text field detected! Please enter 1-3 Characters, no more and no less");
        return;
	}
	console.log(`User text: ${user_text}`);
	//user font color
	fontColor = answers["textColor"];
	console.log(`User font color: ${fontColor}`);
	//user shape color
	shapeColor = answers.shape;
	console.log(`User shape color: ${shapeColor}`);
	//user shape type
	shapeType = answers["shapeType"];
	console.log(`User entered shape = ${shapeType}`);
	
	//user shape
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
		console.log("Invalid shape!");
	}
	userShape.setColor(shapeColor);

	var svg = new svgConstructor();
	svg.setTextElement(user_text, fontColor);
	svg.setShapeElement(userShape);
	svgText = svg.render();
	
	//Print shape to log
	console.log("Displaying shape:\n" + svgText);

	console.log("Generating shape!");
	console.log("Writing shape to file...");
	writeToFile(svg_file, svgText); 
}
init()