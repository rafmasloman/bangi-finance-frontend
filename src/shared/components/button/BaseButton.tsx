import { Button, ButtonProps } from '@mantine/core';

interface IBaseButtonPropsType extends ButtonProps {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  btnVariant?: 'primary' | 'secondary';
  type?: 'submit' | 'button';
}

const BaseButton = (props: IBaseButtonPropsType) => {
  return (
    <Button
      type={props.type}
      classNames={{
        root: ` ${
          props.btnVariant === 'secondary'
            ? 'bg-white hover:bg-white'
            : ' bg-primary hover:bg-primary'
        } border border-black_primary shadow-[4px_4px_0] shadow-black_primary   hover:translate-y-1.5 hover:translate-x-1.5 duration-500 hover:shadow-[0px_0px_0]  duration-300 `,
        label: `text-black_primary
        `,
        section: `text-black_primary `,
      }}
      radius={'md'}
      onClick={props.onClick}
      {...props}
    >
      {props.children}
    </Button>
  );
};

export default BaseButton;
