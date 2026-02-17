import {defineStore} from "pinia";
import {ref} from "vue";
import {IUser} from "@/typeModules/IUser";
import {UserLogin} from "@/typeModules/useModules";
// import axiosInstance from "@/axios";

interface UserState {
    user: IUser | null;
    token: string | null;
    roles: string[];
}

interface TokenResponse {
    accessToken: string;
}

export const authService = defineStore("authService", () => {

    // user -> typed data -> click confirm -> checking: validation: ok ? register ! error -> request to /api/register -> return {access_token, refresh_token}
    // -> save to localStorage -> login function (access_token) -> ok -> "/dashboard" navigate

    const state = ref<UserState>({
        user: null,
        token: localStorage.getItem('accessToken'),
        roles: [],
    })

    const setUser = (user: IUser) => {
        state.value.user = user;
        if (user.roles) {
            state.value.roles = Array.isArray(user.roles)
                ? user.roles.map(role => typeof role === 'string' ? role : role.name)
                : [user.roles];
        } else {
            state.value.roles = [];
        }
    };

    const setToken = (token: TokenResponse) => {
        localStorage.setItem('accessToken', token.accessToken);
    };

    const clearUser = () => {
        state.value.user = null;
        state.value.token = null;
        state.value.roles = [];
    };

    const register = async (user: UserLogin): Promise<void> => {
        try {
            // const token = localStorage.getItem("accessToken");
            // await axiosInstance.post(`/api/auth/register`, user,
            //     {headers: {Authorization: `Bearer ${token}`}}
            //     );
            // await login(user)
        } catch (error) {
            console.error(error);
        }
    };

    const login = async (user: UserLogin) => {
        try {
            // const {data} = await axiosInstance.post("/api/auth/login", user);
            // setToken(data.token);
            // setUser(data.user);
            // await router.push("/category");
        } catch (error) {
            console.error(error);
        }
    };

    const getCurrentUser = async () => {
        if (!state.value.token) return null;

        try {
            // const {data} = await axiosInstance.get("/api/auth/me");
            // setUser(data);
            // return data;
        } catch (error) {
            console.error("Error fetching current user:", error);
            clearUser();
            return null;
        }
    }

    return {
        state,
        setUser,
        setToken,
        clearUser,
        register,
        login,
        getCurrentUser,
    };

})