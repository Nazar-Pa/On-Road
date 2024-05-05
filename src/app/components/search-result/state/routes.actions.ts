import { createAction, props } from "@ngrx/store";

export const filterRoutes = createAction(
    'filter routes',
    props<{params: any}>()
)

export const filterRoutesSuccess = createAction(
    'filter routes success',
    props<{filtered_routes: []}>()
)

export const addRoute = createAction(
    'add route',
    props<{route: any}>()
)

export const addRouteSuccess = createAction(
    'add route success',
    props<{route: any}>()
)