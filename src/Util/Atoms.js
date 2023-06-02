//
// File: Atoms.js
// Auth: Martin Burolla
// Date: 10/14/2022
// Desc: Contains all global state for the application.
//

import { atom } from 'recoil'

//
// Component access: 
//   Read/Write:
//     App
//     DrinkTable
//   Read:
//     Header
//     SideBarContent
// Desc:
//   Stores the drinks that the customer has ordered.
//
export const orderedDrinks = atom({
    key: 'orderedDrinks',
    default: {
        tea: 0,
        coffee: 0,
        lemonade: 0,
        milk: 0
    }
})
export const orderedFood = atom({
    key: 'orderedFood',
    default: {
        pastry: 0,
        croissant: 0,
        Bagel: 0,
        Parfait: 0
    }    
})

//
// Component access: 
//   Read/Write:
//     App
//   Write:
//     Header
// Desc:
//  Shows and hides the offcanvas sidedrawer.
//
export const showSideDrawer = atom({
    key: 'showSideDrawer',
    default: false
})
