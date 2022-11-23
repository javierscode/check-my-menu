/** Symbols for repositories */
const Repositories = {
  UserRepository: Symbol.for('UserRepository'),
}

const UseCases = {
  UserLoginUsecase: Symbol.for('UserLoginUsecase'),
  GetUserProfileUsecase: Symbol.for('GetUserProfileUsecase'),
  UserRegisterUsecase: Symbol.for('UserRegisterUsecase'),
}

const Controllers = {
  UserLoginController: Symbol.for('UserLoginController'),
  GetUserProfileController: Symbol.for('GetUserProfileController'),
  UserRegisterController: Symbol.for('UserRegisterController'),
}

const ContainerSymbols = {
  ...Repositories,
  ...UseCases,
  ...Controllers,
}

export { ContainerSymbols }
