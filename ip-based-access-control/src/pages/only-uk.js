import React from "react";
import useSWR from "swr";

export default function UnitedKingdomOnly() {
	const fetcher = (url) => fetch(url).then((res) => res.json());
	const { data, error } = useSWR("/api/restrict", fetcher);

	if (error) return <div>Failed to load.</div>;
	if (!data) {
		return <div>Loading...</div>;
	} else {
		if (data.allowed) {
			return (
				<div>
					If you are currently in the UK you will be able to see this page.
				</div>
			);
		} else {
			return <div>User is not based in the UK.</div>;
		}
	}
}
