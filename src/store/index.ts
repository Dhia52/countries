import { InjectionKey } from 'vue'
import { createStore, useStore as baseUseStore, Store } from 'vuex'

// Store state typings
export interface State {
    isLoading: boolean
}

// Injection key definition
export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
    state () {
        return {
            isLoading: false
        }
    },
    mutations: {
        TOGGLE_IS_LOADING (state) {
            state.isLoading = !state.isLoading
        }
    }
})

// useStore() composition function to simplify useStore() usage in components
export function useStore() {
    return baseUseStore(key)
}