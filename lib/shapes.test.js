const {Circle, Square, Triangle} = require("./shapes")

// Circle test
describe('Circle', () => {
    it('renders  blue circle', () => {
      const shape = new Circle();
      var color =('blue')
      shape.setColor(color);
      expect(shape.render()).toEqual(`<circle cx="50%" cy="50%" r="100" height="200" width="300" fill="${color}"/>`);
    });
});

// Square test
describe('Square', () => {
    it('renders blue square', () => {
    const shape = new Square();
    var color =('green')
    shape.setColor(color);
    expect(shape.render()).toEqual(`<rect x="50" height="200" width="300" fill="${color}"/>`);
    });
});

// Triangle test
describe('Triangle', () => {
    it('renders blue triangle', () => {
    const shape = new Triangle();
    var color =('blue')
    shape.setColor(color);
    expect(shape.render()).toEqual(`<polygon height="200" width="300" points="0,200 300,200 200,0" fill="${color}"/>`);
    });
});
    