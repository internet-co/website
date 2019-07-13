import * as React from "react";
import {Screenshot} from "./Screenshot";
import {isString} from "lodash";

export interface ProjectProps {
    title: string;
    subtitle?: string;
    description?;
}

export class Project extends React.PureComponent<ProjectProps> {

    constructor(props) {
        super(props);
    }

    render() {

        let description = this.props.description || "";

        if(isString(description))
        {
            description = description.replace(/^(.)/, "[$1]");
        }

        return <section className="hero is-fullheight project">
            <div className="hero-body">
                <div className="container">
                    <h1 className="title">{this.props.title}</h1>
                    {!this.props.subtitle ? null : <h2 className="subtitle">
                        {this.props.subtitle}
                    </h2>}
                    <p className="two-column-text description">{description}</p>
                    <div style={{display:"flex", justifyContent:"center"}}>
                        <Screenshot thumbnailView={<img src="https://picsum.photos/1024/768?random" width={300} height={200}/>} fullView={<img src="https://picsum.photos/1024/768?random"/>}/>
                        <Screenshot/>
                    </div>
                </div>
            </div>
        </section>;
    }
}