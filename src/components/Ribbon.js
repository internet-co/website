"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const lodash_1 = require("lodash");
class RibbonFold {
    constructor() {
        this.creaseOffset = lodash_1.random(0, 200);
        this.height = lodash_1.random(100, 600);
    }
}
class Ribbon extends React.PureComponent {
    constructor(props) {
        super(props);
        this.canvasElement = React.createRef();
    }
    componentDidMount() {
        this.drawRibbon();
    }
    drawRibbon() {
        let canvas = this.canvasElement.current;
        let ctx = canvas.getContext("2d");
        let cw = canvas.width = window.outerWidth;
        let ch = canvas.height = window.outerHeight;
        let ribbonWidth = this.props.ribbonWidth || 100;
        let yCursor = 0;
        let ribbonStart = new RibbonFold();
    }
    render() {
        return React.createElement("canvas", { ref: this.canvasElement, className: "ribbon" });
    }
}
exports.Ribbon = Ribbon;
//# sourceMappingURL=Ribbon.js.map