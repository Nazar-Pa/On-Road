import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, mergeMap, of } from "rxjs";
import { filterRoutes, filterRoutesSuccess } from "./routes.actions";
import { DatabaseService } from "src/app/services/database.service";

@Injectable()
export class RoutesEffects {

    loadRoutes$ = createEffect(() => {
        return this.actions$.pipe(ofType(filterRoutes),
            mergeMap(action => {

                return this.databaseService.getFilteredRoutes(action.params).pipe(
                    map(routes => {
                        return filterRoutesSuccess({filtered_routes: routes})
                    })
                )
            })
        )
    });

    constructor(private actions$: Actions,
        private databaseService: DatabaseService){}
}