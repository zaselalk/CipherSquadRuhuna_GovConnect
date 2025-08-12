import { Button, Checkbox, Modal, Form } from "antd";
import { FC } from "react";
import { PermissionCardTitle } from "./components/PermissionCardTitle";

interface PermissionCardProps {
  title: string;
  permissions: string[];
}

const permissionCardStyle: React.CSSProperties = {
  marginBottom: "2rem",
  padding: "1rem",
  border: "1px solid #d9d9d9",
  borderRadius: "8px",
};

const permissionGridStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
  gap: "1rem",
};

const cardHeaderStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "1rem",
};

const buttonGroupStyle: React.CSSProperties = {
  display: "flex",
  gap: "0.5rem",
};

/**
 * PermissionCard component displays a card with a title and a list of permissions as checkboxes.
 * @param title - The title of the permission card.
 * @param permissions - An array of permission strings to be displayed as checkboxes.
 */

export const PermissionCard: FC<PermissionCardProps> = ({
  title,
  permissions,
}) => {
  const form = Form.useFormInstance();

  /**
   * Get currently selected permissions from the form
   */
  const getCurrentPermissions = (): string[] => {
    return form.getFieldValue("permission") || [];
  };

  /**
   * Handle selecting all permissions for this group with confirmation
   */
  const handleSelectAll = () => {
    Modal.confirm({
      title: `Select All ${title} Permissions`,
      content: `Are you sure you want to select all permissions for ${title}? This will include: ${permissions
        .map((p) => p.split(":")[1])
        .join(", ")}.`,
      okText: "Yes, Select All",
      cancelText: "Cancel",
      onOk: () => {
        const currentPermissions = getCurrentPermissions();
        const updatedPermissions = Array.from(
          new Set([...currentPermissions, ...permissions])
        );
        form.setFieldsValue({ permission: updatedPermissions });
      },
    });
  };

  /**
   * Handle unselecting all permissions for this group
   */

  return (
    <div style={permissionCardStyle}>
      <div style={cardHeaderStyle}>
        <PermissionCardTitle title={title} />
        <div style={buttonGroupStyle}>
          <Button size="small" onClick={handleSelectAll} type="primary">
            Select All
          </Button>
        </div>
      </div>
      <div style={permissionGridStyle}>
        {permissions.map((perm) => (
          <Checkbox key={perm} value={perm}>
            {perm.split(":")[1]}
          </Checkbox>
        ))}
      </div>
    </div>
  );
};
