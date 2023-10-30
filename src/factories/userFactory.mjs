import UserService from "../services/userService.mjs";
import UserRepository from "../repositories/userRepository.mjs";

const generateInstance = ({ filePath }) => {
  const userRepository = new UserRepository({ file: filePath });
  const userService = new UserService({ userRepository });

  return userService;
};

export { generateInstance };
