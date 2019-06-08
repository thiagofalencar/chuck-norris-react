import * as React from 'react';
import './topTitle.css';

export interface ITopTitle {
   title: string,
   subtitle: string
}

export function TopTitle(props: ITopTitle) {
   const { title, subtitle } = props;
   return (
      <div className="top-title">
         <h1 className="vintage" data-content={`${title}`}>{title}</h1>
         <h3 className="neon">{subtitle}</h3>
      </div>
   )
}
