import ProfileDataForm from './ProfileDataForm';
import { Session } from 'next-auth';
import ProfilePasswordForm from './ProfilePasswordForm';

type Props = {
	session: Session;
};

export default function ProfileData({ session }: Props) {
	return (
		<>
			<ProfileDataForm session={session} />
			<ProfilePasswordForm session={session} />
		</>
	);
}
