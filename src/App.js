import React from 'react';
import Navbar from './components/navbar.js';
import Map from './components/map.js';
import LayerSelector from './components/layerSelector.js';
import { useState } from 'react';
import './localization/i18n.js'

import './App.css';

function App() {
  const [bgMap, setBgMap] = useState('MapAnt');
  const [overlayVisibility, setOverlayVisibility] = useState({});

  return (
    <div className="App">
      <Navbar/>
      <Map bgMap={bgMap} overlayVisibility={overlayVisibility}/>
      <LayerSelector bgState={{bgMap, setBgMap}} overlayVisibilityState={{overlayVisibility, setOverlayVisibility}}/>
    </div>
  );
}

export default App;