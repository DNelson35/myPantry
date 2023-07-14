import { useState, useEffect } from 'react'

function useSearch(user, items) {
    const [filteredItems, setFilteredItems] = useState()
    const [search, setSearch] = useState('')
    const [itemSearch, setItemSearch] = useState('')
    const [filterItemsList, setFilterItemsList] = useState([])
    
    useEffect(() => {
        if(user && search === ''){
          setFilteredItems(user.user_items);
        } else if(user) {
          setFilteredItems(user.user_items.filter(item => item.name.toLowerCase().includes(search.toLowerCase())))
        }
    },[search, user])
  
    useEffect(() => {
        if(items && itemSearch === ''){
            setFilterItemsList(items)
        } else if(items){
            setFilterItemsList(items.filter(item => item.name.toLowerCase().includes(itemSearch.toLowerCase())))
        }
    },[itemSearch, items])

  return {filterItemsList, filteredItems, search, setSearch, itemSearch, setItemSearch}
}

export default useSearch