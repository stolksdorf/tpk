const Store = require('./sheet.store.js');
const request = require('superagent');

const AsyncActions = {

	createSheet : () => {
		return new Promise((resolve, reject) => {
			return new Promise((resolve, reject) => {
				request.post(`/api/sheet`)
					.send(Store.getSheet())
					.end((err, res) => {
						if(err || !res.body){
							console.log('ERROR', err, err.toString());
							return reject(err);
						}
						return resolve(res.body);
					});
			});
		});
	},

	saveSheet : (editId) => {
		return new Promise((resolve, reject) => {
			request.put(`/api/sheet/${editId}`)
				.send(Store.getSheet())
				.end((err, res) => {
					if(err || !res.body){
						console.log('ERROR', err, err.toString());
						return reject(err);
					}
					return resolve(res.body);
				});
		});
	},

	createOverride : (viewId) => {
		return new Promise((resolve, reject) => {
			request.post(`/api/override`)
				.send({
					data : Store.getData(),
					linkedSheetId : viewId
				})
				.end((err, res) => {
					if(err || !res.body){
						console.log('ERROR', err, err.toString());
						return reject(err);
					}
					return resolve(res.body);
				});
		});
	},

	saveOverride : (overrideId) => {
		return new Promise((resolve, reject) => {
			request.put(`/api/override/${overrideId}`)
				.send({
					data : Store.getData()
				})
				.end((err, res) => {
					if(err || !res.body){
						console.log('ERROR', err, err.toString());
						return reject(err);
					}
					return resolve(res.body);
				});
		});
	}


};

module.exports = AsyncActions;