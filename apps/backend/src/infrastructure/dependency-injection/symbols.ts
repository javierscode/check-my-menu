/** Symbols for repositories */
const Repositories = {
  UserRepository: Symbol.for('UserRepository'),
}

const UseCases = {
  UserLoginUsecase: Symbol.for('UserLoginUsecase'),
  UserGetProfileUsecase: Symbol.for('UserGetProfileUsecase'),
  UserRegisterUsecase: Symbol.for('UserRegisterUsecase'),
}

const Controllers = {
  UserLoginController: Symbol.for('UserLoginController'),
  UserGetProfileController: Symbol.for('UserGetProfileController'),
  UserRegisterController: Symbol.for('UserRegisterController'),
}

const ContainerSymbols = {
  ...Repositories,
  ...UseCases,
  ...Controllers,
}

export { ContainerSymbols }
