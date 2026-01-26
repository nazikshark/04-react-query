import toast, { Toaster } from 'react-hot-toast';
import s from './SearchBar.module.css';

interface SearchBarProps {
  onSubmit: (query: string) => void;
}

const SearchBar = ({ onSubmit }: SearchBarProps) => {
  const handleAction = (formData: FormData) => {
    const query = formData.get("query") as string;
    if (query.trim() === "") {
      toast.error("Please enter a search term!");
      return;
    }
    onSubmit(query.trim());
  };

  return (
    <header className={s.header}>
      <form action={handleAction} className={s.form}>
        <input name="query" type="text" className={s.input} placeholder="Search movies..." autoFocus />
        <button type="submit" className={s.button}>Search</button>
      </form>
      <Toaster />
    </header>
  );
};

export default SearchBar;