import { useEffect, useState } from "react";
import axios from "axios"; // Import Axios

const useDate = () => {
  const addDays = (dateString, days) => {
    const date = new Date(dateString);
    date.setDate(date.getDate() + days);
    return date;
  };

  const addMonths = (date, months) => {
    const newDate = new Date(date);
    newDate.setMonth(newDate.getMonth() + months);
    return newDate;
  };

  return { addDays, addMonths };
};
const App = ({ name }) => {
  const [posts, setPosts] = useState([]);
  const { addDays, addMonths } = useDate();
  const newDate = addDays("10/10/2023", 22);
  const originalDate = new Date("10/10/2023");
  const updatedDate = addMonths(originalDate, 8);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/todos"
        );
        const data = response.data.map((item) => {
          // Check if you want to edit a specific line by some condition
          if (item.id === 1) {
            return {
              ...item,
              title: `This was a very interesting assignment`,
              // Add or modify other properties as needed
            };
          } else {
            // Leave other lines unchanged
            return item;
          }
        });
        console.log(data);
        setPosts(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData(); // Call the async function immediately.

    return () => {
      console.log(`I am unmounting`);
    };
  }, []);

  return (
    <section>
      <div>New Date: {newDate.toString()}</div>
      <br />
      <div>New Updated Date: {updatedDate.toString()}</div>
      <br />
      <div>
        {posts.map((post) => (
          <div
            style={{
              border: "1px dashed",
              marginBottom: "5px",
              marginLeft: "5px",
            }}
            key={post.id}
          >
            <p> {post.title}</p>
            <p>ID: {post.id}</p>
            {/* Add more properties as needed */}
          </div>
        ))}
      </div>
    </section>
  );
};
export default App;
