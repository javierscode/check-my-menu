/** Symbols for repositories */
const Repositories = {
  UserRepository: Symbol.for('UserRepository'),
  RestaurantRepository: Symbol.for('RestaurantRepository'),
  CategoryRepository: Symbol.for('CategoryRepository'),
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
  CheckRestaurantOwnerUsecase: Symbol.for('CheckRestaurantOwnerUsecase'),

  // Category
  CreateCategoryUsecase: Symbol.for('CreateCategoryUsecase'),
  DeleteCategoryUsecase: Symbol.for('DeleteCategoryUsecase'),
  EditCategoryUsecase: Symbol.for('EditCategoryUsecase'),
  GetCategoriesByRestaurantUsecase: Symbol.for('GetCategoriesByRestaurantUsecase'),
  CheckCategoryOwnerUsecase: Symbol.for('CheckCategoryOwnerUsecase'),
  CheckCategoryOfRestaurantUsecase: Symbol.for('CheckCategoryOfRestaurantUsecase'),
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
  // Category
  CreateCategoryController: Symbol.for('CreateCategoryController'),
  DeleteCategoryController: Symbol.for('DeleteCategoryController'),
  EditCategoryController: Symbol.for('EditCategoryController'),
  GetCategoriesByRestaurantController: Symbol.for('GetCategoriesByRestaurantController'),
}

const ContainerSymbols = {
  ...Repositories,
  ...UseCases,
  ...Controllers,
}

export { ContainerSymbols }
