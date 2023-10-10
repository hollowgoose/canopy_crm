export function getStatusClass(status) {
  switch (status) {
    case "New":
      return "client-status-new";
    case "Active":
      return "client-status-active";
    case "Closed":
      return "client-status-closed";
    default:
      return "client-status-new";
  }
}
