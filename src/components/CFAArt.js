"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_on_screen_1 = require("react-on-screen");
class CFAArt extends React.PureComponent {
    constructor(props) {
        super(props);
        this.canvasElement = React.createRef();
    }
    doRenderArt() {
        if (this.canvasElement.current) {
            /*const code = {
                setup: {
                    background: "#fff",
                    minSize: 0.2,
                    zoom: 1,
                    speed: 100,
                    acc: 1.02,
                    start: "INIT"
                },
                INIT(s) {
                    this.rule("SUN", s, {rotate: -Math.random() * 180, bri: 0.2});
                },
                SUN(s) {
                    this.rule("CILIA", s);
                    this.rule("SUN", s, {x: 1.2, rotate: 7, scale: 0.97});
                },
                CILIA(s) {
                    const r = Math.random() * 1601;
                    let weight = 0;
                    switch (true) {
                        case r <= (weight += 1):
                            this.CIRCLE(s);
                            this.rule("SUN", s, {scale: 1});
                            break;
                        case r <= (weight += 1000):
                            this.rule("O_BLOCK", s);
                            this.rule("CILIA", s, {x: 1.2, scale: 0.97});
                            break;
                        case r <= (weight += 100):
                            this.rule("PEACE", s, {rotate: 90});
                            this.rule("CILIA", s, {x: 1.2, scale: 0.97});
                            break;
                        case r <= (weight += 100):
                            this.rule("PEACE", s, {rotate: 90});
                            this.rule("CILIA", s, {x: 1.2, scale: 0.97, rotate: -5});
                            break;
                        case r <= (weight += 100):
                            this.rule("PEACE", s, {rotate: 90});
                            this.rule("CILIA", s, {x: 1.2, scale: 0.97, rotate: 6});
                            break;
                        case r <= (weight += 100):
                            this.rule("LOVE", s, {rotate: 90});
                            this.rule("CILIA", s, {x: 1.2, scale: 0.97});
                            break;
                        case r <= (weight += 100):
                            this.rule("LOVE", s, {rotate: 90});
                            this.rule("CILIA", s, {x: 1.2, scale: 0.97, rotate: 6});
                            break;
                        case r <= (weight += 100):
                            this.rule("LOVE", s, {rotate: 90});
                            this.rule("CILIA", s, {x: 1.2, scale: 0.97, rotate: -6});
                            break;
                    }
                },
                LOVE(s) {
                    this.rule("L_BLOCK", s, {x: 0});
                    this.rule("O_BLOCK", s, {x: 1});
                    this.rule("V_BLOCK", s, {x: 2});
                    this.rule("E_BLOCK", s, {x: 3});
                },
                PEACE(s) {
                    this.rule("E_BLOCK", s, {x: 0});
                    this.rule("C_BLOCK", s, {x: -1});
                    this.rule("A_BLOCK", s, {x: -2});
                    this.rule("E_BLOCK", s, {x: -3});
                    this.rule("P_BLOCK", s, {x: -4});
                },
                L_BLOCK(s) {
                    this.SQUARE(s, {x: -0.28, scale: [0.25, 1]});
                    this.SQUARE(s, {y: -0.4, scale: [0.8, 0.25]});
                },
                O_BLOCK(s) {
                    this.CIRCLE(s, {scale: [0.95, 1]});
                    this.CIRCLE(s, {scale: [0.46, 0.47], bri: 1});
                },
                V_BLOCK(s) {
                    this.SQUARE(s, {x: -0.2, y: 0.2, scale:[0.25, 0.6], skew: [-45.5, 0]});
                    this.SQUARE(s, {x: 0.2, y: 0.2, scale:[0.25, 0.6], skew: [45.5, 0]});
                    this.TRIANGLE(s, {y: -0.2, rotate: 180, scale: [0.44, 0.5]});
                },
                E_BLOCK(s) {
                    this.SQUARE(s, {x: -0.275, scale:[0.25, 1]});
                    this.SQUARE(s, {y: 0.4, scale:[0.8, 0.2]});
                    this.SQUARE(s, {y: -0.4, scale:[0.8, 0.2]});
                    this.SQUARE(s, {scale:[0.5, 0.2]});
                },
                P_BLOCK(s) {
                    this.SQUARE(s, {x: -0.2, scale:[0.25, 1]});
                    this.SQUARE(s, {x: -0.1, y: 0.2, scale:[0.4, 0.6]});
                    this.CIRCLE(s, {x: 0.1, y: 0.2, scale:[0.5, 0.6]});
                    this.CIRCLE(s, {x: 0.01, y: 0.2, scale: 0.22, bri: 1});
                },
                A_BLOCK(s) {
                    this.SQUARE(s, {x: -0.2, y: -0.2, scale:[0.3, 0.6], skew:[45.5, 0]});
                    this.SQUARE(s, {x: 0.2, y: -0.2, scale:[0.3, 0.6], skew:[-45.5, 0]});
                    this.TRIANGLE(s, {y: 0.2, scale:[0.44, 0.5]});
                    this.SQUARE(s, {y: -0.25, scale:[0.44, 0.25]});
                    this.TRIANGLE(s, {y: -0.1, scale:[0.2, 0.25], sat: -1, bri: 1});
                },
                C_BLOCK(s) {
                    this.CIRCLE(s, {scale:[0.95, 1]});
                    this.CIRCLE(s, {scale:0.5, bri: 1});
                    this.SQUARE(s, {x: 0.25, scale:[0.46, 0.25], bri: 1});
                }
            };

            /*const code = {
                setup: {
                    background: "#fff",
                    minSize: 0.02,
                    zoom: 1,
                    speed: 4000,
                    zSorting: true,
                    start: "init"
                },
                init(s) {
                    this.CIRCLE(s, {scale: 3});
                    this.rule('tree', s);
                },
                tree(s) {
                    const r = Math.random() * 22;
                    switch (true) {
                        case r <= 2:
                            this.CIRCLE(s, {scale: 3});
                            this.rule('tree', s, {scale: 0.5, rotate: 90, y: 0.995, bri: 0.07, z:-1});
                            this.rule('tree', s, {scale: 0.9, rotate: 90, y: 0.995, bri: 0.07, z:-1});
                            break;
                        default:
                            this.SQUARE(s, {scale: 2});
                            this.rule('tree', s, {scale: 0.997, y: 0.9});
                    }
                }
            };*/
            //cfa.run(code, this.canvasElement.current);
            //console.log("render");
        }
    }
    /*componentDidMount(): void {
        let element = ReactDOM.findDOMNode(this);
        const code = {
            setup: {
                background: "#fff",
                minSize: 0.2,
                zoom: 1,
                speed: 100,
                acc: 1.02,
                start: "INIT"
            },
            INIT(s) {
                this.rule("SUN", s, {rotate: -Math.random() * 180, bri: 0.2});
            },
            SUN(s) {
                this.rule("CILIA", s);
                this.rule("SUN", s, {x: 1.2, rotate: 7, scale: 0.97});
            },
            CILIA(s) {
                const r = Math.random() * 1601;
                let weight = 0;
                switch (true) {
                    case r <= (weight += 1):
                        this.CIRCLE(s);
                        this.rule("SUN", s, {scale: 1});
                        break;
                    case r <= (weight += 1000):
                        this.rule("O_BLOCK", s);
                        this.rule("CILIA", s, {x: 1.2, scale: 0.97});
                        break;
                    case r <= (weight += 100):
                        this.rule("PEACE", s, {rotate: 90});
                        this.rule("CILIA", s, {x: 1.2, scale: 0.97});
                        break;
                    case r <= (weight += 100):
                        this.rule("PEACE", s, {rotate: 90});
                        this.rule("CILIA", s, {x: 1.2, scale: 0.97, rotate: -5});
                        break;
                    case r <= (weight += 100):
                        this.rule("PEACE", s, {rotate: 90});
                        this.rule("CILIA", s, {x: 1.2, scale: 0.97, rotate: 6});
                        break;
                    case r <= (weight += 100):
                        this.rule("LOVE", s, {rotate: 90});
                        this.rule("CILIA", s, {x: 1.2, scale: 0.97});
                        break;
                    case r <= (weight += 100):
                        this.rule("LOVE", s, {rotate: 90});
                        this.rule("CILIA", s, {x: 1.2, scale: 0.97, rotate: 6});
                        break;
                    case r <= (weight += 100):
                        this.rule("LOVE", s, {rotate: 90});
                        this.rule("CILIA", s, {x: 1.2, scale: 0.97, rotate: -6});
                        break;
                }
            },
            LOVE(s) {
                this.rule("L_BLOCK", s, {x: 0});
                this.rule("O_BLOCK", s, {x: 1});
                this.rule("V_BLOCK", s, {x: 2});
                this.rule("E_BLOCK", s, {x: 3});
            },
            PEACE(s) {
                this.rule("E_BLOCK", s, {x: 0});
                this.rule("C_BLOCK", s, {x: -1});
                this.rule("A_BLOCK", s, {x: -2});
                this.rule("E_BLOCK", s, {x: -3});
                this.rule("P_BLOCK", s, {x: -4});
            },
            L_BLOCK(s) {
                this.SQUARE(s, {x: -0.28, scale: [0.25, 1]});
                this.SQUARE(s, {y: -0.4, scale: [0.8, 0.25]});
            },
            O_BLOCK(s) {
                this.CIRCLE(s, {scale: [0.95, 1]});
                this.CIRCLE(s, {scale: [0.46, 0.47], bri: 1});
            },
            V_BLOCK(s) {
                this.SQUARE(s, {x: -0.2, y: 0.2, scale:[0.25, 0.6], skew: [-45.5, 0]});
                this.SQUARE(s, {x: 0.2, y: 0.2, scale:[0.25, 0.6], skew: [45.5, 0]});
                this.TRIANGLE(s, {y: -0.2, rotate: 180, scale: [0.44, 0.5]});
            },
            E_BLOCK(s) {
                this.SQUARE(s, {x: -0.275, scale:[0.25, 1]});
                this.SQUARE(s, {y: 0.4, scale:[0.8, 0.2]});
                this.SQUARE(s, {y: -0.4, scale:[0.8, 0.2]});
                this.SQUARE(s, {scale:[0.5, 0.2]});
            },
            P_BLOCK(s) {
                this.SQUARE(s, {x: -0.2, scale:[0.25, 1]});
                this.SQUARE(s, {x: -0.1, y: 0.2, scale:[0.4, 0.6]});
                this.CIRCLE(s, {x: 0.1, y: 0.2, scale:[0.5, 0.6]});
                this.CIRCLE(s, {x: 0.01, y: 0.2, scale: 0.22, bri: 1});
            },
            A_BLOCK(s) {
                this.SQUARE(s, {x: -0.2, y: -0.2, scale:[0.3, 0.6], skew:[45.5, 0]});
                this.SQUARE(s, {x: 0.2, y: -0.2, scale:[0.3, 0.6], skew:[-45.5, 0]});
                this.TRIANGLE(s, {y: 0.2, scale:[0.44, 0.5]});
                this.SQUARE(s, {y: -0.25, scale:[0.44, 0.25]});
                this.TRIANGLE(s, {y: -0.1, scale:[0.2, 0.25], sat: -1, bri: 1});
            },
            C_BLOCK(s) {
                this.CIRCLE(s, {scale:[0.95, 1]});
                this.CIRCLE(s, {scale:0.5, bri: 1});
                this.SQUARE(s, {x: 0.25, scale:[0.46, 0.25], bri: 1});
            }
        };

        cfa.run(code, element);
    }*/
    render() {
        return React.createElement(react_on_screen_1.default, { once: true, className: this.props.className }, ({ isVisible }) => {
            if (isVisible) {
                this.doRenderArt();
            }
            return React.createElement("canvas", { ref: this.canvasElement, width: 650, height: 650 });
        });
    }
}
exports.CFAArt = CFAArt;
//# sourceMappingURL=CFAArt.js.map