/** Symbols for repositories */
const Repositories = {
  UserRepository: Symbol.for('UserRepository'),
  RestaurantRepository: Symbol.for('RestaurantRepository'),
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
}

const ContainerSymbols = {
  ...Repositories,
  ...UseCases,
  ...Controllers,
}

export { ContainerSymbols }
