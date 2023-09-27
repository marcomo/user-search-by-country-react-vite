import { lazy, Suspense, useState, useTransition } from "react";
const Users = lazy(() => import("./Users"));
import styles from "./App.module.scss";
import Header from "./Header";
import ErrorBoundary from "./ErrorBoundary";
import { Nationalities } from "./types/User";
import CountryFilter from "./CountryFilter";
import { initNationalities, initParams } from "./constants";
import { APIResponse } from "./types/Client";
import promiseWrapper, { Resource } from "./helpers/promiseWrapper";
import { fetchUsers } from "./api";
import { getSearchParams } from "./helpers/getSearchParams";
import { getNationalitiesParam } from "./helpers/getNationalitiesParam";

const initialData = promiseWrapper<APIResponse>(fetchUsers(initParams))

function App() {
  const [nationalities, setNationalities] = useState<Nationalities>(() => initNationalities)
  const [resource, setResource] = useState<Resource<APIResponse>>(initialData);
  const [isPending, startTransition] = useTransition()

  const handleFilter = (nats: Nationalities) => {
    setNationalities(nats)
    startTransition(() => {
      const params = getSearchParams({ nat: getNationalitiesParam(nats) })
      setResource(promiseWrapper<APIResponse>(fetchUsers(params)))
    })
  }
  return (
    <div className={styles.app}>
      <Header />
      <CountryFilter onSelect={handleFilter} nationalities={nationalities} disabled={isPending} />
      <ErrorBoundary fallback="Error loading users.">
        <Suspense fallback="loading users…">
          <Users resource={resource} />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}

export default App;
