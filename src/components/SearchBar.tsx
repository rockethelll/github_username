import { FormEvent, useEffect, useRef, useState } from 'react';
import { useFetch } from '../utils/useFetch';

type SearchBarProps = {
  username: string;
  setUsername: (username: string) => void;
};

const SearchBar = ({ username, setUsername }: SearchBarProps) => {
  const [empty, setEmpty] = useState<boolean>(false);
  const [formError, setFormError] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const { error, isLoading } = useFetch(username);

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    setEmpty(false);
    e.preventDefault();
    const inputValue = inputRef.current?.value;
    if (!inputValue) {
      setEmpty(true);
      return;
    }
    if (inputValue) {
      setUsername(inputValue);
    }
    inputRef.current.value = '';
  };

  const resetErrorOnFocus = () => {
    setEmpty(false);
    setFormError(false);
  };

  // Update formError state based on fetchError
  useEffect(() => {
    if (error) {
      setFormError(true);
    }
  }, [error]);

  return (
    <>
      <form
        className='relative flex shadow-lg rounded-2xl bg-primary-lighter h-[60px] items-center justify-between mb-4 md:h-[80px] md:mb-6'
        onSubmit={handleSearch}
      >
        <img
          className='w-5 h-5 ml-4 md:h-6 md:w-6 md:ml-8'
          src='./assets/icon-search.svg'
          alt='Search icon'
        />
        <input
          ref={inputRef}
          className='w-4/5 pl-2 focus:outline-none bg-primary-lighter placeholder:text-secondary'
          type='text'
          placeholder='Search Github username...'
          name='search'
          onFocus={resetErrorOnFocus}
        />
        <div className='flex items-center gap-2'>
          {formError && <span className='w-24 text-sm font-bold text-red-500'>No results</span>}
          {empty && <span className='w-24 text-sm font-bold text-red-500'>Enter a username</span>}
          <button
            type='submit'
            className='bg-btn hover:bg-btn-hover text-white font-bold text-sm w-[84px] h-[46px] rounded-[10px] mr-2 md:mr-4 md:h-[50px] md:w-[106px] '
          >
            Search
          </button>
        </div>
      </form>
      {isLoading && <p>Loading...</p>}
    </>
  );
};

export default SearchBar;
