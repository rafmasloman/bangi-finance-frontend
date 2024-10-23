import { Stack, Tabs, Text } from '@mantine/core';
import AccountForm from '../../../features/account/components/AccountForm';
import ProfilePanel from '../../../features/account/Tabs/ProfilePanel';
import AccountPanel from '../../../features/account/Tabs/AccountPanel';

const DirectorAccountSettingPage = () => {
  return (
    <Stack>
      <Tabs
        defaultValue={'profile'}
        classNames={{
          panel: `mt-7 px-0 xl:px-16`,
          tab: `w-[180px] data-[active=true]:bg-primary/[0.5] px-5 py-3 data-[active=true]:text-black_primary data-[active=true]:border data-[active=true]:border-neutral-300 data-[active=true]:border-solid font-semibold`,
          root: `mt-5`,
          list: `bg-white `,
        }}
        variant="pills"
        radius={10}
      >
        <Tabs.List>
          <Tabs.Tab value="profile">Profile</Tabs.Tab>
          <Tabs.Tab value="account">Account User</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="profile">
          <ProfilePanel />
        </Tabs.Panel>

        <Tabs.Panel value="account">
          <AccountPanel />
        </Tabs.Panel>
      </Tabs>
    </Stack>
  );
};

export default DirectorAccountSettingPage;
