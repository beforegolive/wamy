const initialState = {}

export default function reducer1(state, action){
	switch (action.type) {
		case 'reducer1_action1':
			const result = state.switchValue
			return Object.assign(initialState, { switchValue: !result})
			break;
		default:
			return initialState
	}
}
