import {IJokeItem} from "../components/JokeList/JokesItem";
import {array} from "prop-types";

export default class StorageService {
   private readonly key: string;

   constructor(key: string) {
      this.key = key;
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
