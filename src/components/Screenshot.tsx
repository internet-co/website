import * as React from "react";

export interface ScreenshotProps {
    thumbnailView?: React.ReactElement;
    fullView?: React.ReactElement;
}

export interface ScreenshotState {
    active?: boolean;
}

export class Screenshot extends React.Component<ScreenshotProps, ScreenshotState> {

    static SCREENSHOT_COMPONENTS: Screenshot[] = [];

    constructor(props) {
        super(props);
        this.state = {};

        // TODO: Remove on destroy
        Screenshot.SCREENSHOT_COMPONENTS.push(this);
    }

    componentWillUnmount(): void {

    }

    handleToggleActive = () => {

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

    renderThumbnail() {
        return <div className="screenshot-thumbanil" onClick={this.handleToggleActive}>
            {this.props.thumbnailView || <React.Fragment>&nbsp;</React.Fragment>}
        </div>
    }

    renderFull() {
        if (!this.state.active || !this.props.fullView) {
            return null;
        }

        return <div className="screenshot-full-container">
            <div className="screenshot-full">
                {this.props.fullView || <React.Fragment>&nbsp;</React.Fragment>}
            </div>
        </div>
    }

    render() {
        return <div className={"screenshot-container"}
                    onClick={this.handleToggleActive}>
            {this.renderThumbnail()}
            {this.renderFull()}
        </div>;
    }
}