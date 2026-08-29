export function detectActiveLink(pathname: string, menuItemPath: string) {
	// Приводим путь к формату с ведущим слэшем
	const cleanItemPath = menuItemPath.startsWith('/') ? menuItemPath : `/${menuItemPath}`;

	// Нормализуем текущий pathname (убираем концевой слэш)
	const currentPath =
		pathname.length > 1 && pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;

	// Проверяем активность
	const isActive =
		cleanItemPath === `/`
			? currentPath === cleanItemPath
			: currentPath === cleanItemPath || currentPath.startsWith(`${cleanItemPath}/`);

	return isActive;
}
