import React from 'react'
import RecentPosts from '../../RecentPosts'
import classes from './HomePage.module.css';

const HomePage: React.FC = () => {
  return (
    <div className={classes.container}>
        {/* <CoverSection />
        <LastsPosts /> */}
        <RecentPosts />
    </div>
  )
}

export default HomePage
