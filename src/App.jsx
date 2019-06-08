import * as React from 'react';
import Desert from './components/Desert/Desert'
import { TopTitle } from './components/TopTitle'
import { NorrisJokes } from './components/NorrisJokes'
import './App.css';

function App () {
    return (
        <div>
            <main>
                <TopTitle title={'CHUCK NORRIS'} subtitle={'Jokes'}/>
                <NorrisJokes />
            </main>
            <Desert />
        </div>
    );
}

export default App;
