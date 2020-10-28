/** @format */

export enum alertLevels {
	log,
	notice,
	warning,
	error,
	state,
	system,
	critical,
}

export enum hookSystemStatuses {
	dormant,
	loading,
	ready,
	inError,
	recovered,
	failed,
}
