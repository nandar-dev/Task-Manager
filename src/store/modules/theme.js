export default {
    state: {
        theme: localStorage.getItem('theme') || 'light'
    },

    gettters: {
        getTheme: (state) => state.theme
    },

    mutations:{
        SET_THEME(state,theme){
            state.theme = theme
        }
    },

    actions:{
        setTheme({commit},data){
            commit("SET_THEME", data)
        }
    }

}