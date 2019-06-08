import * as React from 'react';
import {CSSProperties} from "react";
import './cactus.css';

export interface ICactus {
    model: string,
    left: string,
    height: string
}

export function Cactus(props: ICactus) {
    const {model, left, height} = props;
    const style: CSSProperties = {height, left};

    return (
        <div className={`cactus model-${model}`} style={style} />
    );
}
