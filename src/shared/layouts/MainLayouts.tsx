import {
  AppShell,
  Burger,
  Divider,
  Flex,
  Group,
  Image,
  Space,
} from '@mantine/core';
import { Outlet } from 'react-router-dom';
import { useDisclosure } from '@mantine/hooks';
import { LogoBangiLight } from '../../assets/images';
import HeaderPageLayout from './HeaderPageLayout';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import NavbarMain from '../../features/director/layouts/NavbarMain';

const MainLayout = () => {
  const [opened, { toggle }] = useDisclosure();
  const { user } = useContext(AuthContext);

  return (
    <AppShell
      header={{ height: { base: 'fit-content', lg: 0 } }}
      navbar={{
        width: {
          // base: 12,
          // sm: 80,
          md: 250,
        },
        breakpoint: 'md',
        collapsed: { mobile: !opened },
      }}
      classNames={{
        navbar: `   border-0 border-transparent -mt-10 md:-mt-0 h-full`,
        section: ``,
        root: `bg-black_primary md:bg-transparent pt-20 md:pt-0`,
        main: ` pt-7  bg-white md:bg-transparent  border-0 rounded-t-[30px] md:rounded-none `,
        header: `border-0`,
      }}
      padding={{
        base: 'lg',
        md: 'xl',
      }}
    >
      <AppShell.Navbar>
        <NavbarMain onClose={toggle} />
      </AppShell.Navbar>

      <AppShell.Header
        className={`bg-black_primary py-5 md:py-0 border-0 `}
        // zIndex={200}
      >
        <Flex direction={'row'} className="relative">
          <Burger
            opened={opened}
            onClick={toggle}
            hiddenFrom="md"
            size="sm"
            color="white"
            className="absolute left-2.5"
          />
          {opened ? null : (
            <Group justify="center" className="w-full">
              <Image
                src={LogoBangiLight}
                className="w-[125px]"
                hiddenFrom="sm"
              />
            </Group>
          )}
        </Flex>
      </AppShell.Header>

      <AppShell.Main>
        <HeaderPageLayout
          user={{
            firstname: user?.firstname ?? '',
            lastname: user?.lastname ?? '',
            role: user?.role ?? '',
          }}
        />

        <Space className="my-7" />

        <Divider className="mb-5 border border-neutral-200 rounded-lg" />

        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
};

export default MainLayout;
