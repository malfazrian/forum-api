/* istanbul ignore file */
const { createContainer } = require("instances-container");

// external agency
const { nanoid } = require("nanoid");
const bcrypt = require("bcrypt");
const Jwt = require("@hapi/jwt");
const pool = require("./database/postgres/pool");

// service (repository, helper, manager, etc)
const UserRepository = require("../Domains/users/UserRepository");
const ThreadRepository = require("../Domains/threads/ThreadRepository");
const CommentThreadRepository = require("../Domains/commentsThread/CommentThreadRepository");
const PasswordHash = require("../Applications/security/PasswordHash");
const UserRepositoryPostgres = require("./repository/UserRepositoryPostgres");
const ThreadRepositoryPostgres = require("./repository/ThreadRepositoryPostgres");
const CommentThreadRepositoryPostgres = require("./repository/CommentThreadRepositoryPostgres");
const BcryptPasswordHash = require("./security/BcryptPasswordHash");

// use case
const AddUserUseCase = require("../Applications/use_case/AddUserUseCase");
const AuthenticationTokenManager = require("../Applications/security/AuthenticationTokenManager");
const JwtTokenManager = require("./security/JwtTokenManager");
const LoginUserUseCase = require("../Applications/use_case/LoginUserUseCase");
const AuthenticationRepository = require("../Domains/authentications/AuthenticationRepository");
const AuthenticationRepositoryPostgres = require("./repository/AuthenticationRepositoryPostgres");
const LogoutUserUseCase = require("../Applications/use_case/LogoutUserUseCase");
const RefreshAuthenticationUseCase = require("../Applications/use_case/RefreshAuthenticationUseCase");
const AddThreadUseCase = require("../Applications/use_case/AddThreadUseCase");
const GetThreadByIdUseCase = require("../Applications/use_case/GetThreadByIdUseCase");
const AddCommentThreadUseCase = require("../Applications/use_case/AddCommentThreadUseCase");
const GetCommentsByThreadIdUseCase = require("../Applications/use_case/GetCommentsByThreadIdUseCase");
const DeleteCommentThreadUseCase = require("../Applications/use_case/DeleteCommentThreadUseCase");

// creating container
const container = createContainer();

// registering services and repository
container.register([
  {
    key: UserRepository.name,
    Class: UserRepositoryPostgres,
    parameter: {
      dependencies: [
        {
          concrete: pool,
        },
        {
          concrete: nanoid,
        },
      ],
    },
  },
  {
    key: AuthenticationRepository.name,
    Class: AuthenticationRepositoryPostgres,
    parameter: {
      dependencies: [
        {
          concrete: pool,
        },
      ],
    },
  },
  {
    key: CommentThreadRepository.name,
    Class: CommentThreadRepositoryPostgres,
    parameter: {
      dependencies: [
        {
          concrete: pool,
        },
        {
          concrete: nanoid,
        },
      ],
    },
  },
  {
    key: ThreadRepository.name,
    Class: ThreadRepositoryPostgres,
    parameter: {
      dependencies: [
        {
          concrete: pool,
        },
        {
          concrete: nanoid,
        },
      ],
    },
  },
  {
    key: PasswordHash.name,
    Class: BcryptPasswordHash,
    parameter: {
      dependencies: [
        {
          concrete: bcrypt,
        },
      ],
    },
  },
  {
    key: AuthenticationTokenManager.name,
    Class: JwtTokenManager,
    parameter: {
      dependencies: [
        {
          concrete: Jwt.token,
        },
      ],
    },
  },
]);

// registering use cases
container.register([
  {
    key: AddUserUseCase.name,
    Class: AddUserUseCase,
    parameter: {
      injectType: "destructuring",
      dependencies: [
        {
          name: "userRepository",
          internal: UserRepository.name,
        },
        {
          name: "passwordHash",
          internal: PasswordHash.name,
        },
      ],
    },
  },
  {
    key: LoginUserUseCase.name,
    Class: LoginUserUseCase,
    parameter: {
      injectType: "destructuring",
      dependencies: [
        {
          name: "userRepository",
          internal: UserRepository.name,
        },
        {
          name: "authenticationRepository",
          internal: AuthenticationRepository.name,
        },
        {
          name: "authenticationTokenManager",
          internal: AuthenticationTokenManager.name,
        },
        {
          name: "passwordHash",
          internal: PasswordHash.name,
        },
      ],
    },
  },
  {
    key: LogoutUserUseCase.name,
    Class: LogoutUserUseCase,
    parameter: {
      injectType: "destructuring",
      dependencies: [
        {
          name: "authenticationRepository",
          internal: AuthenticationRepository.name,
        },
      ],
    },
  },
  {
    key: RefreshAuthenticationUseCase.name,
    Class: RefreshAuthenticationUseCase,
    parameter: {
      injectType: "destructuring",
      dependencies: [
        {
          name: "authenticationRepository",
          internal: AuthenticationRepository.name,
        },
        {
          name: "authenticationTokenManager",
          internal: AuthenticationTokenManager.name,
        },
      ],
    },
  },
  {
    key: AddThreadUseCase.name,
    Class: AddThreadUseCase,
    parameter: {
      injectType: "destructuring",
      dependencies: [
        {
          name: "threadRepository",
          internal: ThreadRepository.name,
        },
      ],
    },
  },
  {
    key: GetThreadByIdUseCase.name,
    Class: GetThreadByIdUseCase,
    parameter: {
      injectType: "destructuring",
      dependencies: [
        {
          name: "threadRepository",
          internal: ThreadRepository.name,
        },
        {
          name: "commentThreadRepository",
          internal: CommentThreadRepository.name,
        },
      ],
    },
  },
  {
    key: AddCommentThreadUseCase.name,
    Class: AddCommentThreadUseCase,
    parameter: {
      injectType: "destructuring",
      dependencies: [
        {
          name: "commentThreadRepository",
          internal: CommentThreadRepository.name,
        },
        {
          name: "threadRepository",
          internal: ThreadRepository.name,
        },
      ],
    },
  },
  {
    key: GetCommentsByThreadIdUseCase.name,
    Class: GetCommentsByThreadIdUseCase,
    parameter: {
      injectType: "destructuring",
      dependencies: [
        {
          name: "commentThreadRepository",
          internal: CommentThreadRepository.name,
        },
      ],
    },
  },
  {
    key: DeleteCommentThreadUseCase.name,
    Class: DeleteCommentThreadUseCase,
    parameter: {
      injectType: "destructuring",
      dependencies: [
        {
          name: "commentThreadRepository",
          internal: CommentThreadRepository.name,
        },
      ],
    },
  },
]);

module.exports = container;
