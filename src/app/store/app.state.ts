import { RoutesState, routesReducer } from "../components/search-result/state/routes.reducer"

export interface AppState {
    routes_state: RoutesState,
}

export const appReducer = {
    routes_state: routesReducer,
}