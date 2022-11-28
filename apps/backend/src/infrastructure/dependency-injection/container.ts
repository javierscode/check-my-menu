import { Container } from 'inversify'

import { defineRestaurantDependencies } from './restaurant.dependencies'
import { defineUserDependencies } from './user.dependencies'

const myContainer = new Container()

defineUserDependencies(myContainer)
defineRestaurantDependencies(myContainer)

export { myContainer }
