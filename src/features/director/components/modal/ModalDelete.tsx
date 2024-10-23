import {
  Button,
  Modal,
  ModalProps,
  SimpleGrid,
  Stack,
  Text,
} from '@mantine/core';

interface IModalDeleteProps extends ModalProps {
  name: string;
  onDelete?: () => void;
}

const ModalDelete = (props: IModalDeleteProps) => {
  return (
    <Modal
      title={
        <Stack gap={10}>
          <Text className="font-bold text-2xl ">Hapus Data {props.name}</Text>
          <Text className="text-sm text-gray-400 font-medium">
            Data yang telah dihapus tidak dapat dikembalikkan, anda yakin ingin
            menghapus?
          </Text>
        </Stack>
      }
      radius={'lg'}
      shadow="sm"
      classNames={{
        title: `font-semibold text-xl`,
        header: `p-5`,
        body: `px-5`,
      }}
      {...props}
    >
      <SimpleGrid cols={2} className="mt-3.5">
        <Button
          variant="outline"
          classNames={{
            root: `bg-white hover:bg-white border border-rose-500 shadow-[4px_4px_0] text-rose-500 hover:text-rose-600 shadow-rose-400   hover:translate-y-1.5 hover:translate-x-1.5 duration-500 hover:shadow-[0px_0px_0]  duration-300 `,
          }}
          onClick={props.onClose}
          radius={'md'}
        >
          Batal
        </Button>
        <Button
          classNames={{
            root: `bg-rose-500 hover:bg-rose-500 border border-rose-500 shadow-[4px_4px_0] text-white hover:text-white shadow-rose-300   hover:translate-y-1.5 hover:translate-x-1.5 duration-500 hover:shadow-[0px_0px_0]  duration-300 `,
          }}
          radius={'md'}
          onClick={props.onDelete}
        >
          Hapus
        </Button>
      </SimpleGrid>
    </Modal>
  );
};

export default ModalDelete;
