const Event = require ('../Event.js')

module.exports = class extends Event {

    constructor (o) {

		let {request} = o; if (!request) throw new Error ('Request handler not provided')
		
		for (let k of ['uuid', 'method_name', 'rq', 'user', 'session']) o [k] = request [k]
		
		delete o.request

		super (o)
		
	}

	get_message () {
	
		switch (this.phase) {
		
			case 'after'  : return super.get_message ()
			
			case 'before' : 

				let {method_name, rq} = this

				return [method_name, JSON.stringify (rq)].filter (i => i).join (' ')
				
			case 'auth' : 

				let {user, session} = this; if (!user) user = {id: null}
				
				let o = {user: user.id || user.uuid}
				
				if (session && session.id) o.session = session.id

				return JSON.stringify (o)
				
		}

	}

}