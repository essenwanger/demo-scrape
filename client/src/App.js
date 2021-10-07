import {useState} from 'react'
import axios from 'axios'

function App() {

  const [state, setState] = useState({})

  const onScrape = () => {
    setState({message: 'Hola mundo'})
    axios.get('/wong-test')
    .then(function (response) {
      const {data} = response
      setState(data)
    })
    .catch(function (error) {
      console.log(error)
    })
  }

  const businessList = Object.keys(state).map((key)=>{
    const business = state[key]
    if(key === 'tottus'){
      return(
        <p key={key}>{business.name} {business.subtitle}<br/> {business.price}</p>
      )
    } else {
      return(
        <p key={key}>{business.name}<br/> {business.price}</p>
      )
    }
  })

  return (
    <div>
      <button onClick={onScrape}>Escrapear Web</button>
      {businessList}
    </div>
  )
}

export default App;
