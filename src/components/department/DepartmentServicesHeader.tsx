import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const DepartmentServicesHeader = ({ openAddModal }: { openAddModal: () => void }) => (
  <div className="flex justify-between items-center mb-6">
    <h1 className="text-[#0052cc] text-2xl font-bold">Department Services</h1>
    <Button type="primary" icon={<PlusOutlined />} onClick={openAddModal}>
      Add Service
    </Button>
  </div>
);

export default DepartmentServicesHeader;
