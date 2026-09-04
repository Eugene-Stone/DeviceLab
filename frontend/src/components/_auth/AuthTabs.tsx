import { Tabs } from 'radix-ui';
import FormLogin from './FormLogin';
import FormRegistration from './FormRegistration';

export default function AuthTabs() {
	return (
		<Tabs.Root className="auth-wrapper" defaultValue="tab1">
			<Tabs.List className="auth-tabs" aria-label="Tabs">
				<Tabs.Trigger className="tab-button" value="tab1">
					Sign In
				</Tabs.Trigger>
				<Tabs.Trigger className="tab-button" value="tab2">
					Register
				</Tabs.Trigger>
			</Tabs.List>
			<div className="tab-contents">
				<Tabs.Content className="tab-content" value="tab1">
					<FormLogin />
				</Tabs.Content>

				<Tabs.Content className="tab-content" value="tab2">
					<FormRegistration />
				</Tabs.Content>
			</div>
		</Tabs.Root>
	);
}
