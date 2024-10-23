import { Modal, ModalProps, Stack, Text } from '@mantine/core';

interface IModalFormProps extends ModalProps {
  headerTitle?: string;
  description?: string;
}

const ModalForm = (props: IModalFormProps) => {
  return (
    <Modal
      title={
        <Stack gap={5}>
          <Text className="font-bold text-2xl ">{props.headerTitle}</Text>
          <Text className="text-sm text-gray-400">{props.description}</Text>
        </Stack>
      }
      radius={'lg'}
      shadow="sm"
      classNames={{
        title: `font-semibold text-xl`,
        header: `border-t-[16px]  border-t-[#9DBC98] `,
      }}
      {...props}
    >
      {props.children}
    </Modal>
  );
};

export default ModalForm;
