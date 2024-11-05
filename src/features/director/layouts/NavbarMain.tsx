import {
  Button,
  Group,
  Image,
  Modal,
  NavLink,
  ScrollArea,
  SimpleGrid,
  Stack,
  Text,
} from '@mantine/core';
import { Link, useNavigate } from 'react-router-dom';
import { RiDoorOpenLine } from 'react-icons/ri';
import { checkPathname } from '../../../shared/utils/navbar.utils';
import {
  ADMIN_HISTORY_PAGE,
  DIRECTOR_HISTORY_PAGE,
  DIRECTOR_USER_PAGE,
} from '../../../constants/pages-route';
import { LuDatabaseBackup } from 'react-icons/lu';
import { LogoBangiLight } from '../../../assets/images';
import { FaPerson } from 'react-icons/fa6';
import { useContext } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import { useDisclosure } from '@mantine/hooks';
import cookieLibs from '../../../libs/js-cookie/cookie';
import { IoSettingsOutline } from 'react-icons/io5';

export interface INavbarProps {
  onClose?: () => void;
}

const NavbarMain = (props: INavbarProps) => {
  const { user } = useContext(AuthContext);
  const [opened, { open, close }] = useDisclosure(false);
  const navigate = useNavigate();

  const handleLogoutButton = () => {
    cookieLibs.deleteCookie('token');

    navigate('/login');
  };

  return (
    <ScrollArea className="h-full px-2.5 pt-10 pb-7 bg-black_primary ">
      <Modal
        opened={opened}
        onClose={close}
        title={
          <Stack gap={10}>
            <Text className="font-bold text-2xl ">Keluar Akun ?</Text>
            <Text className="text-base text-gray-400 font-medium">
              Apakah anda yakin ingin keluar dari halaman ini?
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
      >
        <SimpleGrid cols={2} className="mt-3.5">
          <Button
            variant="outline"
            classNames={{
              root: `bg-white hover:bg-white border border-rose-500 shadow-[4px_4px_0] text-rose-500 hover:text-rose-600 shadow-rose-400   hover:translate-y-1.5 hover:translate-x-1.5 duration-500 hover:shadow-[0px_0px_0]  duration-300 `,
            }}
            onClick={close}
            radius={'md'}
          >
            Batal
          </Button>
          <Button
            classNames={{
              root: `bg-rose-500 hover:bg-rose-500 border border-rose-500 shadow-[4px_4px_0] text-white hover:text-white shadow-rose-300   hover:translate-y-1.5 hover:translate-x-1.5 duration-500 hover:shadow-[0px_0px_0]  duration-300 `,
            }}
            radius={'md'}
            onClick={handleLogoutButton}
          >
            Keluar
          </Button>
        </SimpleGrid>
      </Modal>

      <Stack gap={40}>
        <Group justify="center">
          <Image src={LogoBangiLight} className="w-[180px]" />
        </Group>
        <Stack>
          <Text className="text-neutral-400 font-medium">Main Menu</Text>

          {user?.role !== 'DIRECTOR' ? null : (
            <NavLink
              component={Link}
              to={DIRECTOR_USER_PAGE}
              leftSection={<FaPerson className="text-lg xl:text-xl " />}
              label="Users"
              classNames={{
                label: `text-sm xl:text-base `,

                root: `${
                  checkPathname('user')
                    ? 'bg-primary hover:rounded-xl text-black font-semibold hover:bg-primary'
                    : 'text-white hover:bg-transparent'
                } rounded-xl border-2 border-transparent border-solid hover:border-b-2 hover:border-b-primary  hover:border-solid hover:rounded-none`,
                section: `${
                  checkPathname('user') ? 'text-black' : 'text-white'
                }`,
              }}
              onClick={props.onClose}
            />
          )}

          <NavLink
            component={Link}
            to={
              user?.role !== 'DIRECTOR'
                ? ADMIN_HISTORY_PAGE
                : DIRECTOR_HISTORY_PAGE
            }
            leftSection={<LuDatabaseBackup className="text-lg xl:text-xl " />}
            label="History"
            border-2
            border-transparent
            border-solid
            hover:border-b-2
            hover:border-b-primary
            hover:border-solid
            hover:rounded-none
            hover:bg-transparent
            classNames={{
              label: `text-sm xl:text-base `,
              root: `${
                checkPathname('histories')
                  ? 'bg-primary hover:rounded-xl text-black font-semibold hover:bg-primary'
                  : 'text-white  hover:bg-transparent'
              } rounded-xl border-2 border-transparent border-solid hover:border-b-2 hover:border-b-primary  hover:border-solid hover:rounded-none `,
              section: `${
                checkPathname('histories') ? 'text-black' : 'text-white'
              }`,
            }}
            onClick={props.onClose}
          />
        </Stack>

        <Stack gap={16}>
          <Text className="text-neutral-400 font-medium">Settings</Text>
          {user?.role !== 'DIRECTOR' ? null : (
            <NavLink
              component={Link}
              to={`${DIRECTOR_USER_PAGE}/account-setting`}
              leftSection={
                <IoSettingsOutline className="text-lg xl:text-xl " />
              }
              label="Account"
              classNames={{
                label: `text-sm xl:text-base `,

                root: `${
                  checkPathname('account-setting')
                    ? 'bg-primary hover:rounded-xl text-black font-semibold hover:bg-primary'
                    : 'text-white hover:bg-transparent'
                } rounded-xl border-2 border-transparent border-solid hover:border-b-2 hover:border-b-primary  hover:border-solid hover:rounded-none`,
                section: `${
                  checkPathname('account-setting') ? 'text-black' : 'text-white'
                }`,
              }}
              onClick={props.onClose}
            />
          )}
          <NavLink
            component={Button}
            onClick={open}
            leftSection={<RiDoorOpenLine className="text-lg xl:text-xl " />}
            label="Logout"
            classNames={{
              label: `text-sm xl:text-base font-normal`,
              root: `text-white h-fit bg-black_primary hover:bg-primary hover:text-black hover:border-0 duration-500 border-solid border-b-[5px] border-2  border-neutral-500  rounded-lg`,
              body: ` h-full`,
            }}
          />
        </Stack>
      </Stack>
    </ScrollArea>
  );
};

export default NavbarMain;
