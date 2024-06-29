import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';

const Navbar = () => {
	return (
		<div className='flex p-3'>
			<h1 className='text-2xl font-bold'>GrievEase</h1>

			<div className='flex flex-grow justify-end'>
				<button className='p-2'>Home</button>
				<button className='p-2'>About</button>
				<button className='p-2 mr-2'>Users</button>

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