import { Header } from './Header'
import { Footer } from './Footer'
import { Content } from './Content'
import { orderedDrinks } from './Util/Atoms'
import { orderedFood } from './Util/Atoms'
import { showSideDrawer } from './Util/Atoms'
import Offcanvas from 'react-bootstrap/Offcanvas'
import { SidebarContent } from './SidebarContent'
import React, { useEffect, useState } from 'react'
import { ModalCoffeeShop } from './ModalCoffeeShop'
import { useRecoilState, useResetRecoilState } from 'recoil'
import * as localStorageProxy from './Util/LocalStorageProxy'
import './App.scss'

function App() {
  let [showHome, setShowHome] = useState(true) 
  let [showFood, setShowFood] = useState(false)
  let [showDrink, setShowDrink] = useState(false)
  let [showSales, setShowSales] = useState(false)
  let [showModal, setShowModal] = useState(false)
  let [showDessert, setShowDessert] = useState(false)
  const resetDrinkRecoilState = useResetRecoilState(orderedDrinks)
  const resetFoodRecoilState = useResetRecoilState(orderedFood)
  let [showTheSideDrawer, setShowSideDrawer] = useRecoilState(showSideDrawer)

  useEffect(() => {
    localStorageProxy.initLocalStorageProxy()
  }, [])

  const onHandleNavSelect = (page) => {
    setShowHome(false)
    setShowFood(false)
    setShowDrink(false)
    setShowDessert(false)
    setShowSales(false)
    switch (page) {
      case "Home":
        setShowHome(true)
        break
      case "Food":
        setShowFood(true)
        break
      case "Drink":
        setShowDrink(true)
        break
      case "Dessert":
        setShowDessert(true)
        break
      case "Order History":
        setShowSales(true)
        break
      default:
    }
    setShowSideDrawer(false)
  }

  const onHandleCheckout = (total, completedOrder) => {
    const orders = localStorageProxy.getOrders()
    orders.push({
      id: orders.length + 1,
      items: completedOrder,
      total: total,
      date: new Date().toLocaleDateString()
    })
    localStorageProxy.setOrders(orders)
    resetDrinkRecoilState()
    resetFoodRecoilState()
    setShowModal(true)
  }

  return (
    <div className="App">
        <Header />
        <Offcanvas show={showTheSideDrawer} onHide={() => setShowSideDrawer(false)}>
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>
              <div className='App_Title Product_Font'>The Coffee Place</div>
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <SidebarContent 
              onHandleLink={(page) => onHandleNavSelect(page)}
              onHandleCheckout={(totalPrice, order) => onHandleCheckout(totalPrice, order)}
            />
          </Offcanvas.Body>
        </Offcanvas>
        <Content 
          showHome={showHome} 
          showFood={showFood} 
          showDrink={showDrink}
          showSales={showSales} 
          showDessert={showDessert} 
        />
        <ModalCoffeeShop 
          showModal={showModal} 
          setShowModal={() => setShowModal(false)}
          message={'Thank you for your order!'}  
        />
        <Footer />
    </div>
  )
}

export default App;
