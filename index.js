const app = require('./src/express/app');
const sequelize = require('./src/sequelize');
const PORT = 3000;
const IP_ADDRESS = '192.168.1.82'; // Force ip_address

async function assertDatabaseConnectionOk() {
	console.log(`Checking database connection...`);
	try {
		await sequelize.authenticate();
		console.log('Database connection OK!');
	} catch (error) {
		console.log('Unable to connect to the database:');
		console.log(error.message);
		process.exit(1);
	}
}

const os = require('os'); // Module to get local IP 

async function init() {
	await assertDatabaseConnectionOk();

	const interfaces = os.networkInterfaces();
	const addresses = [];

	Object.values(interfaces).forEach(iface =>
		iface.forEach(addr => {
			if (addr.family === 'IPv4' && !addr.internal) {
				addresses.push(addr.address);
			}
		})
	);

	console.log(`Starting SideKick on port ${PORT}...`);
	console.log(`Internal IP addresses: ${addresses.join(', ')}`);

	// starting the server
	app.listen(PORT, IP_ADDRESS, () => {
		console.log(`Express server started at ${IP_ADDRESS}:${PORT}. Try some routes, such as '/api/games'.`);
	});
}

init();