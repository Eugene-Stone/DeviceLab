export type TitleHtmlType = {
	className?: string;
	titleTag?: React.ElementType | null;
	children?: string;
};
export default function TitleHtml({ className, titleTag, children }: TitleHtmlType) {
	// Если titleTag равен null/undefined, берём 'h2'
	const Tag = titleTag ?? 'h2';

	return <Tag className={className} dangerouslySetInnerHTML={{ __html: children || '' }} />;
}
