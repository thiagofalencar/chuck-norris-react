import * as React from 'react';
import {JokesList} from "./JokeList/JokesList";
import {IJokeItem, JokeItem} from "./JokeList/JokesItem";
import NorrisService from "../services/NorrisService";
import './norrisJokes.css';

export interface INorrisJokes {}

interface State {
   randomJokes: [],
   favorites: [],
   isLoadingRandomJokes: boolean,
   isLoadingFavoritesJokes: boolean
}

export class NorrisJokes extends React.Component<INorrisJokes, State> {
   private service: NorrisService;

   constructor(props: INorrisJokes) {
      super(props);
      this.state = {
         randomJokes: [],
         favorites: [],
         isLoadingFavoritesJokes: true,
         isLoadingRandomJokes: true,
      };
      this.service = new NorrisService();
      this.resetRandomJokes = this.resetRandomJokes.bind(this);
   }

   randomJokeCallback = (joke: IJokeItem) => {
      if (this.service.isThisAJokeAlreadyInFavorites(joke.id)) {
         this.service.removeFromFavorites(joke);
      } else {
         this.service.addToFavorites(joke);
      }
      this.loadRandomJokes(false);
   };

   favoriteJokeCallback = (joke: IJokeItem) => {
      this.service.removeFromFavorites(joke);
      this.loadFavoritesJokes(false);
   };

   getRandomJokeItem(joke: IJokeItem ) {
      let assetsPath, image, cover, classes, isThisAJokeAlreadyInFavorites;
      isThisAJokeAlreadyInFavorites = (this.service.isThisAJokeAlreadyInFavorites(joke.id));
      assetsPath = 'assets/images';
      image = (isThisAJokeAlreadyInFavorites) ? 'checked' : 'favorite';
      cover = (isThisAJokeAlreadyInFavorites) ? 'remove' : 'favorite';
      classes = ['icon-favorite', (isThisAJokeAlreadyInFavorites) ? 'remove' : 'star'];

      return JokeItem(joke, {
         src: `${assetsPath}/${image}.png`,
         cover: `${assetsPath}/${cover}.png`,
         classes: classes,
         actionCallback: this.randomJokeCallback
      });
   }

  getFavoriteItem(joke: IJokeItem ) {
      let assetsPath, image, cover, classes;
      assetsPath = 'assets/images';
      image = 'remove';
      cover = 'remove';
      classes = ['icon-favorite', 'remove'];

      return JokeItem(joke, {
         src: `${assetsPath}/${image}.png`,
         cover: `${assetsPath}/${cover}.png`,
         classes: classes,
         actionCallback: this.favoriteJokeCallback
      });
   }

   loadRandomJokes = (loadingAnimation: boolean = true) => {
      if (loadingAnimation) {
         this.setState((state) => {
            return {
               ...state,
               isLoadingRandomJokes: true,
            }
         });
      }

      this.service.getRandomJokes(
         (data: []) => {
            this.setState((prev: any) => {
               return {
                  ...prev,
                  randomJokes: data.map((item: IJokeItem) => {
                     return this.getRandomJokeItem(item)
                  })
               }
            });
            setTimeout(() => {
               this.setState((state) => {
                  return {
                     ...state,
                     isLoadingRandomJokes: false,
                  }
               });
            }, 500);
         },
         console.error
      );
   };

   loadFavoritesJokes = (loadingAnimation: boolean = true) => {
      if (loadingAnimation) {
         this.setState((state) => {
            return {...state, isLoadingFavoritesJokes: true}
         });
      }

      this.service.getFavoritesJokes(
         (data: []) => {
            this.setState(Object.assign(
               this.state,
               { favorites: data.map((item: IJokeItem) => {
                  return this.getFavoriteItem(item)
               })}
            ));
            setTimeout(() => {
               this.setState((state) => {
                  return {...state, isLoadingFavoritesJokes: false}
               });
            }, 500);
         },
         console.error
      );
   };

   resetRandomJokes() {
      this.service.resetRandomJokes();
      this.loadRandomJokes(true);
   }

   componentDidMount(): void {
      this.loadRandomJokes(true);
   }

   render () {
      const {randomJokes, favorites, isLoadingFavoritesJokes, isLoadingRandomJokes} = this.state;
      return (
         <div className="norris-container">
            <a id="reset-random-jokes" title="Reset random Jokes" className="btn reset">
               <img onClick={this.resetRandomJokes} alt="Reset jokes" src="assets/images/refresh.png" />
            </a>
            <div className="tabs">
               <JokesList
                  list={randomJokes}
                  name={'random'}
                  tabButtonAction={this.loadRandomJokes}
                  icon={<a>Random</a>}
                  title={'Random Jokes'}
                  checked={true}
                  isLoading={isLoadingRandomJokes}
                  noItemsText={'No jokes survived...'}
               />
               <JokesList
                  list={favorites}
                  name={'favorites'}
                  tabButtonAction={this.loadFavoritesJokes}
                  icon={<img alt="Favorites" className="tab-icon" src="assets/images/favorite.png" />}
                  title={'Random Jokes'}
                  checked={false}
                  isLoading={isLoadingFavoritesJokes}
                  noItemsText={'No favorites survived...'}
               />
            </div>
         </div>
      )
   }
}
