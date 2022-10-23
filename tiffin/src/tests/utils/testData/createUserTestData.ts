import { hash } from "bcrypt";
import { Connection, ResultSetHeader } from "mysql2/promise";
import { User } from "../../../../src/models/user";
import { createPrefectureTestData } from "./createPrefectureTestData";

export async function createUserHashedPasswordTestData(connection: Connection, num: number): Promise<User[]> {
  const userList: User[] = [];
  const createdPrefectureList = await createPrefectureTestData(connection, num);
  for (let index = 0; index < num; index++) {
    const user: User = {
      name: `name_${index}`,
      email: `email_${index}`,
      password: `password_${index}`,
      master_prefecture_id: createdPrefectureList[index].id!,
    };
    const hashedPassword: string = await hash(user.password, 10);
    const query = `insert into users(name,email,password,master_prefecture_id) values("${user.name}","${user.email}","${hashedPassword}",${user.master_prefecture_id})`;
    const [result] = await connection.query<ResultSetHeader>(query);

    user.id = result.insertId;
    userList.push(user);
  }

  return userList;
}

export async function createUserTestData(connection: Connection, num: number): Promise<User[]> {
  const userList: User[] = [];
  const createdPrefectureList = await createPrefectureTestData(connection, num);

  for (let index = 0; index < num; index++) {
    const user: User = {
      name: `name_${index}`,
      email: `email_${index}`,
      password: `password_${index}`,
      master_prefecture_id: createdPrefectureList[index].id!,
    };
    const query = `insert into users(name,email,password,master_prefecture_id) values("${user.name}","${user.email}","${user.password}",${user.master_prefecture_id})`;
    const [result] = await connection.query<ResultSetHeader>(query);

    user.id = result.insertId;
    userList.push(user);
  }

  return userList;
}
