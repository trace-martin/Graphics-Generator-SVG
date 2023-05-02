// defines parent class for extenstion to others
class Shape{    
        constructor(){
            this.shapeColor=''
        }
        setColor(shapeColor){
            this.shapeColor=(shapeColor);
        }
    }
    // shape values to be used for logo.svg
    class Circle extends Shape{
        render(){
            return `<circle cx="50%" cy="50%" r="100" height="100%" width="100%" fill="${this.shapeColor}"/>`
        }
    }
    class Square extends Shape{
        render(){
            return `<rect x="50" height="200" width="200" fill="${this.shapeColor}"/>`
        }
    }
    class Triangle extends Shape{
        render(){
            return `<polygon height="100%" width="100%" points="0,200 300,200 150,0" fill="${this.shapeColor}"/>`
        }
    };
    // exports classes for consturction of svg
    module.exports = {Circle, Square, Triangle}