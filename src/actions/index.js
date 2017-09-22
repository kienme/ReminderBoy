import {ADD_REMINDER, DELETE_REMINDER, COMPLETE_REMINDER} from '../constants';

export const addReminder = (text) => {
	return {
		type: ADD_REMINDER,
		text
	};
}

export const deleteReminder = (id) => {
	return {
		type: DELETE_REMINDER,
		id
	};
}

export const completeReminder = (id, completed) => {
	return {
		type: COMPLETE_REMINDER,
		id,
		completed
	}
}