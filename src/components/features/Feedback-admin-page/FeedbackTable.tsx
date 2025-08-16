
import { Table, Button } from "antd";

interface FeedbackTableProps<T> {
  data: T[];
  columns: any[];
  loading: boolean;
  onView: (record: T) => void;
  rowKey: string;
}

const FeedbackTable = <T extends { id: string | number }>({
  data,
  columns,
  loading,
  onView,
  rowKey,
}: FeedbackTableProps<T>) => {
  const modifiedColumns = [
    ...columns,
    {
      title: "Action",
      key: "action",
      render: (_: any, record: T) => (
        <Button type="primary" onClick={() => onView(record)}>
          View
        </Button>
      ),
    },
  ];

  return (
    <Table
      dataSource={data}
      columns={modifiedColumns}
      rowKey={(record) => (record as any)[rowKey]?.toString()}
      loading={loading}
      pagination={{ pageSize: 5 }}
    />
  );
};

export default FeedbackTable;
