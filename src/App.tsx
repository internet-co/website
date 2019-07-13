import "./styles/Styles.scss";

import * as React from "react";
import * as ReactDOM from "react-dom";
import {RefObject} from "react";
import {ParallaxProvider, Parallax} from "react-scroll-parallax";
import {ReactTypeformEmbed} from "react-typeform-embed";

window.addEventListener("scroll", () => {

    let scrollAnimElements: HTMLCollectionOf<HTMLElement> = document.getElementsByClassName("scroll-animate") as HTMLCollectionOf<HTMLElement>;

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
        } else if (scrollAnimElement.className.indexOf("saturate") !== -1) {
            scrollAnimElement.style.filter = `saturate(${percentage.toFixed(2)}) sepia(${(inversePercentage / 2).toFixed(2)})`;
        }
    }
});

export interface AppProps {
}

export class App extends React.PureComponent<AppProps> {

    contactFormRef;

    constructor(props) {
        super(props);
        this.contactFormRef = React.createRef();
    }

    openContactForm = () => {
        this.contactFormRef.current.typeform.open();
    };

    render() {
        return <ParallaxProvider>
            <a id="logo"><img alt="INTERNET & .CO" src={require("./media/iac-circle-logo.svg")}/></a>
            <div className="film-overlay scroll-animate fade">
                <div className="outer-scratch">
                    <div className="inner-scratch">
                        <div className="background grain"/>
                    </div>
                </div>
            </div>
            <section className="hero is-fullheight" style={{position: "relative"}}>
                <Parallax className="figure-image" y={[-20, 20]} styleOuter={{right: 0, bottom: 0}}>
                    <img src={require("./media/sneaker-pat.png")}/>
                </Parallax>
                <div className="hero-body">
                    <div className="container">
                        <h1 className="title is-big is-size-2-mobile">Cutting-edge technology.<br/>Time-honored approach.</h1>
                        <h2 className="subtitle is-uppercase" style={{lineHeight: "2em"}}>
                            <img src={require("./media/iac-long-logo.svg")} title="Internet & .Co" className="long-logo" style={{height: "2em"}}/> — engineering, UX, and strategy consulting
                            for APIs and developer platforms.
                        </h2>
                    </div>
                </div>
                <Parallax className="figure-image" y={[0, 100]} styleOuter={{left: 0, bottom: 0}}>
                    <img src={require("./media/drone-pat.png")}/>
                </Parallax>
            </section>
            <section className="hero is-fullheight" style={{position: "relative"}}>
                <div className="hero-body">
                    <div className="container">
                        <blockquote className="subtitle">
                            Developer Platforms and APIs are leading the new global digital economy— user experience, community, and tools for developers are more important than ever.
                        </blockquote>
                        <img src={require("./media/mockups.png")} className="scroll-animate saturate"/>
                    </div>
                </div>
            </section>
            <section className="section" style={{position: "relative"}}>
                <Parallax className="figure-image" y={[-20, 20]} styleOuter={{right: 25, bottom: 0}}>
                    <img src={require("./media/vr-pat.png")}/>
                </Parallax>
                <div className="container">
                    <h2 className="subtitle secondary is-uppercase has-text-centered">
                        Trusted By
                    </h2>
                    <div className="columns is-centered is-vcentered is-multiline">
                        <div className="column is-one-quarter has-text-centered">
                            <img src={require("./media/microsoft.svg")} className="customer-logo" alt="Microsoft"/>
                        </div>
                        <div className="column is-one-quarter has-text-centered">
                            <img src={require("./media/verizon-2015.svg")} className="customer-logo" alt="Verizon"/>
                        </div>
                        <div className="column is-one-quarter has-text-centered">
                            <img src={require("./media/ifttt.svg")} className="customer-logo" alt="IFTTT"/>
                        </div>
                        <div className="column is-one-quarter has-text-centered">
                            <img src={require("./media/ford.svg")} className="customer-logo" alt="Ford"/>
                        </div>
                        <div className="column is-one-quarter has-text-centered">
                            <img src={require("./media/bug-labs.svg")} className="customer-logo" alt="Bug Labs"/>
                        </div>
                        <div className="column is-one-quarter has-text-centered">
                            THE ARNOLD GROUP
                        </div>
                    </div>
                </div>
            </section>
            <section className="section has-text-centered">
                <div className="container">
                    <h2 className="subtitle secondary is-uppercase has-text-centered">
                        Want to Chat?
                    </h2>
                    <div className="content">
                        <p>Reach out and let us know how we can help.</p>
                        <p><a className="button is-large is-dark subtitle secondary is-uppercase" onClick={this.openContactForm}>Contact Us</a></p>
                    </div>
                    <div style={{position: "relative"}}>
                        <ReactTypeformEmbed url="https://internetandcompany.typeform.com/to/A6k6YW" popup={true} ref={this.contactFormRef}/>
                    </div>
                </div>
            </section>
            <footer className="footer">
                <div className="level">
                    <div className="level-item is-size-7">
                        &copy;&nbsp;<img src={require("./media/iac-long-logo.svg")} title="Internet & .Co" className="long-logo" style={{height: "1em"}}/>&nbsp;All Rights Reserved
                    </div>
                    <div className="level-item">
                        Say&nbsp;<a href="mailto:hello@internetand.co">hello@internetand.co</a>
                    </div>
                </div>
            </footer>
        </ParallaxProvider>;
    }
}

ReactDOM.render(<App/>, document.getElementById("app"));