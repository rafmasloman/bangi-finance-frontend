import {
  Button,
  Group,
  Image,
  Modal,
  NavLink,
  ScrollArea,
  SimpleGrid,
  Space,
  Stack,
  Text,
} from '@mantine/core';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  TbCashRegister,
  TbDeviceAnalytics,
  TbReport,
  TbTruckLoading,
} from 'react-icons/tb';
import { RiHome3Line } from 'react-icons/ri';
import { HiOutlineInboxStack } from 'react-icons/hi2';
import { checkPathname } from '../../../shared/utils/navbar.utils';
import {
  BOOK_BASE_DIRECTOR_PAGE,
  DAILY_REPORT_PAGE,
  DASHBOARD_PAGE,
  DIRECTOR_HISTORY_PAGE,
  EXPENSE_PAGE,
  MASTER_DATA_PAGE,
  SUMMARY_PAGE,
  SUPPLIER_PAGE,
} from '../../../constants/pages-route';
import { LuLayoutDashboard } from 'react-icons/lu';
import { LogoBangiLight } from '../../../assets/images';
import { IoAnalyticsSharp } from 'react-icons/io5';
import { useDisclosure } from '@mantine/hooks';
import cookieLibs from '../../../libs/js-cookie/cookie';

const NavbarEmployee = () => {
  const [opened, { close }] = useDisclosure(false);
  const navigate = useNavigate();
  const { historyId } = useParams();

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

          <NavLink
            component={Link}
            to={`${BOOK_BASE_DIRECTOR_PAGE}/${historyId}/${DAILY_REPORT_PAGE}`}
            leftSection={<TbReport className="text-lg xl:text-xl " />}
            label="Daily Report"
            classNames={{
              label: `text-sm xl:text-base `,

              root: `${
                checkPathname('daily-report')
                  ? 'bg-primary text-black font-semibold'
                  : 'text-white'
              } rounded-xl`,
              section: `${
                checkPathname('daily-report') ? 'text-black' : 'text-white'
              }`,
            }}
          />

          <NavLink
            component={Link}
            to={`${BOOK_BASE_DIRECTOR_PAGE}/${historyId}/${EXPENSE_PAGE}`}
            leftSection={<TbCashRegister className="text-lg xl:text-xl" />}
            label="Pengeluaran"
            classNames={{
              label: `text-sm xl:text-base `,

              root: `${
                checkPathname('expense')
                  ? 'bg-primary text-black font-semibold'
                  : 'text-white'
              } rounded-xl`,
              section: `${
                checkPathname('expense') ? 'text-black' : 'text-white'
              }`,
            }}
          />

          <NavLink
            component={Link}
            to={`${BOOK_BASE_DIRECTOR_PAGE}/${historyId}/${SUPPLIER_PAGE}`}
            leftSection={<TbTruckLoading className="text-lg xl:text-xl" />}
            label="Supplier"
            classNames={{
              label: `text-sm xl:text-base `,

              root: ` ${
                checkPathname('supplier')
                  ? 'bg-primary text-black font-semibold'
                  : 'text-white'
              } rounded-xl`,
              section: `${
                checkPathname('supplier') ? 'text-black' : 'text-white'
              }`,
            }}
          />
        </Stack>
        <NavLink
          component={Link}
          to={`${DIRECTOR_HISTORY_PAGE}`}
          leftSection={<RiHome3Line className="text-lg xl:text-xl " />}
          label="Kembali ke home"
          classNames={{
            label: `text-sm xl:text-base font-normal`,
            root: `text-white bg-black_primary hover:bg-primary hover:text-black hover:border-0 duration-500 border-solid border-b-[5px] border-2  border-neutral-500  rounded-lg`,
            body: `bg-red-5 w-fit h-fit`,
          }}
        />
      </Stack>
    </ScrollArea>
  );
};

export default NavbarEmployee;
