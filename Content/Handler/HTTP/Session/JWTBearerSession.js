const jwt           = require ('jsonwebtoken')
const BearerSession = require ('./BearerSession')

module.exports = class extends BearerSession {

	constructor (h, o) {
		super (h, o)
		for (let k of ['claim', 'sign', 'verify']) if (!o [k]) o [k] = {}
		o.sign.expiresIn = o.timeout + 'm'
	}
	
	async get_private_key () {
		return 'z'
	}
	
	async get_public_key () {
		return 'z'
	}

    async get_user () {

    	let {id} = this; if (!id) return this.h.no_user ()
        
        try {
        
        	this.user = jwt.verify (id, await this.get_public_key (), this.o.verify).sub

        	await this.keep_alive ()

        	return this.user

        }
        catch (x) {

        	this.h.warn (x.message, {id})

        	return this.h.no_user ()

        }

    }

}