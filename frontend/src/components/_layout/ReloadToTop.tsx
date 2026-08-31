'use client';
import { usePathname } from 'next/navigation';
import { useLayoutEffect } from 'react';

export default function ReloadToTop() {
	const pathname = usePathname();

	useLayoutEffect(() => {
		// 1. Принудительно отключаем плавную прокрутку браузера (если в CSS стоит scroll-behavior: smooth)
		// 2. Перемещаем скролл мгновенно до отрисовки кадра
		/* 
			Если в стилях на html или body прописано scroll-behavior: smooth;, браузер будет игнорировать вызовы window.scrollTo(0, 0) и пытаться делать плавный анимационный скролл. Передача объекта { behavior: 'instant' } перебивает это правило.
		*/

		/* 
			По умолчанию next/link и так сбрасывает скролл наверх. Если этого не происходит или поведение ломается, нужно убедится, что на ссылках не стоит проп scroll={false}.
		*/
		window.scrollTo({
			top: 0,
			left: 0,
			behavior: 'instant',
		});
	}, [pathname]);

	return null;
}
