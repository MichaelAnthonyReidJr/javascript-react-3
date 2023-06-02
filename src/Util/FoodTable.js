import React from 'react'
import { useRecoilState } from 'recoil'
import { capitalize } from '.from ./Util/Strings'
import { orderedFood }  from './Util/Atoms'
import { FoodTableRow } from './FoodTableRow'
import { foodPrices } from './Util/App.Config'
import './FoodTable.scss'

export const FoodTable = () => {
    const [theOrderedFood, setOrderedFood] = useRecoilState(orderedFood)

    const onHandleClick = (item, value) => {
        const food = {...theOrderedFood}
        if (value === -1 && food[item] === 0){
            return;
        }
        food[item] += value
        setOrderedFood(food)
    }
   
    return (
        <div className ='FoodTable'>
            <table className='FoodTable_Table'>
                <tbody>
                    {
                        foodPrices.map(i => {
                            return <FoodTableRow
                                key={ i.id }
                                item = { i.type }
                                displayName={ capitalize(i.type) }
                                theOrderedFood = { theOrderedFood }
                                onHandleClick={ (item, value) => onHandleClick(item, value) }
                            ></FoodTableRow>
                        })
                    }
                </tbody>
            </table>
        </div>
    )


}