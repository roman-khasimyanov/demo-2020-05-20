import { getRepository } from "typeorm";
import { Post } from "./entity/Post";
import { Rate } from "./entity/Rate";
import { User } from "./entity/User";

export default async () => {
  const postRepository = getRepository(Post);
  const ratingsRepository = getRepository(Rate);
  const userRepository = getRepository(User);

  const defaultUser = userRepository.create({
    email: "test@test.com",
    nickname: "SimpleUser",
    password: "simplePass",
  });
  await userRepository.save(defaultUser);

  const [post1, post2] = postRepository.create([
    {
      title: `Post 1`,
      description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
      Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
      when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
      It has survived not only five centuries, but also the leap into electronic typesetting, 
      remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset 
      sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like 
      Aldus PageMaker including versions of Lorem Ipsum.`,
      author: defaultUser,
    },
    {
      title: "Post 2",
      description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
      Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
      when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
      It has survived not only five centuries, but also the leap into electronic typesetting, 
      remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset 
      sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like 
      Aldus PageMaker including versions of Lorem Ipsum.`,
      author: defaultUser,
    },
  ]);
  await postRepository.save([post1, post2]);

  const ratings = ratingsRepository.create([
    { value: 2, user: defaultUser, post: post1 },
    { value: 4, user: defaultUser, post: post1 },
    { value: 5, user: defaultUser, post: post1 },
    { value: 3, user: defaultUser, post: post1 },
    { value: 4, user: defaultUser, post: post1 },

    { value: 2, user: defaultUser, post: post2 },
    { value: 4, user: defaultUser, post: post2 },
  ]);
  await ratingsRepository.save(ratings);

  return {
    defaultUser,
  };
}