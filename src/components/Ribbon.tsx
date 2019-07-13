import * as React from "react";
import {random} from "lodash";

type RibbonPoint = [number, number];

class RibbonFold {

    previousFold:RibbonFold;
    creaseOffset:number;
    height:number;

    topLeft:RibbonPoint;

    constructor()
    {
        this.creaseOffset = random(0, 200);
        this.height = random(100, 600);


    }
}

export interface RibbonProps {
    ribbonWidth?:number;
}

export class Ribbon extends React.PureComponent<RibbonProps> {

    canvasElement;

    constructor(props) {
        super(props);
        this.canvasElement = React.createRef();
    }

    componentDidMount(): void {
        this.drawRibbon();
    }

    drawRibbon()
    {
        let canvas = this.canvasElement.current;
        let ctx = canvas.getContext("2d");
        let cw = canvas.width = window.outerWidth;
        let ch = canvas.height = window.outerHeight;

        let ribbonWidth = this.props.ribbonWidth || 100;
        let yCursor = 0;

        let ribbonStart = new RibbonFold();
    }

    render() {
        return <canvas ref={this.canvasElement} className="ribbon"/>;
    }
}