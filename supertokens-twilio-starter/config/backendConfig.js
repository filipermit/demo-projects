require("dotenv").config();

import SessionNode from "supertokens-node/recipe/session";
import Dashboard from "supertokens-node/recipe/dashboard";
import { appInfo } from "./appInfo";
import PasswordlessNode from "supertokens-node/recipe/passwordless";
import { TwilioService } from "supertokens-node/recipe/passwordless/smsdelivery";

export let backendConfig = () => {
	return {
		framework: "express",
		supertokens: {
			// this is the location of the SuperTokens core.
			connectionURI: process.env.SUPERTOKENS_CONNECTION_URI,
			apiKey: process.env.SUPERTOKENS_API_KEY,
		},
		appInfo,
		// recipeList contains all the modules that you want to
		// use from SuperTokens. See the full list here: https://supertokens.com/docs/guides
		recipeList: [
			PasswordlessNode.init({
				flowType: "USER_INPUT_CODE",
				contactMethod: "PHONE",
				smsDelivery: {
					service: new TwilioService({
						twilioSettings: {
							accountSid: process.env.TWILIO_ACCOUNT_SID,
							authToken: process.env.TWILIO_AUTH_TOKEN,
							from: process.env.TWILIO_TRIAL_PHONE_NUMBER,
						},
					}),
				},
			}),
			SessionNode.init(),
			Dashboard.init(),
		],
		isInServerlessEnv: true,
	};
};
