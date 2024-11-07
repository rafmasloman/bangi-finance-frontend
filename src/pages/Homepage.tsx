import { Container, Group, Image, Stack } from '@mantine/core';
import { LogoBangiLight } from '../assets/images';
import BaseButton from '../shared/components/button/BaseButton';
import { BiSolidRightArrowAlt } from 'react-icons/bi';
import { Link } from 'react-router-dom';

const Homepage = () => {
  return (
    <Container className="h-screen bg-black_primary" fluid>
      <Stack gap={0} align="center" justify="center" className="h-full">
        <Group>
          <Image
            src={LogoBangiLight}
            className="w-full h-20 mb-10 animate-pulse"
          />
        </Group>
        <Link to={'/login'}>
          <BaseButton
            variant="primary"
            rightSection={<BiSolidRightArrowAlt />}
            className="w-56"
          >
            Lanjutkan ke Login
          </BaseButton>
        </Link>
      </Stack>
    </Container>
  );
};

export default Homepage;
