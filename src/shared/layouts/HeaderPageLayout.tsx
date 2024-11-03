import { Avatar, Group, Stack, Text } from '@mantine/core';
import { formatPathToTitle } from '../utils/helpers';
import { useLocation } from 'react-router-dom';

interface IHeaderPageLayoutProps {
  user?: {
    firstname: string;
    lastname: string;
    role: string;
  };
}

const HeaderPageLayout = (props: IHeaderPageLayoutProps) => {
  const { pathname } = useLocation();
  return (
    <Group gap={12} align="center" className="w-full" justify="space-between">
      {/* <Group className="h-8  w-1.5 bg-primary rounded-lg"></Group> */}
      <Text className="text-xl md:text-2xl font-semibold ">
        {formatPathToTitle(pathname)}
      </Text>

      <Group>
        <Avatar className="border border-neutral-300 " size={'md'} />
        <Stack gap={0}>
          <Text className="text-base sm:text-lg lg:text-xl font-semibold">{`${props.user?.firstname} ${props.user?.lastname}`}</Text>
          <Text className="text-base sm:text-lg font-medium text-gray-400 ">{`${
            props.user?.role === 'DIRECTOR' ? 'Boss' : 'Admin'
          }`}</Text>
        </Stack>
      </Group>
    </Group>
  );
};

export default HeaderPageLayout;
