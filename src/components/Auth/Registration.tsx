import React, { useState } from 'react'
import { FormField, Button, Checkbox, Form, FormInput } from 'semantic-ui-react'
import { useAuth } from './AuthProvider'

//loading

const Registration: React.FC = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const { signupHandler } = useAuth()

    const formHandler = (event: React.SyntheticEvent) => {
        event.preventDefault()
        signupHandler(email.trim(), password.trim())
        
    }

    const onMailHandler = (e: React.FormEvent<HTMLInputElement>) => {
        setEmail(e.currentTarget.value)
    }

    const onPassHandler = (e: React.FormEvent<HTMLInputElement>) => {
        setPassword(e.currentTarget.value)
    }
    
    return (
        <Form onSubmit={formHandler}>
            <FormField>
                <label>Email</label>
                <input onChange={onMailHandler} placeholder='Email' />
            </FormField>
            <FormInput label='Пароль' type='password' onChange={onPassHandler} />
            <FormField>
                <Checkbox label='Запомнить' />
            </FormField>
            <Button type='submit' >Регистрация</Button>
        </Form>
    )
}

export default Registration
