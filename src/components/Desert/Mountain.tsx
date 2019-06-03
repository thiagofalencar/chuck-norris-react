import * as React from 'react';
import './mountain.css';
import {CSSProperties} from "react";

export interface IMountain {
   bottom: string,
   left: string,
   height: string,
   width: string,
   background: string
}

export function Mountain(props: IMountain) {
   const style: CSSProperties = {
      ...props
   };

   return (
      <div className="mountain" style={style}> </div>
   );
}
