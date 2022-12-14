/** Symbols for repositories */
const Repositories = {
  UserRepository: Symbol.for('UserRepository'),
  RestaurantRepository: Symbol.for('RestaurantRepository'),
  CategoryRepository: Symbol.for('CategoryRepository'),
  DishRepository: Symbol.for('DishRepository'),
}

const UseCases = {
  // User
  UserLoginUsecase: Symbol.for('UserLoginUsecase'),
  GetUserProfileUsecase: Symbol.for('GetUserProfileUsecase'),
  UserRegisterUsecase: Symbol.for('UserRegisterUsecase'),
  CheckUserExistenceUsecase: Symbol.for('CheckUserExistenceUsecase'),

  // Restaurant
  CreateRestaurantUsecase: Symbol.for('CreateRestaurantUsecase'),
  DeleteRestaurantUsecase: Symbol.for('DeleteRestaurantUsecase'),
  EditRestaurantUsecase: Symbol.for('EditRestaurantUsecase'),
  GetRestaurantsByOwnerUsecase: Symbol.for('GetRestaurantsByOwnerUsecase'),
  GetRestaurantByDomainUsecase: Symbol.for('GetRestaurantByDomainUsecase'),
  CheckRestaurantOwnerUsecase: Symbol.for('CheckRestaurantOwnerUsecase'),

  // Category
  CreateCategoryUsecase: Symbol.for('CreateCategoryUsecase'),
  DeleteCategoryUsecase: Symbol.for('DeleteCategoryUsecase'),
  EditCategoryUsecase: Symbol.for('EditCategoryUsecase'),
  GetCategoriesByRestaurantUsecase: Symbol.for('GetCategoriesByRestaurantUsecase'),
  CheckCategoryOwnerUsecase: Symbol.for('CheckCategoryOwnerUsecase'),
  CheckCategoryOfRestaurantUsecase: Symbol.for('CheckCategoryOfRestaurantUsecase'),

  // Dish
  CreateDishUsecase: Symbol.for('CreateDishUsecase'),
  DeleteDishUsecase: Symbol.for('DeleteDishUsecase'),
  EditDishUsecase: Symbol.for('EditDishUsecase'),
  GetDishesByCategoryUsecase: Symbol.for('GetDishesByCategoryUsecase'),
  GetDishesByRestaurantUsecase: Symbol.for('GetDishesByRestaurantUsecase'),
  CheckDishOwnerUsecase: Symbol.for('CheckDishOwnerUsecase'),
}

const Controllers = {
  // User
  UserLoginController: Symbol.for('UserLoginController'),
  GetUserProfileController: Symbol.for('GetUserProfileController'),
  UserRegisterController: Symbol.for('UserRegisterController'),

  // Restaurant
  CreateRestaurantController: Symbol.for('CreateRestaurantController'),
  DeleteRestaurantController: Symbol.for('DeleteRestaurantController'),
  EditRestaurantController: Symbol.for('EditRestaurantController'),
  GetRestaurantsByOwnerController: Symbol.for('GetRestaurantsByOwnerController'),
  GetRestaurantByDomainController: Symbol.for('GetRestaurantByDomainController'),

  // Category
  CreateCategoryController: Symbol.for('CreateCategoryController'),
  DeleteCategoryController: Symbol.for('DeleteCategoryController'),
  EditCategoryController: Symbol.for('EditCategoryController'),
  GetCategoriesByRestaurantController: Symbol.for('GetCategoriesByRestaurantController'),

  // Dish
  CreateDishController: Symbol.for('CreateDishController'),
  DeleteDishController: Symbol.for('DeleteDishController'),
  EditDishController: Symbol.for('EditDishController'),
  GetDishesByCategoryController: Symbol.for('GetDishesByCategoryController'),
  GetDishesByRestaurantController: Symbol.for('GetDishesByRestaurantController'),
}

const ContainerSymbols = {
  ...Repositories,
  ...UseCases,
  ...Controllers,
}

export { ContainerSymbols }
