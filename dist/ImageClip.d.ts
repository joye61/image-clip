import { ImageClipOption, ImageClipState } from "./types";
import React from "react";
export declare class ImageClip extends React.Component<ImageClipOption, ImageClipState> {
    static defaultProps: {
        containerPadding: number;
        containerWidth: number;
        containerHeight: number;
    };
    state: ImageClipState;
    imageUrl: string;
    originWidth: number;
    originHeight: number;
    scaleWidth: number;
    scaleHeight: number;
    computeScaleSize(): void;
    componentDidMount(): void;
    render(): JSX.Element | null;
}
