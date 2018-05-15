const initialState = {}

export default function reducer2(state, action){
	switch (action.type) {
		case 'reducer2_action1':
			const result = state.switchValue
			return Object.assign(initialState, { switchValue: !result})
			break;
		default:
			return initialState
	}
}
