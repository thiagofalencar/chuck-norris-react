import * as React from 'react';
import {IJokeIcon, IJokeItem} from "./JokesItem";
import './actionIconButton.css';
import {object} from "prop-types";

export interface IActionButton {
   joke: IJokeItem,
   icon: IJokeIcon,
   classes: Array<string>,
   title: string
}

export class ActionIconButton extends React.Component <IActionButton, object> {

   constructor(props: IActionButton) {
      super(props);
   }

   handleClick = () => {
      this.props.icon.actionCallback(this.props.joke);
   };

   render() {
   const {icon, classes, title} = this.props;
      return (
         <div
            className={`action-icon-button ${classes.join(' ')}`}
            onClick={this.handleClick}
         >
            <span>
               <img
                  alt={title}
                  src={icon.cover}
                  className={icon.classes.join(' ')}
               />
            </span>
            <img
               src={icon.src}
               alt={title}
               className={icon.classes.join(' ')} />
         </div>
      )
   }
}
