import React from 'react';
import { usePreloadedQuery } from 'react-relay/hooks';
import { AppQuery } from '../__generated__/AppQuery.graphql';
import { query, result } from '../App';
import { Card, Rate, Popover } from 'antd';
import { Link } from 'react-router-dom';
type HomeProps = {};
const Home = (props: HomeProps): JSX.Element => {
  const { posts } = usePreloadedQuery<AppQuery>(query, result);
  return (
    <>
      {posts.map((post) => {
        return (
          <Card title={<Link to={`/post/${post.id}`}>{post.title}</Link>}>
            <p>{post.description}</p>
            <Popover
              placement="bottom"
              content={
                <>
                  {post.ratings.map((rate) => {
                    return (
                      <>
                        <Rate value={rate.value} />
                        <br />
                      </>
                    )
                  })}
                </>
              }>
              <span>Оценки</span>
            </Popover>
          </Card>
        )
      })}
    </>
  )
}

export default Home;
