import { useContext, createContext, useEffect, useState } from "react";
import { signin, signup } from "../../store/actions/authActions";
import { AppStateType } from "../../store/reducer/rootReducer";
import { connect, ConnectedProps } from "react-redux";
import { SignUpInterface } from "../../DAL/auth-api";
import { Container, Loader, Message } from "semantic-ui-react";
import { useLocation, useNavigate } from "react-router-dom";
import classes from './Registration.module.css'
import { isActiveSession } from "../../helpers/localStorageHelpers";

interface AuthContextInterface {
    signupHandler: (email: string, password: string) => void
    signinHandler: (email: string, password: string) => void
}
export const AuthContext = createContext<AuthContextInterface>({} as AuthContextInterface);

const AuthProvider = ({ children, signin, signup, isLoading, isAuth }: React.PropsWithChildren<ConnectorPropsType>) => {

    const [isRegSuccess, setIsRegSuccess] = useState(false)

    const navigate = useNavigate()
    const location = useLocation();

    const signupHandler = async (email: string, password: string) => {
        const response = await signup({ email, password })
        if (response.status === 'OK') {
            navigate('/auth')
            setIsRegSuccess(true)
        }
        console.dir(response)
    }

    const signinHandler = async (email: string, password: string) => {
        const response = await signin({ email, password })
        if (response.status === 'OK') {
            navigate('/')
            // setIsRegSuccess(true)
        }
        console.dir(response)
    }

    useEffect(() => {
        console.log('isLoading: ' + isLoading)
    }, [isLoading])

    useEffect(() => {
        console.log(isAuth)
        if (isAuth || isActiveSession()) {
            navigate('/')
        }
        console.dir(location)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <AuthContext.Provider value={{ signinHandler, signupHandler }}>
            {isLoading 
            ? <Loader active size='medium' inline='centered' />
            : <Container className={(location.pathname !== '/auth' && location.pathname !== '/registration') ? null : classes.authContainer}>
                {children}
              </Container>}
            {isRegSuccess && 
            <Message
                success
                header='Регистрация прошла успешно'
                content='Вы можете войти в ваш личный аккаунт'
                size='small'
            />}
        </AuthContext.Provider>
    );
};

const mapDispatchToProps = {
    signin: (payload: SignUpInterface) => signin(payload),
    signup: (payload: SignUpInterface) => signup(payload)
}

const mapStateToProps = (state: AppStateType) => {
    return {
        isLoading: state.authReducer.isLoading,
        isAuth: state.authReducer.isAuthorized
    }
}

const connector = connect(mapStateToProps, mapDispatchToProps)

type ConnectorPropsType = ConnectedProps<typeof connector>

export default connector(AuthProvider)

export const useAuth = () => useContext(AuthContext);
