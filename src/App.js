import React, { useEffect, useState } from 'react';
import Body from './components/Body';
import Header from './components/Header';
import { v4 as uuidv4 } from 'uuid';
function App() {
  const [params, setParams] = useState([
    { id: uuidv4(), key: '', value: '', description: '' },
  ]);
  useEffect(() => {}, [params]);
  return (
    <>
      <Header params={params} setParams={setParams} />
      <Body params={params} setParams={setParams} />
      <button onClick={() => console.log(params)}>click</button>
    </>
  );
}

export default App;
