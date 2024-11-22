import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Book from "../book/Book";
import Confetti from "react-confetti";

const User = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { width } = window.innerWidth;
  const { height } = window.innerHeight;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(
          `http://192.168.29.119:5050/api/get-user/${id}`
        );
        setUser(res?.data?.user);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setLoading(false);
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
      <Confetti width={width} height={height} />
      {/* <h1>User Details</h1>
      <p>Name: {user.name}</p>
      <p>Age: {user.age}</p>
      <p>Message: {user.message}</p> */}

      <Book age={user?.age} message={user.message} name={user.name} />
    </div>
  );
};

export default User;
