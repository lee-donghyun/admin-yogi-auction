export const getMenus = (depth1: string): { key: string; name: string }[] => {
  switch (depth1) {
    case "item":
      return [
        { key: "manage", name: "관리" },
        { key: "register", name: "등록" },
      ];
    case "content":
      return [];
    case "user":
      return [{ key: "manage", name: "관리" }];
    case "transaction":
      return [{ key: "manage", name: "관리" }];
    case "dashboard":
      return [];
    default:
      return [];
  }
};
