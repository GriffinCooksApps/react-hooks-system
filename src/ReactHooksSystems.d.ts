import {HookSystemStatus} from
import * as React from "react";
import {iReducer} from "./ReducerFactory";
export interface iState{
    status: HookSystemStatus;
    [key:string]: any; "./Constants";


}

interface iProviderProps{
    onReady: VoidFunction;
    children: React.ReactChildren;
}



export interface iHookContext{

    iteration: number;
    state: iState;
    dispatcher: (event: string|number, payload: any) => void;

}

interface iDriver {
    state: iState;
    dispatcher: tDispatcher;
}

export interface iInitializer {
    async(): Promise<iState>;
}

export interface HookFluxSystemProps {
    loadingScreen?: React.ReactChildren | null;
    children: React.ReactChildren;
    reducerList?: [any, iReducer][] | null;
    initializer?: iInitializer | null;
    ready?: boolean;
    defaultReducer?: iReducer | null;
    errorReducer?: iEReducer | null;
}
