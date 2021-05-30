export const auth = (state, { id, email, login, roleId }) => {
    if (id && email && login) {
        state.user = {}
        state.user.id = id
        state.user.email = email
        state.user.login = login
        state.user.role = roleId
    }
}
export const logout = state => state.user = undefined