import { Container } from 'inversify'

import { defineCategoryDependencies } from './category.dependencies'
import { defineDishDependencies } from './dish.dependencies'
import { defineRestaurantDependencies } from './restaurant.dependencies'
import { defineUserDependencies } from './user.dependencies'

const myContainer = new Container()

defineUserDependencies(myContainer)
defineRestaurantDependencies(myContainer)
defineCategoryDependencies(myContainer)
defineDishDependencies(myContainer)

export { myContainer }
