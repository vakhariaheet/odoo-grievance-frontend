import { getClientInfo } from '@/app/admin/chat/actions';
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import Link from 'next/link';

const Navbar = async () => {
	const user = await getClientInfo();
	return (
		<div className='flex p-3'>
			<h1 className='text-2xl font-bold'>GrievEase</h1>

			<div className='flex flex-grow justify-end'>
				{user.metadata?.role === 'employee' && <Link href='/employee/add-grievance'
					className='p-2'>
					New Grievance
				</Link>}

				<SignedOut>
                    <button className='p-2 bg-blue-500 text-white rounded-md'>
                        <SignInButton />
                    </button>
				</SignedOut>
				<SignedIn>
					<UserButton />
				</SignedIn>
			</div>
		</div>
	);
};


export default Navbar;