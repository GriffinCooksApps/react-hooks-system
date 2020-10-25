import * as React from 'react';
import {iHookContext} from "./ReactHooksSystems";

const hookSystemManager = new HookSystemManager();

export const HookContext = React.createContext<iHookContext>({
    state: {},
    dispatch: hookSystemManager,
});

export enum HookSystemStatus {
    dormant,
    loading,
    loaded,
    ready,
    inError,
    recovered,
    failed,

}
