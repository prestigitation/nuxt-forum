export const auth = (state, { id, email, login }) => {
    if (id && email && login) {
        state.user = {}
        state.user.id = id
        state.user.email = email
        state.user.login = login
    }
}
export const logout = state => state.user = undefined
