import { TextInput, TextInputProps } from '@mantine/core';

interface IBaseTextInputProps extends TextInputProps {}

const BaseTextInput = (props: IBaseTextInputProps) => {
  return <TextInput radius={'md'} {...props} />;
};

export default BaseTextInput;
