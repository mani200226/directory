import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./index.css";

function UserDetail() {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then(res => res.json())
      .then(data => setUser(data));
  }, [id]);

  if (!user) return <p>Loading...</p>;

  return (
    <div className="user-detail">
      <h2>{user.name}</h2>

      <p><b>Email:</b> {user.email}</p>
      <p><b>Phone:</b> {user.phone}</p>
      <p><b>Username:</b> {user.username}</p>

      <h3>Address</h3>
      <p>{user.address.street}, {user.address.city}</p>

      <h3>Company</h3>
      <p>{user.company.name}</p>
      <p>{user.company.catchPhrase}</p>
    </div>
  );
}

export default UserDetail;