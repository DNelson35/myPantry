import React from 'react'

function Table({ data }) {

  const tableHeaders = data? Object.keys(data[0]).map(key => {
    if (key !== 'image_url') {
     return <th scope="col" key={key} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{key}</th>
    } else {
      return null
    }
  }): null

  const tableRows = data?.map(item => (
    <tr key={item.id}>
      {Object.entries(item).map(set => {
        if(set[0] !== 'image_url') {
          return(
            <td className="px-6 py-4 whitespace-nowrap" key={`${set}`}>
              <div className="text-sm text-gray-900">{set[1]}</div>
            </td>
          )
        } else {
          return null
        }}
      )}
      {/* <button>✏️</button>
      <button>🗑️</button> */}
    </tr>
  ))

  return (
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {tableHeaders}
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