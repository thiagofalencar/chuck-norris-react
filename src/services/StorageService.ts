import {IJokeItem} from "../components/JokeList/JokesItem";
import {array} from "prop-types";

export default class StorageService {
   private key: string;
   private values: IJokeItem[];

   constructor(key: string) {
      this.key = key;
      this.values = [
            {
               id: 357,
               joke: 'The word \'Kill\' was invented by Chuck Norris. Other words were \'Die\', \'Beer\', and \'What\'.',
               categories: []
            },
            {
               id: 380,
               joke: 'Chuck Norris does not follow fashion trends, they follow him. But then he turns around and kicks their ass. Nobody follows Chuck Norris.',
               categories: []
            },
            {
               id: 253,
               joke: 'Coroners refer to dead people as "ABC\'s". Already Been Chucked.',
               categories: []
            },
            {
               id: 245,
               joke: 'The original title for Alien vs. Predator was Alien and Predator vs Chuck Norris. The film was cancelled shortly after going into preproduction. No one would pay nine dollars to see a movie fourteen seconds long.',
               categories: []
            },
            {
               id: 70,
               joke: 'Chuck Norris\' house has no doors, only walls that he walks through.',
               categories: []
            },
            {
               id: 50,
               joke: 'Chuck Norris invented Kentucky Fried Chicken\'s famous secret recipe with eleven herbs and spices. Nobody ever mentions the twelfth ingredient: Fear.',
               categories: []
            },
            {
               id: 514,
               joke: 'Chuck Norris doesn\'t use a computer because a computer does everything slower than Chuck Norris.',
               categories: []
            },
            {
               id: 502,
               joke: 'Chuck Norris insists on strongly-typed programming languages.',
               categories: [
                  'nerdy'
               ]
            },
            {
               id: 399,
               joke: 'In the movie "The Matrix", Chuck Norris is the Matrix. If you pay close attention in the green "falling code" scenes, you can make out the faint texture of his beard.',
               categories: []
            },
            {
               id: 195,
               joke: 'Chuck Norris wears a live rattlesnake as a condom.',
               categories: []
            }
         ];
   };

   isEmpty = (obj: any) => {
      if (Array.isArray(obj) && obj.length === 0) return true;
      return (Object.entries(obj).length === 0 && obj.constructor === Object);
   };

   get = (): IJokeItem[] => {
      const data = localStorage.getItem(this.key);
      return (data === null) ? [] : JSON.parse(data);
   };

   set = (data: IJokeItem[]) => {
      localStorage.setItem(this.key, JSON.stringify(data))
   };

   all = (): IJokeItem[] => {
      return this.get();
   };

   one = (filterValue: number): IJokeItem | Object => {
      return this.all().filter(({id}) => id === filterValue).shift() || {}
   };

   add = (data: IJokeItem, single = true): boolean => {
      const items = this.all();
      const one = this.one(data.id);
      if (items.length > 0 && single && !this.isEmpty(one)) {
         // todo: create exception class
         // throw new SingleElementException('Object already added to storage');
         return false;
      } else {
         items.push(data);
         this.set(items);
         return true;
      }
   };

   clear = () => localStorage.removeItem(this.key);

   del = ({id}: IJokeItem): void => {
      const items = this.all();
      const item = this.one(id);

      if (items.length > 0 && !this.isEmpty(item)) {
         this.set(items.filter((value) => value.id !== id));
      }
   };

}
