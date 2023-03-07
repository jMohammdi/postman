import React, { useEffect } from 'react'
const style = {
  padding: '5px',
  margin: '5px',
  outline: 'none',
}
function Body({ setParams, params }) {
  const removeParams = (id) => {
    const allParams = params.filter((params) => params.id !== id)
    setParams(allParams)
  }
  const updateParamsHander = (value, type, id) => {
    const allPasrams = params
    const findParams = allPasrams.findIndex((param) => param.id === id)
    allPasrams[findParams][type] = value
    setParams(allPasrams)
  }
  useEffect(() => {}, [params])
  return (
    <div>
      {params.map((param) => (
        <div key={param.id}>
          <input
            type="text"
            placeholder="key"
            style={style}
            defaultValue={param.key}
            onChange={(event) =>
              updateParamsHander(event.target.value, 'key', param.id)
            }
          />
          <input
            type="text"
            placeholder="value"
            style={style}
            defaultValue={param.value ? param.value : ''}
            onChange={(event) =>
              updateParamsHander(event.target.value, 'value', param.id)
            }
          />
          <input
            type="text"
            placeholder="des"
            style={style}
            defaultValue={param.description ? param.description : ''}
            onChange={(event) =>
              updateParamsHander(event.target.value, 'description', param.id)
            }
          />
          {params.length !== 1 && (
            <button style={style} onClick={() => removeParams(param.id)}>
              حذف
            </button>
          )}
        </div>
      ))}
    </div>
  )
}

export default Body
