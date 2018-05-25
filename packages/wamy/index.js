import createPage from './createPage'
export function page(){
	// this.prototype = Object.create(page.prototype)
	// console.log('======= constructor, wamy.page():', this.prototype)
}

export function component(){
	// return Component()
}

export default {
	page,
	component,
	_createPage: createPage
}
