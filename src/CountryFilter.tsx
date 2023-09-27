import { FC } from "react";
import { Nationalities } from "./types/User";
import styles from "./CountryFilter.module.scss";

const CountryFilter: FC<{
  onSelect: (nationalities: Nationalities) => void
  nationalities: Nationalities
  disabled: boolean
}> = (props) => {
  return (
    <fieldset className={styles.fieldset}>
      <div className="flex-row flex-gap-sm">
        {Object.values(props.nationalities).map((nat) => {
          return (
            // Submitted: missing key
            // <div className="flex-row flex-align-center">
            // Edited: key added
            <div key={nat.code} className="flex-row flex-align-center">
              <label htmlFor={nat.code}>{nat.code}</label>
              <input
                type="checkbox"
                className={styles.checkbox}
                key={nat.code}
                id={nat.code}
                name={nat.name}
                checked={nat.selected}
                disabled={props.disabled}
                onChange={() => props.onSelect({
                  ...props.nationalities,
                  [nat.code]: {
                    ...nat,
                    selected: !nat.selected,
                  },
                })}
              />
            </div>
          );
        })}
      </div>
    </fieldset>
  );
};

export default CountryFilter;
