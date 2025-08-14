import { Table, Badge, Button } from "antd";

interface Shift {
  id: string;
  day: string;
  type: string;
}

interface Props {
  shifts: Shift[];
  onApply: (shift: Shift) => void;
}

const ShiftsTable = ({ shifts, onApply }: Props) => {
  const columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Day", dataIndex: "day", key: "day" },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      render: (type: string) => (
        <Badge color={type === "Day" ? "blue" : "orange"} text={type} />
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: Shift) => (
        <Button type="link" onClick={() => onApply(record)}>
          Apply
        </Button>
      ),
    },
  ];

  return <Table dataSource={shifts} columns={columns} pagination={false} rowKey="id" />;
};

export default ShiftsTable;
