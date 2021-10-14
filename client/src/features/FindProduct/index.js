import {useState} from 'react'
import axios from 'axios'
import { Container, Button, Row, Col, Form, Image } from 'react-bootstrap'
import wong from '../../assets/Logo_Wong_Cencosud.png'
import plazaVea from '../../assets/LogoPlazaVea.svg'
import tottus from '../../assets/tottus.svg'
import vivanda from '../../assets/logo-vivanda-color___4a131c070c81f2e181be2cc9e3e9cad3.svg'
import metro from '../../assets/Logo_Metro_Cencosud.png'

function FindProduct() {

  const [state, setState] = useState({})
  const [select, setSelect] = useState()

  const onScrape = () => {
    if(select === 'arroz'){
      axios.get('/arroz')
      .then(function (response) {
        const {data} = response
        state['arroz'] = {
          name: 'Arroz Extra COSTEÑO Bolsa 750g',
          product: data
        }
        setState({...state})
      })
      .catch(function (error) {
        console.log(error)
      })
    }
    if(select === 'pilsen'){
      axios.get('/pilsen')
      .then(function (response) {
        const {data} = response
        state['pilsen'] = {
          name: 'Cerveza PILSEN 12Pack Lata 355ml',
          product: data
        }
        setState({...state})
      })
      .catch(function (error) {
        console.log(error)
      })
    }
  }

  const businessList = Object.keys(state).map((key)=>{
    const business = state[key]
    const {name, product} = business
    return(
      <ProductoPrice key={key} name={name} product={product} />
    )
  })

  const onChange = (event) => {
    setSelect(event.target.value)
  }

  return (
    <Container style={{marginTop: 50}}>
      
      <Row className="justify-content-md-center" style={{marginBottom: 20}}>
        <Col md="5">
          <Form.Select onChange={onChange} value={select}>
            <option>Seleccionar</option>
            <option value="arroz">Arroz Extra COSTEÑO Bolsa 750g</option>
            <option value="pilsen">Cerveza PILSEN 12Pack Lata 355ml</option>
          </Form.Select>
        </Col>
        <Col md="1">
          <Button onClick={onScrape} variant={'dark'} >Buscar</Button>
        </Col>
      </Row>
      <Row style={{marginBottom: 20}}>
        <Col md="2">
        </Col>
        <Col md="2" style={{textAlign:'center', paddingLeft: '50px', paddingRight: '50px'}}>
          <Image src={wong} thumbnail />
        </Col>
        <Col md="2" style={{textAlign:'center', paddingTop: '30px'}}>
          <Image src={plazaVea} thumbnail style={{backgroundColor: '#cc292e'}} />
        </Col>
        <Col md="2" style={{textAlign:'center', paddingTop: '30px'}}>
          <Image src={tottus} thumbnail />
        </Col>
        <Col md="2" style={{textAlign:'center', paddingLeft: '50px', paddingRight: '50px'}}>
          <Image src={metro} thumbnail />
        </Col>
        <Col md="2" style={{textAlign:'center', paddingTop: '30px'}}>
          <Image src={vivanda} thumbnail />
        </Col>
      </Row>
      {businessList}
    </Container>
  )
}

const ProductoPrice = ({name, product}) => {

  const {wong, tottus, plazaVea, metro, vivanda} = product

  return(
    <Row>
      <Col md="2" style={{borderRight: '1px solid #333'}}>
        {name}
      </Col>
      <Col md="2" style={{borderRight: '1px solid #333', textAlign:'center'}}>
        {wong}
      </Col>
      <Col md="2" style={{borderRight: '1px solid #333', textAlign:'center'}}>
        {plazaVea}
      </Col>
      <Col md="2" style={{borderRight: '1px solid #333', textAlign:'center'}}>
        {tottus}
      </Col>
      <Col md="2" style={{borderRight: '1px solid #333', textAlign:'center'}}>
        {metro}
      </Col>
      <Col md="2" style={{borderRight: '1px solid #333', textAlign:'center'}}>
        {vivanda}
      </Col>
    </Row>
  )
}

export default FindProduct
