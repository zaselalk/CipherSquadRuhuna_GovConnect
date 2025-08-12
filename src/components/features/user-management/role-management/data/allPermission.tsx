const allPermissions = [
  {
    group: "Clinic",
    perms: ["clinic:create", "clinic:edit", "clinic:delete", "clinic:view"],
  },
  {
    group: "Disease",
    perms: ["disease:create", "disease:edit", "disease:delete", "disease:view"],
  },
  {
    group: "Division",
    perms: [
      "division:create",
      "division:edit",
      "division:delete",
      "division:view",
    ],
  },
  {
    group: "HouseHold",
    perms: [
      "household:create",
      "household:edit",
      "household:delete",
      "household:view",
    ],
  },
  {
    group: "Resident",
    perms: [
      "resident:create",
      "resident:edit",
      "resident:delete",
      "resident:view",
    ],
  },
  {
    group: "Clinic Session",
    perms: [
      "clinicSession:create",
      "clinicSession:edit",
      "clinicSession:delete",
      "clinicSession:view",
    ],
  },
];

export default allPermissions;
