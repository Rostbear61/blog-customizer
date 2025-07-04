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

	const [selectedFont, setSelectedFont] = useState<OptionType>(
		defaultValues.fontFamilyOption
	);
	const [selectedFontSize, setSelectedFontSize] = useState<OptionType>(
		defaultValues.fontSizeOption
	);
	const [selectedFontColor, setSelectedFontColor] = useState<OptionType>(
		defaultValues.fontColor
	);
	const [selectedBackgroundColor, setSelectedBackgroundColor] =
		useState<OptionType>(defaultValues.backgroundColor);
	const [selectedContentWidth, setSelectedContentWidth] = useState<OptionType>(
		defaultValues.contentWidth
	);

	const handleFontChange = (option: OptionType) => {
		setSelectedFont(option);
	};
	const handleFontSizeChange = (option: OptionType) => {
		setSelectedFontSize(option);
	};
	const handleFontColorChange = (option: OptionType) => {
		setSelectedFontColor(option);
	};
	const handleBackgroundColorChange = (option: OptionType) => {
		setSelectedBackgroundColor(option);
	};
	const handleContentWidthChange = (option: OptionType) => {
		setSelectedContentWidth(option);
	};
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (onApply) {
			onApply({
				fontFamilyOption: selectedFont,
				fontColor: selectedFontColor,
				backgroundColor: selectedBackgroundColor,
				contentWidth: selectedContentWidth,
				fontSizeOption: selectedFontSize,
			});
		}
	};

	const handleReset = () => {
		setSelectedFont(defaultValues.fontFamilyOption);
		setSelectedFontColor(defaultValues.fontColor);
		setSelectedBackgroundColor(defaultValues.backgroundColor);
		setSelectedContentWidth(defaultValues.contentWidth);
		setSelectedFontSize(defaultValues.fontSizeOption);

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
							selected={selectedFont}
							onChange={handleFontChange}
						/>
					</div>
					<div className={styles.marginBottom}>
						<RadioGroup
							name='fontSize'
							options={fontSizeOptions}
							selected={selectedFontSize}
							onChange={handleFontSizeChange}
							title='Размер шрифта'
						/>
					</div>
					<div className={styles.marginBottomDouble}>
						<Select
							title='Цвет Шрифта'
							options={fontColors}
							selected={selectedFontColor}
							onChange={handleFontColorChange}
						/>
					</div>
					<div className={styles.marginBottom}>
						<Select
							title='Цвет Фона'
							options={backgroundColors}
							selected={selectedBackgroundColor}
							onChange={handleBackgroundColorChange}
						/>
					</div>
					<div className={styles.marginBottom}>
						<Select
							title='Ширина Контента'
							options={contentWidthArr}
							selected={selectedContentWidth}
							onChange={handleContentWidthChange}
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
