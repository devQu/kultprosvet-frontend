/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-refresh/only-export-components  */
import { ComponentType, useEffect } from 'react'
import Header from './Header'
import Footer from './Footer'
import { useRoutes } from '../../hooks/useRoutes'
import { connect, Matching } from 'react-redux'
import { AppStateType } from '../../store/reducer/rootReducer'
import { isActiveSession } from '../../helpers/localStorageHelpers'

type PropTypes = {
  userEmail: string | undefined,
  isAuth: boolean
}

const Layout: ComponentType<Matching<{ userId: string; userEmail: string; isAuth: boolean; }, PropTypes>> = ({ userEmail, isAuth }) => {

  useEffect(() => {
    console.log("############ Layout ############ userEmail : " + userEmail)
  }, [])

  return (
    <>
      <Header isAuth={isAuth} userEmail={userEmail} />
      {useRoutes(isActiveSession())}
      <Footer />
    </>
  )
}

const mapStateToProps = (state: AppStateType) => {
  return {
    userEmail: state.authReducer.userEmail,
    isAuth: state.authReducer.isAuthorized
  }
}

export default connect(mapStateToProps)(Layout)
