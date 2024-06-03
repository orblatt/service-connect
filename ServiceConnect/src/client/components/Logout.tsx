import { logout } from 'wasp/client/auth'

export const Logout = () => {
    return (
        <button onClick={logout}>
        Logout
        </button>
    )
}