import { Allergen } from '@domain/entities/allergen'
import { Category } from '@domain/entities/category'
import { Dish } from '@domain/entities/dish'
import { Restaurant } from '@domain/entities/restaurant'

export const fakeCategories: Category[] = [
  {
    id: '1',
    name: 'Appetizers',
    description: 'The best appetizers in town',
    image: 'https://picsum.photos/600/300',
    restaurantId: '1',
  },
  {
    id: '2',
    name: 'Main Course',
    description: 'The best main course in town',
    image: 'https://picsum.photos/600/300',
    restaurantId: '1',
  },
  {
    id: '3',
    name: 'Desserts',
    description: 'The best desserts in town',
    image: 'https://picsum.photos/600/300',
    restaurantId: '1',
  },
  {
    id: '4',
    name: 'Drinks',
    description: 'The best drinks in town',
    image: 'https://picsum.photos/600/300',
    restaurantId: '1',
  },
]

export const fakeRestaurants: Restaurant[] = [
  {
    id: '1',
    name: 'The best restaurant',
    description: 'The best restaurant in town',
    domain: 'test',
    location: 'Test location',
  },
]

export const fakeDishes: Dish[] = [
  {
    id: '1',
    name: 'Appetizer 1',
    description: 'The best appetizer in town',
    image: 'https://picsum.photos/600/300',
    price: 10,
    allergens: [Allergen.NUTS, Allergen.FISH],
    categoryIds: ['1', '2'],
    restaurantId: '1',
  },
  {
    id: '2',
    name: 'Appetizer 2',
    description: 'The best appetizer in town',
    image: 'https://picsum.photos/600/300',
    price: 10,
    allergens: [Allergen.NUTS, Allergen.FISH],
    categoryIds: ['1', '2'],
    restaurantId: '1',
  },
  {
    id: '3',
    name: 'Appetizer 3',
    description: 'The best appetizer in town',
    image: 'https://picsum.photos/600/300',
    price: 10,
    allergens: [Allergen.NUTS, Allergen.FISH],
    categoryIds: ['1', '2'],
    restaurantId: '1',
  },
  {
    id: '4',
    name: 'Main Course 1',
    description: 'The best main course in town',
    image: 'https://picsum.photos/600/300',
    price: 10,
    allergens: [Allergen.NUTS, Allergen.FISH],
    categoryIds: ['1', '2'],
    restaurantId: '1',
  },
]
