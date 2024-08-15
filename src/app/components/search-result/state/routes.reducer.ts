import { createReducer, on } from "@ngrx/store"
import { addRouteSuccess, filterRoutesSuccess } from "./routes.actions"
import { Trip } from "src/shared/interfaces"

export interface RoutesState {
    routes: Trip[]
}

const initialState: RoutesState = {
    routes: []
}

export const routesReducer = createReducer(
    initialState,

    on(filterRoutesSuccess, (state, action) => {
        return {
            ...state,
            routes: action.filtered_routes
        }
    }),

    on(addRouteSuccess, (state, action) => {
        return {
            ...state,
            routes: [...state.routes, action.route]
        }
    })
)