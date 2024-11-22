import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Book from "../book/Book";

const User = () => {  
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        throw new Error("Test Error");
        const res = await axios.get(
          `http://192.168.29.119:5050/api/get-user/${id}`
        );
        setUser(res?.data?.user);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setLoading(false);
        // REMOVE AFTER TESTING
        setUser({
          name: "John Doe",
          age: 25,
          message: "Happy Birthday!",
        });
      }
    };

    fetchUser();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>User not found.</div>;
  }

  return (
    <div>
      {/* <h1>User Details</h1>
      <p>Name: {user.name}</p>
      <p>Age: {user.age}</p>
      <p>Message: {user.message}</p> */}

      <Book age={user?.age} message={user.message} name={user.name} />
    </div>
  );
};

export default User;
