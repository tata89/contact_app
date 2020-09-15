import React, { useState, useEffect } from 'react';
import './App.css';
import Typography from "@material-ui/core/Typography";
import Searchbar from "./components/searchbar/search"
import UseTbl from "./components/table_cards/userdata"
import axios from "axios"
const App = () => {
  const [search_res, setsearchres] = useState(null);
  useEffect(() => {
    async function getdata() {
      const user = await axios.get(`http://localhost:3030/api/user_data`);
      var res_data = user.data;
      setsearchres(res_data);
      console.log(res_data);
    }
    getdata();
  }, []);
  const handleSearch = (e) => {
    setsearchres(null)
    let search_data = e.target.value;
    let userCapitalized = search_data.charAt(0).toUpperCase() + search_data.slice(1)
    searchData(userCapitalized)
  };
  async function searchData(search_data) {
    const user = await axios.get(`http://localhost:3030/api/user_data?usr=${search_data}`);
    const res_data = user.data;
    setsearchres(res_data);
  }
  return (
    <React.Fragment>
      <Searchbar handleSearch={handleSearch} />
      <Typography variant="h4" className="title">
        Contacts
    </Typography>
      {
        search_res !== null ? <UseTbl user_data={search_res} /> : "Loading...."
      }
    </React.Fragment>
  );
}

export default App;

