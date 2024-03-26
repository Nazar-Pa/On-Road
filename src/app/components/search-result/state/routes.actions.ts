import { createAction, props } from "@ngrx/store";

export const filterRoutes = createAction(
    'filter routes',
    props<{params: any}>()
)

export const filterRoutesSuccess = createAction(
    'filter routes success',
    props<{filtered_routes: []}>()
)