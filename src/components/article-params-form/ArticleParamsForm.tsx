import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import clsx from 'clsx';
import {
	fontFamilyOptions,
	OptionType,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	ArticleStateType,
} from 'src/constants/articleProps';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';
import styles from './ArticleParamsForm.module.scss';
import { useState, useRef } from 'react';
import { RadioGroup } from 'src/ui/radio-group';

interface ArticleParamsFormProps {
	defaultValues: ArticleStateType;
	onApply?: (params: ArticleStateType) => void;
}

export const ArticleParamsForm: React.FC<ArticleParamsFormProps> = ({
	defaultValues,
	onApply,
}) => {
	const [isOpen, setIsOpen] = useState(false);
	const rootRef = useRef<HTMLDivElement>(null);
	useOutsideClickClose({
		isOpen,
		rootRef,
		onChange: setIsOpen,
		onClose: () => setIsOpen(false),
	});

	const [formState, setFormState] = useState<ArticleStateType>({
		fontFamilyOption: defaultValues.fontFamilyOption,
		fontSizeOption: defaultValues.fontSizeOption,
		fontColor: defaultValues.fontColor,
		backgroundColor: defaultValues.backgroundColor,
		contentWidth: defaultValues.contentWidth,
	});

	const handleOnChange = (field: keyof ArticleStateType) => {
		return (value: OptionType) => {
			setFormState((prevState) => ({ ...prevState, [field]: value }));
		};
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (onApply) {
			onApply({
				...formState,
			});
		}
	};

	const handleReset = () => {
		setFormState(defaultValues);
		if (onApply) {
			onApply({ ...defaultValues });
		}
	};
	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
			<aside
				ref={rootRef}
				className={clsx(styles.container, isOpen ? styles.container_open : '')}>
				<form className={styles.form} onSubmit={handleSubmit}>
					<h1 className={styles.title}>задайте параметры</h1>
					<div className={styles.marginBottom}>
						<Select
							title='Шрифт'
							options={fontFamilyOptions}
							selected={formState.fontFamilyOption}
							onChange={handleOnChange('fontFamilyOption')}
						/>
					</div>
					<div className={styles.marginBottom}>
						<RadioGroup
							name='fontSize'
							options={fontSizeOptions}
							selected={formState.fontSizeOption}
							onChange={handleOnChange('fontSizeOption')}
							title='Размер шрифта'
						/>
					</div>
					<div className={styles.marginBottomDouble}>
						<Select
							title='Цвет Шрифта'
							options={fontColors}
							selected={formState.fontColor}
							onChange={handleOnChange('fontColor')}
						/>
					</div>
					<div className={styles.marginBottom}>
						<Select
							title='Цвет Фона'
							options={backgroundColors}
							selected={formState.backgroundColor}
							onChange={handleOnChange('backgroundColor')}
						/>
					</div>
					<div className={styles.marginBottom}>
						<Select
							title='Ширина Контента'
							options={contentWidthArr}
							selected={formState.contentWidth}
							onChange={handleOnChange('contentWidth')}
						/>
					</div>
					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={handleReset}
						/>
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
