import sanitizeHtml from 'sanitize-html';

type Props = {
	className?: string;
	children?: string | null;
};

const sanitizeOptions: sanitizeHtml.IOptions = {
	allowedTags: [
		// Links & Text content
		'a',
		'p',
		'br',

		// Sectioning & Structure
		'html',
		'body',
		'article',
		'section',
		'nav',
		'aside',
		'header',
		'footer',
		'main',
		'address',

		// Headings
		'h1',
		'h2',
		'h3',
		'h4',
		'h5',
		'h6',
		'hgroup',

		// Text content & Inline formatting
		'p',
		'br',
		'hr',
		'blockquote',
		'pre',
		'code',
		'kbd',
		'samp',
		'var',
		'span',
		'div',
		'small',
		'strong',
		'em',
		'b',
		'i',
		'u',
		's',
		'strike',
		'sub',
		'sup',
		'mark',
		'time',
		'data',
		'abbr',
		'cite',
		'q',
		'dfn',
		'bdi',
		'bdo',
		'ruby',
		'rt',
		'rp',
		'wbr',

		// Lists
		'ul',
		'ol',
		'li',
		'dl',
		'dt',
		'dd',
		'menu',

		// Tables
		'table',
		'caption',
		'thead',
		'tbody',
		'tfoot',
		'tr',
		'th',
		'td',
		'col',
		'colgroup',

		// Forms & Inputs
		'form',
		'input',
		'textarea',
		'button',
		'select',
		'optgroup',
		'option',
		'label',
		'fieldset',
		'legend',
		'datalist',
		'output',
		'progress',
		'meter',

		// Media & Embedded
		'img',
		'picture',
		'source',
		'audio',
		'video',
		'track',
		'iframe',
		'embed',
		'object',
		'param',
		'canvas',
		'svg',

		// Interactive
		'details',
		'summary',
		'dialog',
	],
	allowedAttributes: {
		a: ['href', 'target', 'rel'],
		// Для полного доступа медиа и таблиц потребуются их атрибуты:
		img: ['src', 'alt', 'width', 'height', 'loading', 'srcset', 'sizes'],
		iframe: ['src', 'width', 'height', 'allow', 'allowfullscreen'],
		source: ['src', 'srcset', 'type', 'media'],
		audio: ['src', 'controls', 'autoplay', 'loop'],
		video: ['src', 'controls', 'autoplay', 'loop', 'width', 'height', 'poster'],
		'*': ['class', 'id', 'title', 'aria-*', 'data-*'], // глобальные атрибуты при необходимости
	},
	allowedSchemes: ['http', 'https', 'mailto', 'tel'],
	allowedSchemesByTag: {
		img: ['http', 'https', 'data'],
		source: ['http', 'https'],
	},
	transformTags: {
		a: sanitizeHtml.simpleTransform('a', {
			rel: 'noopener noreferrer nofollow',
			target: '_blank',
		}),
		img: (tagName, attribs) => {
			return {
				tagName,
				attribs: {
					...attribs,
					loading: 'lazy',
				},
			};
		},
	},
};

export default function RichText({ className, children }: Props) {
	if (!children) {
		return null;
	}

	const cleanHtml = sanitizeHtml(children, sanitizeOptions);

	return (
		<div
			className={className ? className : ''}
			dangerouslySetInnerHTML={{ __html: cleanHtml }}
			// dangerouslySetInnerHTML={{ __html: children }}
		/>
	);
}
