// const { validate } = require('@babel/types');
const inquirer = require('inquirer');
const fs = require('fs');
const {circle, square, triangle} = require('./lib/shapes');

class svgConstructor {
    constructor(){
        this.text = ''
        this.shapeEl = ''
    }
    render(){
        return `<svg...`
    }
    setTextElement(text,color){
        this.textElement = `<text x="150" y="125" font-size="60" text-anchor="middle" fill="${color}">${text}</text>`
    }
    setShapeElement(shape){
        this.shapeElement = shape.render()

    }
};


const questions = [
    {
        type: 'list',
        name: 'color',
        message: 'What color would you like the image to be?',
        choices: ['red', 'blue', 'green', 'yellow']
    },
    {
        type: 'list',
        name: 'shape',
        message: 'Please select a shape for the logo.',
        choices: ['circle', 'square', 'triangle']
    },
    {
        type: 'input',
        name: 'text',
        message: 'Please enter 3 letters to be displayed on the logo.',
        validate: nameInput => {
            if (nameInput.length > 0 || nameInput.length < 4) {
                return true;
            } else {
                console.log("Please make sure that your text is between 1-3 characters long!");
                return false;
            }
        }
    },
    {
        type: 'list',
        name: 'text-color',
        message: 'Please select a color for your text',
        choices: ['red', 'blue', 'green', 'yellow']
    }
];

function writeToFile(fileName, data) {
	console.log("Writing [" + data + "] to file [" + fileName + "]")
    filesystem.writeFile(fileName, data, function (err) {
        if (err) {
            return console.log(err);
        }
        console.log("Congratulations, you have Generated a logo.svg!");
    });
}

async function init() {
    console.log("Starting init");
	let svgText = "";
	let svg_file = "logo.svg";

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
	console.log("User text: [" + user_text + "]");
	//user font color
	user_font_color = answers["text-color"];
	console.log("User font color: [" + user_font_color + "]");
	//user shape color
	user_shape_color = answers.shape;
	console.log("User shape color: [" + user_shape_color + "]");
	//user shape type
	user_shape_type = answers["pixel-image"];
	console.log("User entered shape = [" + user_shape_type + "]");
	
	//user shape
	let user_shape;
	if (user_shape_type === "Square" || user_shape_type === "square") {
		user_shape = new Square();
		console.log("User selected Square shape");
	}
	else if (user_shape_type === "Circle" || user_shape_type === "circle") {
		user_shape = new Circle();
		console.log("User selected Circle shape");
	}
	else if (user_shape_type === "Triangle" || user_shape_type === "triangle") {
		user_shape = new Triangle();
		console.log("User selected Triangle shape");
	}
	else {
		console.log("Invalid shape!");
	}
	user_shape.setColor(user_shape_color);

	// Create a new Svg instance and add the shape and text elements to it
	var svg = new Svg();
	svg.setTextElement(user_text, user_font_color);
	svg.setShapeElement(user_shape);
	svgText = svg.render();
	
	//Print shape to log
	console.log("Displaying shape:\n\n" + svgText);
	//document.getElementById("svg_image").innerHTML = svgText;

	console.log("Shape generation complete!");
	console.log("Writing shape to file...");
	writeToFile(svg_file, svgText); 
}
init()

//     inquirer.prompt(questions)
//     .then((answers) => {
//         const shapes = {circle, square, triangle}

//     })


// function init() {

// };