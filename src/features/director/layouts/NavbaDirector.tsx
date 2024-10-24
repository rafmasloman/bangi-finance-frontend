import {
  Avatar,
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
import { RiDoorOpenLine, RiHome3Line } from 'react-icons/ri';
import { HiOutlineInboxStack } from 'react-icons/hi2';
import { checkPathname } from '../../../shared/utils/navbar.utils';
import {
  BOOK_BASE_DIRECTOR_PAGE,
  DAILY_REPORT_PAGE,
  DASHBOARD_PAGE,
  DIRECTOR_BASE_PAGE,
  DIRECTOR_HISTORY_PAGE,
  EXPENSE_PAGE,
  MASTER_DATA_PAGE,
  SUMMARY_PAGE,
  SUPPLIER_PAGE,
} from '../../../constants/pages-route';
import { LuDatabaseBackup, LuLayoutDashboard } from 'react-icons/lu';
import { LogoBangiLight } from '../../../assets/images';
import { IoAnalyticsSharp, IoSettingsOutline } from 'react-icons/io5';
import { FaPerson } from 'react-icons/fa6';
import { useContext } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import { useDisclosure } from '@mantine/hooks';
import cookieLibs from '../../../libs/js-cookie/cookie';

const NavbarDirector = () => {
  const { user } = useContext(AuthContext);
  const [opened, { open, close }] = useDisclosure(false);
  const navigate = useNavigate();
  const { historyId } = useParams();

  console.log('historyId :', historyId);

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
        {/* <Stack
          className="bg-white rounded-xl p-2.5"
          align="center"
          justify="center"
        >
          <Group>
            <Avatar className="border border-neutral-300 " size={'md'} />
            <Stack gap={0}>
              <Text className="text-base font-semibold">{`${user?.firstname} ${user?.lastname}`}</Text>
              <Text className="text-sm  text-gray-400 ">{`${
                user?.role === 'DIRECTOR' ? 'Direktur' : 'Admin'
              }`}</Text>
            </Stack>
          </Group>

          <NavLink
            label="Kembali ke Homepage"
            classNames={{
              label: `text-sm  `,
            }}
          />
        </Stack> */}
        <Stack>
          <Text className="text-neutral-400 font-medium">Main Menu</Text>
          <NavLink
            leftSection={
              <TbDeviceAnalytics className="text-lg xl:text-xl text-white" />
            }
            label="Analytics"
            classNames={{
              label: `text-sm xl:text-base `,
              root: `text-white`,
              chevron: `text-white`,
            }}
          >
            <NavLink
              component={Link}
              classNames={{
                label: `text-base `,
                root: `${
                  checkPathname('dashboard')
                    ? 'bg-primary font-semibold'
                    : 'text-white'
                } rounded-xl`,
                section: `${
                  checkPathname('dashboard') ? 'text-black' : 'text-white'
                }`,
              }}
              to={`${BOOK_BASE_DIRECTOR_PAGE}/${historyId}/${DASHBOARD_PAGE}`}
              leftSection={
                <LuLayoutDashboard className="text-lg xl:text-xl " />
              }
              label="Dashboard"
            />

            <Space h={10} />

            <NavLink
              component={Link}
              classNames={{
                label: `text-base `,
                root: `${
                  checkPathname('master-data')
                    ? 'bg-primary font-semibold'
                    : 'text-white'
                } rounded-xl`,
                section: `${
                  checkPathname('master-data') ? 'text-black' : 'text-white'
                }`,
              }}
              to={`${BOOK_BASE_DIRECTOR_PAGE}/${historyId}/${MASTER_DATA_PAGE}`}
              leftSection={
                <HiOutlineInboxStack className="text-lg xl:text-xl" />
              }
              label="Master Data"
            />

            <Space h={10} />

            <NavLink
              component={Link}
              classNames={{
                label: `text-sm xl:text-base `,
                root: `${
                  checkPathname('summary')
                    ? 'bg-primary font-semibold'
                    : 'text-white'
                } rounded-xl`,
                section: `${
                  checkPathname('summary') ? 'text-black' : 'text-white'
                }`,
              }}
              to={`${BOOK_BASE_DIRECTOR_PAGE}/${historyId}/${SUMMARY_PAGE}`}
              leftSection={<IoAnalyticsSharp className="text-lg xl:text-xl " />}
              label="Summary"
            />
          </NavLink>

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

          {/* <NavLink
            leftSection={
              <TbCirclesRelation className="text-lg xl:text-xl text-white" />
            }
            label="Community"
            classNames={{
              label: `text-sm xl:text-base `,
              root: `text-white`,
              chevron: `text-white`,
            }}
          >
            <NavLink
              component={Link}
              classNames={{
                label: `text-base `,
                root: `${
                  checkPathname('expenses-category')
                    ? 'bg-primary font-semibold'
                    : 'text-white'
                } rounded-xl`,
                section: `${
                  checkPathname('expenses-category')
                    ? 'text-black'
                    : 'text-white'
                }`,
              }}
              to={EXPENSE_CATEGORY_PAGE}
              leftSection={<TbHomeDollar className="text-lg xl:text-xl " />}
              label="Expenses"
            />

            <Space h={10} />

            <NavLink
              component={Link}
              classNames={{
                label: `text-base `,
                root: `${
                  checkPathname('suppliers-community')
                    ? 'bg-primary font-semibold'
                    : 'text-white'
                } rounded-xl`,
                section: `${
                  checkPathname('suppliers-community')
                    ? 'text-black'
                    : 'text-white'
                }`,
              }}
              to={SUPPLIER_COMMUNITY_PAGE}
              leftSection={<FaPeopleCarry className="text-lg xl:text-xl" />}
              label="Suppliers"
            />
          </NavLink> */}

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

export default NavbarDirector;
