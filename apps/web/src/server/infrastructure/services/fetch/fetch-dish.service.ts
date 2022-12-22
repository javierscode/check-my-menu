import { DishService } from '@server/domain/services/dish.service'
import { Dish } from '@shared/domain/entities/dish'
import { BACKEND_URL } from '@shared/infrastructure/constants'
import { Fetcher } from '@shared/infrastructure/fetcher'
import uuid from 'uuid-random'

export class FetchDishService implements DishService {
  async getDishesByCategoryId(categoryId: string): Promise<Dish[]> {
    const { error, data } = await Fetcher.get<Dish[]>(
      BACKEND_URL + `/dish/categoryId/${categoryId}`
    )
    if (error || !data) throw new Error('Error fetching dishes')
    return data
  }

  async getDishesByRestaurantId(restaurantId: string, token: string): Promise<Dish[]> {
    const { error, data } = await Fetcher.get<Dish[]>(
      BACKEND_URL + `/dish/restaurantId/${restaurantId}`,
      {
        authToken: token,
      }
    )
    if (error || !data) throw new Error('Error fetching dishes')
    return data
  }

  async getDishById(dishId: string): Promise<Dish | null> {
    const { error, data } = await Fetcher.get<Dish>(BACKEND_URL + `/dish/${dishId}`)
    if (error || !data) throw new Error('Error fetching dish')
    return data
  }

  async createDish(token: string, dish: Omit<Dish, 'id'>): Promise<Dish> {
    const newDish: Dish = {
      ...dish,
      id: uuid(),
    }
    const { error, data } = await Fetcher.post<void>(BACKEND_URL + `/dish/`, {
      body: newDish,
      authToken: token,
    })
    if (error || !data) throw new Error('Error creating dish')
    return newDish
  }

  async editDish(token: string, dish: Dish): Promise<Dish> {
    const { restaurantId: _, ...rest } = dish
    const { error } = await Fetcher.put<void>(BACKEND_URL + `/dish/`, {
      body: rest,
      authToken: token,
    })
    if (error) throw new Error('Error editing dish')
    return dish
  }

  async deleteDish(token: string, dishId: string): Promise<void> {
    const { error } = await Fetcher.delete<void>(BACKEND_URL + `/dish/${dishId}`, {
      authToken: token,
    })
    if (error) throw new Error('Error deleting dish')
  }
}
