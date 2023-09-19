import React, { useState, useEffect } from "react";
import Table from "./Table";
import styles from "./App.module.scss";
import CountryFilter from "./CountryFilter";
import { Nationalities, Users } from "./types/User";
import { APIResponse } from "./types/Client";
import Header from "./Header";
import { countries } from "./constants";

const url = "https://randomuser.me/api/";

const getSearchParams = (nats: string[]) =>
  new URLSearchParams({
    results: "10",
    inc: "name,phone,cell,location,dob,login,nat",
    nat: nats.join(),
  });

const getInitialNationalitiesState = () => {
  return countries.reduce((countries, country) => {
    return {
      ...countries,
      [country.value]: {
        code: country.value,
        name: country.label,
        selected: true,
      },
    };
  }, {});
};

function App() {
  // Both states could be merged into a reducer
  const [users, setUsers] = useState<Users>([]);
  const [nationalities, setNationalities] = useState<Nationalities>(
    getInitialNationalitiesState,
  );

  useEffect(() => {
    let ignore = false;
    const selected = Object.values(nationalities).filter((nat) => nat.selected);
    const getData = async () => {
      const params = getSearchParams(selected.map((nat) => nat.code));
      let data: APIResponse;
      const response = await fetch(`${url}?${params}`);
      if (response && response.ok) {
        data = await response.json();
        // Submitted: Not using ignore or checking data
        // setUsers(data.results);
        // Edited: null check check an check ignore for unmounting
        if (data && !ignore) setUsers(data.results);
      }
      // Need to handle API error https://randomuser.me/documentation#errors
    };

    if (selected.length) {
      // could use useTransition or state to unblock the UI between requests
      getData();
    } else {
      // Empty out user state when all filters unchecked
      setUsers([]);
    }
    return () => {
      ignore = true;
    };
  }, [nationalities]);

  return (
    <div className={styles.app}>
      <Header />
      <CountryFilter
        nationalities={nationalities}
        onSelect={setNationalities}
      />
      <Table data={users} />
    </div>
  );
}

export default App;
