import {
  ActionIcon,
  Card,
  ComboboxItem,
  Group,
  Select,
  SimpleGrid,
  Stack,
  Tabs,
  Text,
} from "@mantine/core";
import { FaBoxOpen } from "react-icons/fa6";
import { useGetAllSuppliers } from "../../../api/supplier/hooks/useGetAllSuppliers";
import { useEffect, useState } from "react";
import CurrencyFormatter from "../../../shared/components/formatter/CurrencyFormatter";
import SupplierCommunityPanel from "../../../features/director/supplier/components/SupplierCommunityPanel";
import { useParams } from "react-router-dom";
import { useGetTotalPaymentSupplier } from "../../../api/supplier/hooks/useGetTotalPaymentSupplier";
import SupplierEmployeePanel from "../../../features/employee/supplier/components/SupplierEmployePanel";
import { useGetAllSupplierCategoryBySupplier } from "../../../api/supplier-category/hooks/useGetSupplierCategoryBySupplier";

const SupplierEmployeePage = () => {
  const { historyId } = useParams();
  const [, setTotalSupplier] = useState<number>(0);
  const [totalPaidSupplier, setTotalPaidSupplier] = useState<number>(0);
  const [totalUnpaidSupplier, setTotalUnpaidSupplier] = useState<number>(0);

  const [selectedSupCompany, setSelectedSupCompany] =
    useState<ComboboxItem | null>(null);

  const [filterJatuhTempo, setFilterJatuhTempo] = useState<ComboboxItem | null>(
    null
  );

  const [filterPaid, setFilterPaid] = useState<ComboboxItem | null>(null);

  const suppliers = useGetAllSuppliers(
    historyId,
    selectedSupCompany?.value,
    filterJatuhTempo?.value,
    filterPaid?.value
  );

  const supplierCompanies = useGetAllSupplierCategoryBySupplier();

  const totalPaymentSupplier = useGetTotalPaymentSupplier(historyId);

  useEffect(() => {
    if (!totalPaymentSupplier.data?.totalPaid) {
      setTotalPaidSupplier(0);
    }

    if (!totalPaymentSupplier.data?.totalUnpaid) {
      setTotalUnpaidSupplier(0);
    }

    if (!totalPaymentSupplier.data) {
      setTotalSupplier(0);
    } else {
      setTotalPaidSupplier(totalPaymentSupplier.data.totalPaid);
      setTotalUnpaidSupplier(totalPaymentSupplier.data.totalUnpaid);
    }
  }, [totalPaymentSupplier.data]);

  if (suppliers.isLoading) {
    return <Text>Loading...</Text>;
  }

  return (
    <Stack gap={30} className="container mx-auto">
      <Text className="text-xl font-semibold">Halaman Supplier</Text>

      <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }} spacing={{ base: 30 }}>
        <Card
          radius={25}
          shadow="xs"
          className="w-full h-fit py-5 relative bg-black_primary overflow-visible"
        >
          <div className="w-5/6  h-10 absolute -z-30 -bottom-2 left-1/2 transform -translate-x-1/2 bg-neutral-400/80 rounded-lg"></div>
          <div className="w-3/4  h-10 absolute -z-40 -bottom-3.5 left-1/2 transform -translate-x-1/2 bg-neutral-300/70 rounded-lg"></div>

          <Stack gap={20}>
            <Group justify="space-between">
              <Text className="text-lg font-semibold text-white">
                Total Supplier
              </Text>
              <ActionIcon
                variant="light"
                size={40}
                radius={"xl"}
                className="bg-primary "
              >
                <FaBoxOpen className="text-2xl text-black_primary" />
              </ActionIcon>
            </Group>
            <Stack gap={10}>
              <CurrencyFormatter
                currency="IDR"
                className="text-3xl text-white font-semibold "
                value={totalPaidSupplier + totalUnpaidSupplier}
              />

              <Text className="text-base text-gray-400 font-medium ">
                Jumlah Supplier : {suppliers.data?.suppliers.length}
              </Text>
            </Stack>
          </Stack>
        </Card>

        <Card
          radius={25}
          // shadow="xs"
          className="w-full h-fit py-5 relative bg-green-300/[0.5] overflow-visible"
        >
          <Card.Section className="p-3.5">
            <Stack>
              <Group justify="space-between">
                <Text className="text-lg font-semibold text-black_primary">
                  Paid Supplier
                </Text>
                <ActionIcon
                  variant="light"
                  size={40}
                  radius={"xl"}
                  className="bg-white"
                >
                  <FaBoxOpen className="text-2xl text-black_primary" />
                </ActionIcon>
              </Group>
              <CurrencyFormatter
                value={
                  !totalPaymentSupplier.data?.totalPaid
                    ? 0
                    : totalPaymentSupplier.data?.totalPaid
                }
                currency="IDR"
                className="text-3xl text-black_primary font-semibold "
              />

              <Text className="text-base text-gray-700 font-semibold ">
                {!totalPaymentSupplier.data?.paymentStatusAmount[0]
                  ? 0
                  : totalPaymentSupplier.data?.paymentStatusAmount[0]._count
                      ._all}{" "}
                Supplier telah dibayar
              </Text>
            </Stack>
          </Card.Section>
        </Card>

        <Card
          radius={25}
          // shadow="xs"
          className="w-full h-fit py-5 relative bg-rose-300/[0.7] overflow-visible"
        >
          <Card.Section className="p-3.5">
            <Stack>
              <Group justify="space-between">
                <Text className="text-lg font-semibold text-black_primary">
                  Unpaid Supplier
                </Text>
                <ActionIcon
                  variant="light"
                  size={40}
                  radius={"xl"}
                  className="bg-white"
                >
                  <FaBoxOpen className="text-2xl text-black_primary" />
                </ActionIcon>
              </Group>
              <CurrencyFormatter
                value={
                  !totalPaymentSupplier.data?.totalUnpaid
                    ? 0
                    : totalPaymentSupplier.data?.totalUnpaid
                }
                currency="IDR"
                className="text-3xl text-black_primary font-semibold "
              />

              <Text className="text-base text-gray-700 font-semibold ">
                {!totalPaymentSupplier.data?.paymentStatusAmount[1]
                  ? 0
                  : totalPaymentSupplier.data?.paymentStatusAmount[1]._count
                      ._all}{" "}
                Supplier belum membayar
              </Text>
            </Stack>
          </Card.Section>
        </Card>
      </SimpleGrid>

      <Tabs
        defaultValue={"suppliers"}
        classNames={{
          panel: `mt-7`,
          tab: `w-[180px] data-[active=true]:bg-primary/[0.5] px-5 py-3.5 data-[active=true]:text-black_primary data-[active=true]:border data-[active=true]:border-neutral-300 data-[active=true]:border-solid font-semibold`,
          root: `mt-5`,
          list: `bg-white `,
        }}
        radius={10}
        variant="pills"
      >
        <Tabs.List>
          <Tabs.Tab value="suppliers">Supplier</Tabs.Tab>
          <Tabs.Tab value="supplier-communities">Kategory Supplier</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="suppliers">
          {!suppliers.data?.suppliers ? null : (
            <SupplierEmployeePanel
              suppliers={suppliers.data?.suppliers}
              controlInput={
                <>
                  <Select
                    placeholder="Pilih Kategori Supplier"
                    data={
                      !supplierCompanies.data
                        ? [
                            {
                              label: "",
                              value: "",
                            },
                          ]
                        : supplierCompanies.data?.map((supplier) => {
                            return {
                              label: supplier.name,
                              value: supplier.id.toString(),
                            };
                          })
                    }
                    value={selectedSupCompany ? selectedSupCompany.value : null}
                    onChange={(_value, option) => setSelectedSupCompany(option)}
                    classNames={{
                      input: `w-fit`,
                    }}
                  />

                  <Select
                    placeholder="Filter By Jatuh Tempo"
                    data={[
                      {
                        label: "Sudah Jatuh Tempo",
                        value: "overdue",
                      },
                      {
                        label: "Dalam 3 Hari",
                        value: "next_3_days",
                      },
                      {
                        label: "Dalam 7 Hari",
                        value: "next_7_days",
                      },
                      {
                        label: "Lebih dari 7 Hari",
                        value: "upcoming",
                      },
                    ]}
                    value={filterJatuhTempo ? filterJatuhTempo.value : null}
                    onChange={(_value, option) => setFilterJatuhTempo(option)}
                    classNames={{
                      input: `w-fit`,
                    }}
                  />

                  <Select
                    placeholder="Filter By Status Pembayaran"
                    data={[
                      {
                        label: "Sudah Bayar",
                        value: "paid",
                      },
                      {
                        label: "Belum Bayar",
                        value: "unpaid",
                      },
                    ]}
                    value={filterPaid ? filterPaid.value : null}
                    onChange={(_value, option) => setFilterPaid(option)}
                    classNames={{
                      input: `w-fit`,
                    }}
                  />
                </>
              }
            />
          )}
        </Tabs.Panel>

        <Tabs.Panel value="supplier-communities">
          <SupplierCommunityPanel />
        </Tabs.Panel>
      </Tabs>
    </Stack>
  );
};

export default SupplierEmployeePage;
