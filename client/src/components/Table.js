import React from 'react'
import { useLocation } from 'react-router-dom'
import TableRow from './TableRow'

function Table({ data, items, setItems }) {
  const location = useLocation()
  const tableHeaders = Object.keys(data[0]).map(key => <th scope="col" key={key} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{key}</th>)

  const tableRows = data.map((itemObj, index) => <TableRow itemObj={itemObj} key={index} items={items} setItems={setItems}/>)

  return (
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {tableHeaders}
                  { (location.pathname === '/')? <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Edit</th>: null}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {tableRows}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Table