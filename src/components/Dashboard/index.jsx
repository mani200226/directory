import { useEffect, useState } from "react";
import SearchBar from "../SearchBar";
import UserTable from "../UserTable";
import "./index.css";

function Dashboard() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [sortConfig, setSortConfig] = useState({
    key: "",
    direction: "asc",
  });

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(res => res.json())
      .then(data => setUsers(data));
  }, []);

  // Search
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(search.toLowerCase()) ||
    user.email.toLowerCase().includes(search.toLowerCase())
  );

  // Sort
  const sortedUsers = [...filteredUsers].sort((a, b) => {
    if (!sortConfig.key) return 0;

    let aVal =
      sortConfig.key === "company"
        ? a.company.name
        : a[sortConfig.key];

    let bVal =
      sortConfig.key === "company"
        ? b.company.name
        : b[sortConfig.key];

    if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1;
    if (aVal > bVal) return sortConfig.direction === "asc" ? 1 : -1;
    return 0;
  });

  const handleSort = key => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  return (
    <div className="dashboard">
      <h2>User Directory</h2>

      <SearchBar search={search} setSearch={setSearch} />

      <UserTable users={sortedUsers} onSort={handleSort} />
    </div>
  );
}

export default Dashboard;