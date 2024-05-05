import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, mergeMap, of } from "rxjs";
import { addRoute, addRouteSuccess, filterRoutes, filterRoutesSuccess } from "./routes.actions";
import { DatabaseService } from "src/app/services/database.service";
import { Trip } from "src/shared/interfaces";
import { AuthenticationService } from "src/app/services/authentication.service";
import { Router } from "@angular/router";

@Injectable()
export class RoutesEffects {

    loadRoutes$ = createEffect(() => {
        return this.actions$.pipe(ofType(filterRoutes),
            mergeMap((action: any) => {
                return this.databaseService.getFilteredRoutes(action.params).pipe(
                    map(routes => {
                        return filterRoutesSuccess({filtered_routes: routes})
                    })
                )
            })
        )
    });

    addRoute$ = createEffect(() => {
        return this.actions$.pipe(ofType(addRoute),
            mergeMap(action => {
                return this.databaseService.createRoute(action.route).pipe(
                    map(route => {
                        console.log('route', route)
                        this.router.navigate(['/trip'],
                        { queryParams: {route_id: route.route_id} })
                        this.authService.newRoute$ = true;
                        return addRouteSuccess({route})
                    })
                )
            })
        )
    })

    constructor(private actions$: Actions,
        private databaseService: DatabaseService,
        private authService: AuthenticationService,
        private router: Router){}
}