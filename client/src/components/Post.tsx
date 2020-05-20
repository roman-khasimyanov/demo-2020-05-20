import React from 'react';
import { useRouteMatch, useParams } from 'react-router-dom';
import { graphql } from 'react-relay';
import { useLazyLoadQuery } from 'react-relay/hooks';
import { PostQuery } from './__generated__/PostQuery.graphql';
import { Rate } from 'antd';

type PostProps = {};

const query = graphql`
  query PostQuery($postId: Int!){
    post(postId:$postId){
      id
      title
      description
      ratings{
        value
        date
      }
      author{
        nickname
      }
    }
  }
`;

const Post = (props: PostProps) => {
  const { id } = useParams<{ id: string }>();
  const { post } = useLazyLoadQuery<PostQuery>(
    query,
    { postId: parseInt(id) },
    {
      fetchPolicy: 'store-or-network',
    }
  )
  if (post) {
    return (
      <>
        <h1>
          {post.title}
        </h1>
        <p>{post.description}</p>
        {post.ratings.map((rate) => {
          return (
            <>
              <Rate value={rate.value} />
              <br />
            </>
          )
        })}
      </>
    );
  } else {
    return <></>;
  }
}

export default Post;
