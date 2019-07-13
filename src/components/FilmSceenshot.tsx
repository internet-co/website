import * as React from "react";

export interface FilmSceenshotProps {
    screenshotImageURL: string;
}

export interface FilmSceenshotState {
}

export class FilmSceenshot extends React.Component<FilmSceenshotProps, FilmSceenshotState> {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        return <div className="film" style={{
            backgroundImage: `url(${this.props.screenshotImageURL})`
        }}>
            <div className="effects"/>
        </div>
    }
}