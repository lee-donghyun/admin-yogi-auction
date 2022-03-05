import { users } from "../../data/users";

const user = (id: string, password: string) => {
  const res = users.find((user) => user.id == id && user.password == password);
  return res;
};

export default { user };
