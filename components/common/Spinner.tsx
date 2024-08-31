// Importing the classnames library to conditionally apply CSS classes
import cn from 'classnames';
// Importing the ImSpinner3 icon from the react-icons library
import { ImSpinner3 } from 'react-icons/im';

interface Props {
	sm?: boolean; // Optional prop to set small size
	md?: boolean; // Optional prop to set medium size
	lg?: boolean; // Optional prop to set large size
}

export default function Spinner({ sm, md, lg }: Props) {
	// Using the classnames library to conditionally set the CSS classes based on the props
	const className = cn('animate-spin text-white-300 fill-white-300 mr-2', {
		'w-4 h-4': sm, // Apply these classes if the sm prop is true
		'w-6 h-6': md, // Apply these classes if the md prop is true
		'w-8 h-8': lg, // Apply these classes if the lg prop is true
	});

	return (
		// Setting the role to 'status' for accessibility
		<div role='status'>
			{/* Rendering the spinner icon with the computed className */}
			<ImSpinner3 className={className} />
			{/* Adding an accessible label for screen readers */}
			<span className='sr-only'>Loading...</span>
		</div>
	);
}
