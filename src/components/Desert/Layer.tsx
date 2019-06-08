import * as React from 'react';
import './layer.css';

interface ILayer {
   children: any
}

export function Layer(props: ILayer) {
   return (
      <div className="layer">
         { props.children }
      </div>
   );
}
export default Layer;
