import * as React from 'react';
import { IHookContext } from './hookSystem';

export const HookContext = React.createContext<IHookContext>({
	state: {},
	dispatch: null,
});
