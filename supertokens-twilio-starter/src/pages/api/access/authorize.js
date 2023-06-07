import { Permit } from "permitio";
import { superTokensNextWrapper } from "supertokens-node/nextjs";
import { verifySession } from "supertokens-node/recipe/session/framework/express";
import supertokens from "supertokens-node";
import { backendConfig } from "../../../../config/backendConfig";

supertokens.init(backendConfig());

const permit = new Permit({
	pdp: "https://cloudpdp.api.permit.io",
	token: process.env.PERMIT_SDK_TOKEN,
});

const checkPermission = async (userId) => {
	const access = await permit.check(
		userId,
		"view",
		"restricted-page",
		"default"
	);
	return access;
};

export default async function isAllowed(req, res) {
	await superTokensNextWrapper(
		async (next) => {
			await verifySession({ sessionRequired: false })(req, res, next);
		},
		req,
		res
	);

	let session = req.session;

	if (session !== undefined) {
		// session exists
		let userId = session.getUserId();
		console.log("USER_ID: ", userId);

		const hasAccess = await checkPermission(userId);
		console.log(hasAccess);

		if (hasAccess) {
			res.status(200).send({ id: userId, allowed: hasAccess });
		} else {
			res.status(404).send({ id: userId, allowed: hasAccess });
			return;
		}
	} else {
		// session doesn't exist
		console.log("Session does not exist");
		res.status(401).send("Unauthorized");
	}
}
