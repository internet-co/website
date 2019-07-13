"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const Screenshot_1 = require("./Screenshot");
const lodash_1 = require("lodash");
class Project extends React.PureComponent {
    constructor(props) {
        super(props);
    }
    render() {
        let description = this.props.description || "";
        if (lodash_1.isString(description)) {
            description = description.replace(/^(.)/, "[$1]");
        }
        return React.createElement("section", { className: "hero is-fullheight project" },
            React.createElement("div", { className: "hero-body" },
                React.createElement("div", { className: "container" },
                    React.createElement("h1", { className: "title" }, this.props.title),
                    !this.props.subtitle ? null : React.createElement("h2", { className: "subtitle" }, this.props.subtitle),
                    React.createElement("p", { className: "two-column-text description" }, description),
                    React.createElement("div", { style: { display: "flex", justifyContent: "center" } },
                        React.createElement(Screenshot_1.Screenshot, { thumbnailView: React.createElement("img", { src: "https://picsum.photos/1024/768?random", width: 300, height: 200 }), fullView: React.createElement("img", { src: "https://picsum.photos/1024/768?random" }) }),
                        React.createElement(Screenshot_1.Screenshot, null)))));
    }
}
exports.Project = Project;
//# sourceMappingURL=Project.js.map