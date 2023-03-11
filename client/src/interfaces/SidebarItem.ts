export interface SidebarItem {
  title: string;
  icon: string;
  to?: string;
  nested?: SidebarItem[];
}

export const getSidebarItems = (isAdmin: boolean): SidebarItem[] => {
  const items: SidebarItem[] = [
    {
      title: "Exams",
      icon: "fa-solid fa-folder-tree",
      to: "/exams",
    },
    {
      title: "Settings",
      icon: "fa-solid fa-gear",
      to: "/settings",
    },
  ];

  if (isAdmin) {
    items.push({
      title: "Users",
      icon: "fa-solid fa-users",
      to: "/users",
    });
    items.splice(3, 0, {
      title: "Create", // this is for admin users only
      icon: "fa-solid fa-square-plus",
      nested: [
        {
          title: "Create User",
          icon: "fa fa-user",
          to: "/create/user",
        },
        {
          title: "Create Exam",
          icon: "fa fa-file-invoice",
          to: "/create/exam",
        },
      ],
    });
  }

  return items;
};
