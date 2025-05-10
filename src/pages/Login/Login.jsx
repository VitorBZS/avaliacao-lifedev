import styles from './Login.module.css'
import { useEffect, useState } from 'react'
import { useAuthentication } from '../../hooks/useAuthentication'
import { loginWithGoogle } from '../../firebase/auth';

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    const { login, error: authError, loading } = useAuthentication()

    const handlerSubmit = async (e) => {
        e.preventDefault()

        setError("")
        const user = {
            email,
            password,
        }

        const res = await login(user)
        console.log(res)
    }

    const handleGoogleLogin = async () => {
        try {
            setError("")
            const user = await loginWithGoogle()
            console.log("Usuário logado com Google:", user)
        } catch (err) {
            setError("Erro ao fazer login com Google")
            console.error(err)
        }
    }

    useEffect(() => {
        console.log(authError)
        if (authError) {
            setError(authError)
        }
    }, [authError])

    return (
        <div className={styles.login}>
            <h1>Entrar</h1>
            <p>Faça login em nossa plataforma de desenvolvedores</p>
            <form onSubmit={handlerSubmit}>
                <label>
                    <span>E-mail: </span>
                    <input
                        type='email'
                        name='email'
                        required
                        placeholder='E-mail do usuário'
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                    />
                </label>
                <label>
                    <span>Senha: </span>
                    <input
                        type='password'
                        name='password'
                        required
                        placeholder='Insira sua senha'
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                    />
                </label>
                {!loading && <button className='btn'>Entrar</button>}
                {loading && <button className='btn' disabled>Aguarde... </button>}
                {error && <p>{error}</p>}
            </form>
            <div className={styles.divider}>
                <span>ou</span>
            </div>

            <div className={styles.socialLogin}>
                <button 
                    onClick={handleGoogleLogin}
                    className={styles.googleBtn}
                    disabled={loading}
                >
                    <span className={styles.googleIconWrapper}>
                        <img src="https://www.google.com/favicon.ico" alt="Google" className={styles.googleIcon} width="18" height="18" />
                    </span>
                    <span className={styles.googleBtnText}>Entrar com Google</span>
                </button>
            </div>
        </div>
    )
}

export default Login 