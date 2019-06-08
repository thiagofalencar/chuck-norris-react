import * as React from 'react';
import './jokeItem.css'
import {ActionIconButton} from "./ActionIconButton";

export interface IJokeItem {
   id: number,
   joke: string,
   categories: Array<string>,
}

export interface IJokeIcon {
   src: string,
   cover: string,
   classes: Array<string>,
   actionCallback: Function
}

export function JokeItem(props: IJokeItem, icon: IJokeIcon) {
   const {joke, id } = props;
   return(
      <li className="joke-item" key={id}>
         <img alt="Norris" className="norris" src='assets/images/norris.png' />
         <h2>"{joke}"</h2>
         <ActionIconButton
            joke={props}
            icon={icon}
            classes={['add-to-favorite']}
            title={'Add to favorites'}
         />
      </li>
   )
}
