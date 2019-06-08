import * as React from 'react';
import './jokesList.css';

export interface IJokeList {
   list: Element[],
   icon: any,
   name: string,
   title: string,
   checked: boolean,
   tabButtonAction: Function,
   noItemsText: string,
   isLoading: boolean,
}

export class JokesList extends React.Component<IJokeList, object> {
   constructor(props: IJokeList) {
      super(props);
      this.listClasses = this.listClasses.bind(this)
   }

   listClasses = ():string => {
      const listClasses = ['jokes-list'];
      if (this.props.isLoading) listClasses.push('loading');
      if (this.props.list.length === 0) listClasses.push('no-items');
      return listClasses.join(' ');
   };

   render () {
      const {name, icon, title, list, checked, tabButtonAction, noItemsText} = this.props;
      return (
         <div className="jokes-list-container">
            <input className="input" name="joke-tabs" defaultChecked={checked} type="radio" id={`tab-${name}`} />
            <label onClick={() => tabButtonAction()} title={title} htmlFor={`tab-${name}`}>{icon}</label>
            <ul
               data-loading-text="cooking"
               data-no-items-text={noItemsText}
               className={this.listClasses()}
               id={`tab-${name}-jokes`}
            >
               {list}
            </ul>
         </div>
      )
   }
}
