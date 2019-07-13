"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
class FilmSceenshot extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return React.createElement("div", { className: "film", style: {
                backgroundImage: `url(${this.props.screenshotImageURL})`
            } },
            React.createElement("div", { className: "effects" }));
    }
}
exports.FilmSceenshot = FilmSceenshot;
//# sourceMappingURL=FilmSceenshot.js.map