import { Permit } from "permitio";

const permit = new Permit({
	pdp: "http://localhost:7766",
	// your API Key
	token: process.env.PERMIT_API_KEY,
});

const fetchLocationByIP = async () => {
	const request = await fetch(
		`https://ipinfo.io/json?token=${process.env.IP_INFO_TOKEN}`
	);
	const jsonResponse = await request.json();

	console.log(jsonResponse.ip, jsonResponse.country);

	return jsonResponse.country;
};

export default async function enforceAccess(req, res) {
	const IPlocation = await fetchLocationByIP();
	console.log("IP LOCATION: ", IPlocation);

	const allowed = await permit.check(
		{
			key: "demo_user@gmail.com",
			attributes: {
				ip_location: "UK",
			},
		},
		"view",
		{
			type: "only-uk",
			tenant: "default",
		}
	);

	res.status(200).send({ allowed });

	return allowed;
}
