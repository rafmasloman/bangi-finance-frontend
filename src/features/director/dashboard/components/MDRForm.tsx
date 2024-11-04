import { Grid, Group, NumberInput } from '@mantine/core';
import BaseButton from '../../../../shared/components/button/BaseButton';
import { useForm } from '@mantine/form';

interface IMDRFormProps {
  handleSubmit: (data: any) => void;
  close?: () => void;
  initialValues?: { mdr?: number };
}

const MDRForm = (props: IMDRFormProps) => {
  const mdrForm = useForm({
    initialValues: {
      mdr: props.initialValues?.mdr || 0,
    },
  });

  return (
    <form onSubmit={mdrForm.onSubmit((values) => props.handleSubmit(values))}>
      <Grid className="border-b-2 border-b-neutral-200 pb-5">
        <Grid.Col span={{ base: 12 }}>
          <NumberInput
            placeholder="Masukkan MDR %"
            label="MDR %"
            // decimalScale={2}
            fixedDecimalScale
            hideControls
            {...mdrForm.getInputProps('mdr')}
          />
        </Grid.Col>
      </Grid>

      <Group className="mt-5" justify="end">
        <BaseButton btnVariant="secondary" onClick={props.close}>
          Batal
        </BaseButton>
        <BaseButton type="submit">Input</BaseButton>
      </Group>
    </form>
  );
};

export default MDRForm;
