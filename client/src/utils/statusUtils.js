export function getStatusClass(status) {
  switch (status) {
    case "New":
      return "client-status-new";
    case "Active":
      return "client-status-active";
    case "Closed":
      return "client-status-closed";
    case "Waiting":
      return "client-status-waiting";
    default:
      return "client-status-new";
  }
}
