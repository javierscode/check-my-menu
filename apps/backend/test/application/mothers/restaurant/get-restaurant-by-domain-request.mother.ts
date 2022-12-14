import { GetRestaurantByDomainRequest } from '@application/use-cases/restaurant/get-restaurant-by-domain.usecase'
import { SlugVO } from '@domain/value-objects/slug.vo'
import { MotherCreator } from '@test/domain/mothers/creator.mother'
import { SlugVOMother } from '@test/domain/mothers/slug.vo.mother'

export class GetRestaurantByDomainRequestMother {
  static create(domain: SlugVO): GetRestaurantByDomainRequest {
    return {
      domain: domain.value,
    }
  }

  static random(): GetRestaurantByDomainRequest {
    return this.create(SlugVOMother.random())
  }

  static invalidRequest(): GetRestaurantByDomainRequest {
    return {
      domain: MotherCreator.random().lorem.words(),
    }
  }
}
