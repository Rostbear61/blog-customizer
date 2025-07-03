import { useEffect } from 'react';

type UseOutsideClickClose = {
	isOpen: boolean;
	onChange: (newValue: boolean) => void;
	onClose?: () => void;
	rootRef: React.RefObject<HTMLDivElement>;
	ignoreRef?: React.RefObject<HTMLElement>;
};

export const useOutsideClickClose = ({
	isOpen,
	rootRef,
	onClose,
	onChange,
	ignoreRef,
}: UseOutsideClickClose) => {
	useEffect(() => {
		const handleClick = (event: MouseEvent) => {
			const { target } = event;
			if (!(target instanceof Node)) return;
			if (ignoreRef?.current && ignoreRef.current.contains(target)) {
				return;
			}
			if (rootRef.current && !rootRef.current.contains(target)) {
				if (isOpen) {
					onClose?.();
					onChange(false);
				}
			}
		};

		if (isOpen) {
			window.addEventListener('mousedown', handleClick);
		}

		return () => {
			window.removeEventListener('mousedown', handleClick);
		};
	}, [isOpen, rootRef, ignoreRef, onClose, onChange]);
};
