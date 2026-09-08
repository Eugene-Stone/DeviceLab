import { handleLogout } from '@/api/api-client';
import { useState } from 'react';

export default function LogOutButton() {
	const [isLogout, setIsLogout] = useState(false);
	function logout() {
		handleLogout();
		setIsLogout(true);
	}

	return (
		<button className={`log-out__button ${isLogout ? 'pending' : ''}`} onClick={logout}>
			<strong>LOG OUT</strong>
		</button>
	);
}
