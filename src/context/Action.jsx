export const LoginSuccess = (user) => ({
    type: "LOGIN_SUCCESS",
    payload: user
})
export const LoginFailure = (error) => ({
    type: "LOGIN_FAILURE",
});
export const Logout = (error) => ({
    type: "LOGOUT",
});

