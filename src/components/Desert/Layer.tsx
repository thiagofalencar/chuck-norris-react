import * as React from 'react';
import './layer.css';

const Layer = (props: any) => {
   return (
      <div className="layer">
         { props.children }
      </div>
   );
};
export default Layer;
