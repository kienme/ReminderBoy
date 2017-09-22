import {ADD_REMINDER, DELETE_REMINDER, COMPLETE_REMINDER} from '../constants';
import {bake_cookie, read_cookie} from 'sfcookies';

//Helper functions

const reminder = (action) => {
	return {
		text: action.text,
		completed: false,
		id: Math.random()	//TODO: change this
	}
}

//Reducer to export

const reminders = (state=[], action) => {
	let reminders = null;
	state = read_cookie('reminders');

	switch(action.type) {
		case ADD_REMINDER:
			reminders = [...state, reminder(action)];
			bake_cookie('reminders', reminders);
			return reminders;

		case DELETE_REMINDER:
			reminders = state.filter(s => s.id !== action.id);
			bake_cookie('reminders', reminders);
			return reminders;

		case COMPLETE_REMINDER:
			reminders = state.slice();	//copy
			const index = reminders.findIndex(r => r.id===action.id);
			reminders[index].completed = action.completed;
			bake_cookie('reminders', reminders);
			return reminders;
		
		default:
			return state;
	}
}

export default reminders;