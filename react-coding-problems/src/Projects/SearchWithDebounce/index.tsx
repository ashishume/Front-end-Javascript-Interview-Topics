import axios from "axios";
import { useEffect, useState } from "react";
const useDebounce = (value, delay = 300) => {

  const [debouncedValue, setDebouncedValue] = useState('')
  let timer
  useEffect(() => {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)
    return () => clearTimeout(timer)
  }, [value])
  return debouncedValue
}

const Search = () => {
  const [search, setSearch] = useState('')
  const [data, setData] = useState([])
  const debouncedValue = useDebounce(search)
  useEffect(() => {
    if (debouncedValue) {
      axios.get(`https://jsonplaceholder.typicode.com/comments?q=${debouncedValue}`).then(value => {
        setData(value.data)
      })
    }
  }, [debouncedValue])

  const handleChange = (e) => {
    setSearch(e.target.value)
  }

  return <>
    <input placeholder="enter search term..." onChange={handleChange} className="p-1 " />
    <div className="container bg-white p-2 mt-6 w-[200px] max-h-[500px]">
      {
        data.map(({ name, id, email }) => {
          return <div key={id}>
            {name}
          </div>
        })
      }
    </div>
  </>
};

export default Search;
