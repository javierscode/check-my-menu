import { Container } from 'inversify'

import { defineCategoryDependencies } from './category.dependencies'
import { defineRestaurantDependencies } from './restaurant.dependencies'
import { defineUserDependencies } from './user.dependencies'

const myContainer = new Container()

defineUserDependencies(myContainer)
defineRestaurantDependencies(myContainer)
defineCategoryDependencies(myContainer)

export { myContainer }
