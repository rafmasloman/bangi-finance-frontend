import { NotificationData, notifications } from '@mantine/notifications';
import { HiBadgeCheck } from 'react-icons/hi';
import { MdSmsFailed } from 'react-icons/md';

interface IShowNotificationProps extends NotificationData {
  type: 'success' | 'failed';
}

function ShowNotification(props: IShowNotificationProps) {
  notifications.show({
    position: 'top-center',
    title: props.title || 'Default notification',
    message: props.message || 'This is the default message!',
    icon:
      props.type === 'success' ? (
        <HiBadgeCheck className="w-full h-full text-green-500" />
      ) : (
        <MdSmsFailed className="w-full h-full text-rose-500" />
      ),
    color: 'white',
    radius: 'md',
    classNames: {
      root: `bg-white text-white shadow-sm border-2 border-gray-200`,
    },
  });
}

export default ShowNotification;
