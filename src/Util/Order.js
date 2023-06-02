// 
// File: Order.js
// Auth: Martin Burolla
// Date: 10/19/2022
// Desc: The one and only place where the customer order is calculated.
//
//       NOTE: This is an academic example and should be treated as such!
//       This logic MUST be stored on the server to prevent the client from
//       altering the cost of the product.
//

import { getPriceForDrink } from './App.Config'
import { getPriceForFood } from './App.Config'
/**
 * @param {*} drinks
 * @param {*} food 
 * @returns An array of objects that the customer has ordered.
 *  [
      { 
        item: 'tea', 
        qty: 1, 
        price: 2, 
        subTotal: 2
      }
    ] 
 */
export const buildOrder = (drinks, food) => {
    let total = 0
    let arrayOfDrinks = Object.keys(drinks)
    let arrayOfFood = Object.keys(food)

    const arrayOfDrinkObjects = arrayOfDrinks.map(i => {
        return {
            item: i,
            qty: drinks[i]
        }
    })
    const arrayOfFoodObjects = arrayOfFood.map(i => {
        return {
            item: i,
            qty: food[i]
        }
    })

    const allItems = arrayOfDrinkObjects.map(i => {
        total += i.qty * getPriceForDrink(i.item)
        return {
            ...i,
            price: getPriceForDrink(i.item),
            subTotal: i.qty * getPriceForDrink(i.item)
        }
    })
    const allFoodItems = arrayOfFoodObjects.map(i => {
        total += i.qty * getPriceForFood(i.item)
        return {
            ...i,
            price: getPriceForFood(i.item),
            subTotal: i.qty * getPriceForFood(i.item)
        }
    })

    const order = allItems.filter(i => i.qty > 0)
    const order1 = allFoodItems.filter(i=> i.qty > 0)

    return {
        order,
        order1,
        total
    }
}

/**
 * @param {*} orders 
 * @returns The total amount of all the orders.
 */
export const calcTotalForAllOrders = (orders) => {
    return (orders) ? orders.map(i => i.total).reduce((a,b)=> a + b, 0) : 0
}

/**
 * @param {} drinks 
 * @param {} food
 * @returns The total number of drinks the customer has ordered.
 */
export const getTotalNumberDrinks = (drinks) => {
    let totalDrinks = 0
    const arrayOfDrinks = Object.keys(drinks)
    arrayOfDrinks.forEach(i => {
        totalDrinks += drinks[i]
    })
    return totalDrinks
}
export const getTotalNumberFood = (food) => {
    let totalFood = 0
    const arrayOfFood = Object.keys(food)
    arrayOfFood.forEach(i => {
        totalFood += food[i]
    })
    return totalFood
}