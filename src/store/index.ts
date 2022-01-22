import { InjectionKey } from 'vue';
import { createStore, useStore as baseUseStore, Store } from 'vuex';

export interface State {
    isLoading: boolean,
    darkTheme: boolean
}

// Injection key definition
export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
    state () {
        return {
            isLoading: false,
            darkTheme: localStorage.getItem('darkTheme') === 'true'
        }
    },
    mutations: {
        TOGGLE_DARK_THEME (state) {
            if (state.darkTheme) {
                localStorage.setItem('darkTheme', 'false');
            } else {
                localStorage.setItem('darkTheme', 'true');
            }
            state.darkTheme = !state.darkTheme;
        },
        TOGGLE_IS_LOADING (state) {
            state.isLoading = !state.isLoading;
        }
    },
    getters: {
        dark: state => state.darkTheme ? "dark" : ""
    }
})

// useStore() composition function to simplify useStore() usage in components
export function useStore() {
    return baseUseStore(key)
}