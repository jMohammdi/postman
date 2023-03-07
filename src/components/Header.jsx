import React, { useRef } from 'react'
import { v4 as uuidv4 } from 'uuid'
const styles = {
  width: '500px',
  border: '1px solid red',
  outline: 'none',
  borderRadius: '5px',
  padding: '10px',
}
function Header({ params, setParams }) {
  const inpref = useRef()
  const newParams = { id: uuidv4(), key: '', value: '', description: '' }
  const setValueRequestInp = () => {}
  const setInputRequsetHandler = (event) => {
    if (event.which === 55) {
      const allparamsClone = params
      allparamsClone.push({
        id: uuidv4(),
        key: '',
        value: '',
        description: '',
      })
      setParams([...allparamsClone])
    }
    const currentValue = inpref.current.value
    const findquery = /[?]+/.exec(currentValue)

    if (findquery !== null) {
      const indexofquery = findquery.index
      const currentQuery = findquery.input
      const allParams = currentQuery.slice(indexofquery + 1)
      if (params.length === 1) {
        setParams([...params, newParams])
      }

      splitParamsToTable(allParams)
    } else {
      if (params.length > 1) {
        const allParams = params.splice(-1, 1)
        setParams(allParams)
      }
    }
  }

  const splitParamsToTable = (paramsText) => {
    const allParams = paramsText
    const findquery = /[&]+/.exec(allParams)
    if (findquery !== null) {
      const paramsList = allParams.split('&')
      paramsList.map((param, index) => {
        const [key, value] = param.split('=')
        const result = { id: uuidv4(), value, key, decription: '' }
        const allparamsClone = params
        allparamsClone[index] = result
        setParams([...allparamsClone])
      })
    } else {
      const isAddValue = /[=]+/.exec(allParams)
      if (isAddValue || allParams.length > 0) {
        const arrayOfParams = allParams.split('=')
        let objparams = {
          id: uuidv4(),
          key: arrayOfParams[0],
          value: arrayOfParams[1],
          decription: '',
        }
        const allparamsArray = []
        allparamsArray.push(objparams, {
          id: uuidv4(),
          key: '',
          value: '',
          description: '',
        })

        setParams([...allparamsArray])
      }
    }
  }
  const setqueryHandler = (evt) => {
    let rez = []
    const t = evt.target
    const inputValue = inpref.current.value
    if (evt.keyCode === 8) {
      const deletedChar = t.value[t.selectionStart - 1]
      if (deletedChar === '&') {
        setTimeout(() => {
          const splitValue = inpref.current.value.split('&')
          splitValue.map((list, index) => {
            let isequal = /[=]+/.exec(list)
            if (isequal !== null) {
              const key = list.slice(0, isequal.index)
              const value = list.slice(isequal.index + 1)
              const item = { key, value, description: '', index }
              rez.push(item)
            }
            setParams(rez)
          })
        }, 1)
      }
    } else if (evt.keyCode === 46) {
      // for delete key
      console.log(t.value[t.selectionStart])
    }
  }
  return (
    <div>
      <input
        ref={inpref}
        onChange={(event) => setInputRequsetHandler(event)}
        style={styles}
        onKeyDown={(event) => setqueryHandler(event)}
      />
    </div>
  )
}

export default Header
