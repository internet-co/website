"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./styles/Styles.scss");
const React = require("react");
const ReactDOM = require("react-dom");
const react_scroll_parallax_1 = require("react-scroll-parallax");
const react_typeform_embed_1 = require("react-typeform-embed");
window.addEventListener("scroll", () => {
    let scrollAnimElements = document.getElementsByClassName("scroll-animate");
    let scrollTop = window.scrollY;
    let scrollBottom = window.scrollY + window.outerHeight;
    //console.log(`Top: ${scrollTop} Bottom: ${scrollBottom}`)
    for (let scrollAnimElement of scrollAnimElements) {
        let elementPosition = scrollAnimElement.getBoundingClientRect();
        let percentage = ((scrollTop - (elementPosition.top)) / (window.outerHeight / 2));
        percentage = Math.min(1, Math.max(0, percentage));
        let inversePercentage = 1 - percentage;
        if (scrollAnimElement.className.indexOf("fade") !== -1) {
            scrollAnimElement.style.opacity = inversePercentage.toFixed(2);
        }
        else if (scrollAnimElement.className.indexOf("saturate") !== -1) {
            scrollAnimElement.style.filter = `saturate(${percentage.toFixed(2)}) sepia(${(inversePercentage / 2).toFixed(2)})`;
        }
    }
});
class App extends React.PureComponent {
    constructor(props) {
        super(props);
        this.openContactForm = () => {
            this.contactFormRef.current.typeform.open();
        };
        this.contactFormRef = React.createRef();
    }
    render() {
        return React.createElement(react_scroll_parallax_1.ParallaxProvider, null,
            React.createElement("a", { id: "logo" },
                React.createElement("img", { alt: "INTERNET & .CO", src: require("./media/iac-circle-logo.svg") })),
            React.createElement("div", { className: "film-overlay scroll-animate fade" },
                React.createElement("div", { className: "outer-scratch" },
                    React.createElement("div", { className: "inner-scratch" },
                        React.createElement("div", { className: "background grain" })))),
            React.createElement("section", { className: "hero is-fullheight", style: { position: "relative" } },
                React.createElement(react_scroll_parallax_1.Parallax, { className: "figure-image", y: [-20, 20], styleOuter: { right: 0, bottom: 0 } },
                    React.createElement("img", { src: require("./media/sneaker-pat.png") })),
                React.createElement("div", { className: "hero-body" },
                    React.createElement("div", { className: "container" },
                        React.createElement("h1", { className: "title is-big is-size-2-mobile" },
                            "Cutting-edge technology.",
                            React.createElement("br", null),
                            "Time-honored approach."),
                        React.createElement("h2", { className: "subtitle is-uppercase", style: { lineHeight: "2em" } },
                            React.createElement("img", { src: require("./media/iac-long-logo.svg"), title: "Internet & .Co", className: "long-logo", style: { height: "2em" } }),
                            " \u2014 engineering, UX, and strategy consulting for APIs and developer platforms."))),
                React.createElement(react_scroll_parallax_1.Parallax, { className: "figure-image", y: [0, 100], styleOuter: { left: 0, bottom: 0 } },
                    React.createElement("img", { src: require("./media/drone-pat.png") }))),
            React.createElement("section", { className: "hero is-fullheight", style: { position: "relative" } },
                React.createElement("div", { className: "hero-body" },
                    React.createElement("div", { className: "container" },
                        React.createElement("blockquote", { className: "subtitle" }, "Developer Platforms and APIs are leading the new global digital economy\u2014 user experience, community, and tools for developers are more important than ever."),
                        React.createElement("img", { src: require("./media/mockups.png"), className: "scroll-animate saturate" })))),
            React.createElement("section", { className: "section", style: { position: "relative" } },
                React.createElement(react_scroll_parallax_1.Parallax, { className: "figure-image", y: [-20, 20], styleOuter: { right: 25, bottom: 0 } },
                    React.createElement("img", { src: require("./media/vr-pat.png") })),
                React.createElement("div", { className: "container" },
                    React.createElement("h2", { className: "subtitle secondary is-uppercase has-text-centered" }, "Trusted By"),
                    React.createElement("div", { className: "columns is-centered is-vcentered is-multiline" },
                        React.createElement("div", { className: "column is-one-quarter has-text-centered" },
                            React.createElement("img", { src: require("./media/microsoft.svg"), className: "customer-logo", alt: "Microsoft" })),
                        React.createElement("div", { className: "column is-one-quarter has-text-centered" },
                            React.createElement("img", { src: require("./media/verizon-2015.svg"), className: "customer-logo", alt: "Verizon" })),
                        React.createElement("div", { className: "column is-one-quarter has-text-centered" },
                            React.createElement("img", { src: require("./media/ifttt.svg"), className: "customer-logo", alt: "IFTTT" })),
                        React.createElement("div", { className: "column is-one-quarter has-text-centered" },
                            React.createElement("img", { src: require("./media/ford.svg"), className: "customer-logo", alt: "Ford" })),
                        React.createElement("div", { className: "column is-one-quarter has-text-centered" },
                            React.createElement("img", { src: require("./media/bug-labs.svg"), className: "customer-logo", alt: "Bug Labs" })),
                        React.createElement("div", { className: "column is-one-quarter has-text-centered" }, "THE ARNOLD GROUP")))),
            React.createElement("section", { className: "section has-text-centered" },
                React.createElement("div", { className: "container" },
                    React.createElement("h2", { className: "subtitle secondary is-uppercase has-text-centered" }, "Want to Chat?"),
                    React.createElement("div", { className: "content" },
                        React.createElement("p", null, "Reach out and let us know how we can help."),
                        React.createElement("p", null,
                            React.createElement("a", { className: "button is-large is-dark subtitle secondary is-uppercase", onClick: this.openContactForm }, "Contact Us"))),
                    React.createElement("div", { style: { position: "relative" } },
                        React.createElement(react_typeform_embed_1.ReactTypeformEmbed, { url: "https://internetandcompany.typeform.com/to/A6k6YW", popup: true, ref: this.contactFormRef })))),
            React.createElement("footer", { className: "footer" },
                React.createElement("div", { className: "level" },
                    React.createElement("div", { className: "level-item is-size-7" },
                        "\u00A9\u00A0",
                        React.createElement("img", { src: require("./media/iac-long-logo.svg"), title: "Internet & .Co", className: "long-logo", style: { height: "1em" } }),
                        "\u00A0All Rights Reserved"),
                    React.createElement("div", { className: "level-item" },
                        "Say\u00A0",
                        React.createElement("a", { href: "mailto:hello@internetand.co" }, "hello@internetand.co")))));
    }
}
exports.App = App;
ReactDOM.render(React.createElement(App, null), document.getElementById("app"));
//# sourceMappingURL=App.js.map