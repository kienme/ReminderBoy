import {ADD_REMINDER, DELETE_REMINDER, COMPLETE_REMINDER} from '../constants';

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
	switch(action.type) {
		case ADD_REMINDER:
			reminders = [...state, reminder(action)];
			return reminders;

		case DELETE_REMINDER:
			reminders = state.filter(s => s.id !== action.id);
			return reminders;

		case COMPLETE_REMINDER:
			reminders = state.slice();	//copy
			const index = reminders.findIndex(r => r.id===action.id);
			reminders[index].completed = action.completed;
			return reminders;
		
		default:
			return state;
	}
}

export default reminders;