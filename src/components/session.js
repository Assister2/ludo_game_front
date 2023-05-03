export default function getHeader() {
  const header = new Headers();
  header.append("Content-Type", "application/json");
  if (localStorage.getItem("id")) {
    header.append("id", localStorage.getItem("id"));
    header.append("key", localStorage.getItem("key"));
  }
  return header;
}
