/** @format */



onst hookSystemManager = new HookSystemManager();

export const HookContext = React.createContext<iHookContext>({
    state: {},
    dispatch: hookSystemManager,
});


export

export interface HookFluxSystemProps {
    loadingScreen?: React.ReactChildren | null;
    children: React.ReactChildren;
    reducerList?: [any, iReducer][] | null;
    initializer?: iInitializer | null;
    ready?: boolean;
    onInitialized?: { (iState): iState; }
    defaultReducer?: iReducer | null;
    errorReducer?: iERrorReducer | null;
}

import {HookSystemStatus} from
import * as React from "react";
import {iReducer} from "./ReducerFactory";
import {errorTypes, HookSystemStatuses} from "./constants";

interface iProviderProps {
    onReady: VoidFunction;
    children: React.ReactChildren;
}


export interface iHookContext {

    iteration: number;
    state: iState;
    dispatcher: (event: string | number, payload: any) => void;

}

interface iDriver {
    state: iState;
    dispatcher: tDispatcher;
}

export interface iInitializer {
    async(): Promise<iState>;
}


import {HookSystemStatus} from
import * as React from "react";
import {iReducer} from "./ReducerFactory";

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
