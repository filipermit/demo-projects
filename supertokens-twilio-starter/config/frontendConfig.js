import { PasswordlessPreBuiltUI } from "supertokens-auth-react/recipe/passwordless/prebuiltui";
import SessionReact from "supertokens-auth-react/recipe/session";
import { appInfo } from "./appInfo";
import Router from "next/router";
import PasswordlessReact from "supertokens-auth-react/recipe/passwordless";

export let frontendConfig = () => {
	return {
		appInfo,
		recipeList: [
			PasswordlessReact.init({
				contactMethod: "PHONE",
			}),
			SessionReact.init(),
		],
		// this is so that the SDK uses the next router for navigation
		windowHandler: (oI) => {
			return {
				...oI,
				location: {
					...oI.location,
					setHref: (href) => {
						Router.push(href);
					},
				},
			};
		},
	};
};

export const PreBuiltUIList = [PasswordlessPreBuiltUI];
