import { Resolver, Query, Arg, Mutation, Ctx, Int } from "type-graphql";
import { Repository } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";

import { Post } from "../entity/Post";
import { Rate } from "../entity/Rate";
import { PostInput } from "./types/post-input";
import { RateInput } from "./types/rate-input";
import { Context } from "./types/context";

@Resolver(Post)
export class PostResolver {
  constructor(
    @InjectRepository(Post) private readonly postRepository: Repository<Post>,
    @InjectRepository(Rate) private readonly ratingsRepository: Repository<Rate>,
  ) { }

  @Query(returns => Post, { nullable: true })
  post(@Arg("postId", type => Int) postId: number) {
    return this.postRepository.findOne(postId);
  }

  @Query(returns => [Post])
  posts(): Promise<Post[]> {
    return this.postRepository.find();
  }

  @Mutation(returns => Post)
  addPost(@Arg("post") postInput: PostInput, @Ctx() { user }: Context): Promise<Post> {
    const recipe = this.postRepository.create({
      ...postInput,
      author: user,
    });
    return this.postRepository.save(recipe);
  }

  @Mutation(returns => Post)
  async rate(@Ctx() { user }: Context, @Arg("rate") rateInput: RateInput): Promise<Post> {
    const post = await this.postRepository.findOne(rateInput.recipeId, {
      relations: ["ratings"],
    });
    if (!post) {
      throw new Error("Invalid recipe ID");
    }

    (await post.ratings).push(
      this.ratingsRepository.create({
        post,
        user,
        value: rateInput.value,
      }),
    );

    return await this.postRepository.save(post);
  }
}