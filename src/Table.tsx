import { FC, memo } from "react";
import getAgeGroup from "./helpers/ageGroup";
import styles from "./Table.module.scss";
import { User, Users } from "./types/User";

const Table: FC<{ users: Users }> = memo((props) => {
  return (
    <div className={styles.table}>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Contact</th>
            <th>Age Group</th>
            <th>Country</th>
          </tr>
        </thead>
        <tbody>
          {/* Add placeholder rows for during fetch */}
          {props.users && props.users?.map((user: User) => {
            const ageGroup = getAgeGroup(user.dob.age);
            return (
              <tr key={user.login.uuid}>
                <td>
                  <div>
                    {user.name.first} {user.name.last}
                  </div>
                </td>
                <td style={{ width: "30%" }}>
                  <div className="flex-column">
                    <span>{user.phone}</span>
                    <span>{user.cell}</span>
                  </div>
                </td>
                <td>
                  <div className={`${styles.ageGroup}`}>
                    <div
                      className={`${styles.dotColor}`}
                      style={{ backgroundColor: ageGroup?.color }}
                    />
                    <div>{ageGroup?.label}</div>
                  </div>
                </td>
                <td>
                  <div>{user.location.country}</div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {props.users && props.users?.length ? null : (
        <div className={`${styles.noData} flex-row flex-center`}>
          No items to show
        </div>
      )}
    </div>
  );
});

export default Table;
