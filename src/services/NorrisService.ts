import {IJokeItem} from "../components/JokeList/JokesItem";
import StorageService from "./StorageService";

export default class NorrisService {
   private randomJokes: StorageService;
   private favorites: StorageService;

   constructor() {
      this.randomJokes = new StorageService('randomJokes');
      this.favorites =  new StorageService('favoritesJokes');
   }

   getRandomJokes = (callback: Function, callbackError: Function) => {
      const randomJokes = this.randomJokes.get();
      if (this.randomJokes.isEmpty(randomJokes)) {
         fetch('https://api.icndb.com/jokes/random/10?escape=javascript')
            .then((response) => response.json())
            .then(({type, value}) => {
               this.randomJokes.set(value);
               callback(value);
            })
            .catch((exception) => {
               callbackError(exception.message);
            })
      } else {
         callback(randomJokes);
      }
   };

   getFavoritesJokes = (callback: Function, callbackError: Function) => {
      try {
         const allFavorites = this.favorites.all();
         callback(allFavorites);
      } catch (exception) {
         callbackError(exception.message);
      }
   };

   addToFavorites = (data: IJokeItem): boolean => {
      return (this.isThisAJokeAlreadyInFavorites(data.id))
         ? false
         : this.favorites.add(data, true);
   };

   removeFromFavorites = (data: IJokeItem) => {
      return this.favorites.del(data);
   };

   isThisAJokeAlreadyInFavorites = (id: any):boolean => {
      const obj = this.favorites.one(id);
      return !(Object.keys(obj).length === 0 && obj.constructor === Object);
   };

   resetRandomJokes = () => {
      this.randomJokes.clear();
   };
}
