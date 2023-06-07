import React, { useEffect } from "react";
import useSWR from "swr";

export default function Restricted() {
	const fetcher = (url) => fetch(url).then((res) => res.json());
	const { data, error } = useSWR("/api/access/authorize", fetcher);

	if (error) return <div>failed to load</div>;
	if (!data) {
		return <div>Loading...</div>;
	} else {
		if (data.allowed) {
			return <div>Welcome user: {data.id}</div>;
		} else {
			return <div>User is not an administrator</div>;
		}
	}
}
