import styles from "./SearchBar.module.scss";
import { LuSearch } from "react-icons/lu";
import { Input, InputGroup } from "@chakra-ui/react";
import { STRINGS } from "@shared/constants/strings";

export const SearchBar = () => {
  return (
    <div className={styles.searchBar}>
      <InputGroup
        flex="1"
        startElement={
          <span className={styles.iconWrapper}>
            <LuSearch className={styles.searchIcon} />
          </span>
        }
        className={styles.inputGroup}
      >
        <Input
          placeholder={STRINGS.searchContactsPlaceholder}
          className={styles.searchInput}
        />
      </InputGroup>
    </div>
  );
};
