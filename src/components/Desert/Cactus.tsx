import * as React from 'react';
import './cactus.css';
import {CSSProperties} from "react";

export interface ICactus {
    model: string,
    left: string,
    height: string
}

export function Cactus(props: ICactus) {
    const {model, left, height} = props;
    const style: CSSProperties = {
        left: left,
        height: height
    };

    return (
        <div className={`cactus model-${model}`} style={style}> </div>
    );
}
