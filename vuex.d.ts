import { Store } from "vuex";

declare module '@vue/runtime-core' {
    // Store states
    interface State {
        isLoading: boolean,
        darkTheme: boolean
    }

    // useStore() typings
    interface ComponentCustomProperties {
        $store: Store<State>
    }
}