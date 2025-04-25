import styles from "./Search.module.scss";
import SearchIcon from "/searchIcon.svg";

interface SearchProps {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}

export const Search: React.FC<SearchProps> = ({ setSearch, search }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };
  const handleButton = () => {
    setSearch("");
  };

  return (
    <div className={styles.search}>
      <img src={SearchIcon}></img>
      <input
        className={styles.input}
        placeholder="Search"
        value={search}
        onChange={handleChange}
      ></input>
      {search && (
        <button className={styles.resetBtn} onClick={handleButton}></button>
      )}
    </div>
  );
};
