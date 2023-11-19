import { User } from "./users.model";

export const isUserFound = async (id: string): Promise<boolean> => {
  const user = await User.findById(id);
  return !!user;
};
