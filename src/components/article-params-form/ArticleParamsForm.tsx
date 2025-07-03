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
} from 'src/constants/articleProps';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';
import styles from './ArticleParamsForm.module.scss';
import { useState, useRef } from 'react';
import { RadioGroup } from 'src/ui/radio-group';

export interface DefaultValues {
	fontFamilyOption: OptionType;
	fontColor: OptionType;
	backgroundColor: OptionType;
	contentWidth: OptionType;
	fontSizeOption: OptionType;
}
interface ArticleParamsFormProps {
	defaultValues?: DefaultValues;
	onApply?: (params: DefaultValues) => void;
}

export const ArticleParamsForm: React.FC<ArticleParamsFormProps> = ({
	defaultValues,
	onApply,
}) => {
	const {
		fontFamilyOption,
		fontColor,
		backgroundColor,
		contentWidth,
		fontSizeOption,
	} = defaultValues || {
		fontFamilyOption: fontFamilyOptions[0],
		fontColor: fontColors[0],
		backgroundColor: backgroundColors[0],
		contentWidth: contentWidthArr[0],
		fontSizeOption: fontSizeOptions[0],
	};
	const [initialValues] = useState<DefaultValues>({
		fontFamilyOption: fontFamilyOptions[0],
		fontColor: fontColors[0],
		backgroundColor: backgroundColors[0],
		contentWidth: contentWidthArr[0],
		fontSizeOption: fontSizeOptions[0],
	});
	const [initialValuesState] = useState<DefaultValues>(initialValues);

	const [isOpen, setIsOpen] = useState(false);
	const rootRef = useRef<HTMLDivElement>(null);
	const arrowButtonRef = useRef<HTMLDivElement>(null);
	useOutsideClickClose({
		isOpen,
		rootRef,
		onChange: setIsOpen,
		onClose: () => setIsOpen(false),
		ignoreRef: arrowButtonRef,
	});

	const handleToggleForm = () => {
		setIsOpen((prev) => !prev);
	};

	const [selectedFont, setSelectedFont] =
		useState<OptionType>(fontFamilyOption);
	const [selectedFontSize, setSelectedFontSize] =
		useState<OptionType>(fontSizeOption);
	const [selectedFontColor, setSelectedFontColor] =
		useState<OptionType>(fontColor);
	const [selectedBackgroundColor, setSelectedBackgroundColor] =
		useState<OptionType>(backgroundColor);
	const [selectedContentWidth, setSelectedContentWidth] =
		useState<OptionType>(contentWidth);

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
		setSelectedFont(initialValuesState.fontFamilyOption);
		setSelectedFontColor(initialValuesState.fontColor);
		setSelectedBackgroundColor(initialValuesState.backgroundColor);
		setSelectedContentWidth(initialValuesState.contentWidth);
		setSelectedFontSize(initialValuesState.fontSizeOption);

		if (onApply) {
			onApply({ ...initialValuesState });
		}
	};
	return (
		<>
			<ArrowButton
				ref={arrowButtonRef}
				isOpen={isOpen}
				onClick={handleToggleForm}
			/>
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
