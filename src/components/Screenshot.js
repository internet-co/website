"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
class Screenshot extends React.Component {
    constructor(props) {
        super(props);
        this.handleToggleActive = () => {
            let isActive = !this.state.active;
            if (isActive) {
                for (let screenshot of Screenshot.SCREENSHOT_COMPONENTS) {
                    screenshot.setState({
                        active: false
                    });
                }
            }
            this.setState({
                active: isActive
            });
        };
        this.state = {};
        // TODO: Remove on destroy
        Screenshot.SCREENSHOT_COMPONENTS.push(this);
    }
    componentWillUnmount() {
    }
    renderThumbnail() {
        return React.createElement("div", { className: "screenshot-thumbanil", onClick: this.handleToggleActive }, this.props.thumbnailView || React.createElement(React.Fragment, null, "\u00A0"));
    }
    renderFull() {
        if (!this.state.active || !this.props.fullView) {
            return null;
        }
        return React.createElement("div", { className: "screenshot-full-container" },
            React.createElement("div", { className: "screenshot-full" }, this.props.fullView || React.createElement(React.Fragment, null, "\u00A0")));
    }
    render() {
        return React.createElement("div", { className: "screenshot-container", onClick: this.handleToggleActive },
            this.renderThumbnail(),
            this.renderFull());
    }
}
Screenshot.SCREENSHOT_COMPONENTS = [];
exports.Screenshot = Screenshot;
//# sourceMappingURL=Screenshot.js.map