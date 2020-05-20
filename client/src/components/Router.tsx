import React, { Suspense } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Spin } from 'antd';

const Home = React.lazy(() => import('./Home'));
const Post = React.lazy(() => import('./Post'));

type RouterProps = {};
export default (props: RouterProps): JSX.Element => {
  return (
    <BrowserRouter>
      <Suspense fallback={<Spin />}>
        <Route path="/" exact component={Home} />
        <Route path="/post/:id" exact component={Post} />
      </Suspense>
    </BrowserRouter>
  )
}