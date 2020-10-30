/** @format */

import { alertLevels, hookSystemStatuses } from '../Constants';

/** @format */

export type tInitializer = { (): { [key: stirng]: any } } | { [key: string]: any };

export interface iError {
	alterLevel: alertLevels;
	message: message;
	iteration: number;
	timestamp: number;
	source: Error | string | number;
}

type tError = iError | Error;

export interface iState {
	status: hookSystemStatuses;
	statusIteration: number;
	iteration: number;
	errors: tError[];
	[key: string]: any;
}

enum fieldType {
	any = 'any',
	string = 'string',
	number = 'number',
	boolean = 'boolean',
	array = 'array',
	object = 'object',
	custom = 'custom',
	private = 'private',
}

interface iFieldDef {
	name: string;
	type: fieldType;
	readyOnly?: boolean;
	get?: { (): any };
	set?: { (value: any): { [key: string]: any } };
	validation?: { (value: any): boolean };
	initialValue?: any;
}

interface iChildModel {
	model: Model;
	hasChildren: boolean;
}

class Model {
	constructor(name: string) {
		this.name = name;
		this._children = new Map();
	}
	public readonly name: string;

	_children: Map<string, tChildModel>;
}

export interface iTemplate {
	name: string;
	fields?: iFieldDef[];
	children?: iTemplate[];
}

type tTemplate = iTemplate | { [key: string]: any };
interface iConfig {
	name: string;
}

export const modelTrainer = (template: tTemplate, config: iConfig): Model => {
	let fields = [];

	let PropertyMap = {};
	let children = [];

	Object.keys(template).forEach((key) => {
		let field = key;
		if (typeof field === 'string') {
		}
	});

	enum fieldType {
		any = 'any',
		string = 'string',
		number = 'number',
		boolean = 'boolean',
		array = 'array',
		object = 'object',
		custom = 'custom',
		private = 'private',
	}

	interface iFieldDef {
		name: string;
		type: fieldType;
		readyOnly?: boolean;
		get?: { (): any };
		set?: { (value: any): { [key: string]: any } };
		validation?: { (value: any): boolean };
		initialValue?: any;
	}

	let obj = new Model(config.name, fields);
	Object.defineProperties(obj, propertyMap);

	return obj;
};

/*
TODO: work on model updates
	Models update the object state that update the hooks.
   The complted models are housed from a provider in a useModels that can be updated from the reducer system.
   the reducer can also take function and async functs
	the default useHook takes a path to t

 */
