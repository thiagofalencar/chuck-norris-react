import * as React from 'react';
import Sun from "./Sun";
import Layer from "./Layer";
import {IMountain, Mountain} from "./Mountain";
import {Cactus, ICactus} from "./Cactus";
import {Earth} from "./Earth";
import './desert.css';
import Sign from "./Sign";
import Refill from "./Refill";

const Desert = () => {
   const mountains = (): Array<any> => {
      const layers = [
         {
            width: '300px',
            height: '300px',
            background: 'linear-gradient(to bottom left,#FDDABF,#fbac86)',
            mountains: [
               { bottom: '40px', left: '10%' },
               { bottom: '60px', left: '50%' },
               { bottom: '40px', left: '80%' },
            ]
         },
         {
            width: '200px',
            height: '200px',
            background: '#FCB895',
            mountains: [
               { bottom: '40px', left: '15%' },
               { bottom: '60px', left: '40%' },
               { bottom: '40px', left: '60%' },
               { bottom: '80px', left: '80%' },
            ]
         },
      ];
      return (
         layers.map((layer, indexLayer: number) => {
            const { height, width, background, mountains} = layer;
            return (
               <Layer key={indexLayer} >
                  {
                     mountains.map((mountain: IMountain, indexMountain: number) => {
                        const propsMountain = {
                           background: background,
                           height: height,
                           width: width,
                           ...mountain
                        };
                        return (<Mountain key={indexMountain} {...propsMountain} />)
                     })
                  }
               </Layer>
            )
         })
      )
   };
   const cactus = () => {
      const params:Array<ICactus> = [
         { left: '10%', height: '25px' , model: 'a'},
         { left: '50%', height: '30px' , model: 'b'},
         { left: '94%', height: '25px' , model: 'c'},
      ];

      return (
         params.map((param: ICactus, i) => {
           return(<Cactus key={i} {...param} />)
         })
      );
   };

   return (
      <div className="desert">
         <Sun />
         { mountains() }
         <Layer >{cactus()}</Layer>
         <Refill />
         <Earth />
         <Sign />
      </div>
   );
};

export default Desert;
