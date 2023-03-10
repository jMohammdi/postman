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
  let paramterStr = ''
  const setInputRequsetHandler = (event) => {
    const newParams = { id: uuidv4(), key: 'd', value: '', description: '' }
    const currentValue = inpref.current.value
    const findquery = /[?]+/.exec(currentValue)

    if (findquery !== null) {
      const indexofquery = findquery.index
      const currentQuery = findquery.input
      paramterStr = currentQuery.slice(indexofquery + 1)

      if (params.length === 0) {
        setParams([newParams, ...params])
      }

      splitParamsToTable(paramterStr)
    } else {
      params.splice(0, 1)
      console.log(params)
      setParams([...params])
    }
  }
  const splitParamsToTable = (paramsText) => {
    const allParams = paramsText
    const findquery = /[&]+/.exec(allParams)
    if (findquery !== null) {
      const paramsList = allParams.split('&')
      let item = { id: uuidv4(), key: '', value: '', description: '' }
      const allparamsClone = params
      paramsList.map((param, index) => {
        let isequal = /[=]+/.exec(param)
        if (isequal !== null) {
          const key = param.slice(0, isequal.index)
          const value = param.slice(isequal.index + 1)
          item = { id: uuidv4(), key, value, description: '', index }
          allparamsClone[index] = item
        } else {
          item = { id: uuidv4(), key: param, value: '', description: '', index }
          allparamsClone[index] = item
        }
      })
      setParams([...allparamsClone])
    } else {
      const isAddValue = /[=]+/.exec(allParams)
      let query = ''
      if (isAddValue) {
        const indexofquery = isAddValue.index
        const currentQuery = isAddValue.input
        query = currentQuery.slice(indexofquery + 1)
      }
      const arrayOfParams = allParams.split('=')
      let objparams = {
        id: uuidv4(),
        key: arrayOfParams[0],
        value: query ? query : '',
        decription: '',
      }
      const allparamsArray = []
      allparamsArray.push(objparams)

      setParams([...allparamsArray])
    }
  }
  const setqueryHandler = (evt) => {
    if (evt.keyCode === 55) {
      const allparamsClone = params
      allparamsClone.push({
        id: uuidv4(),
        key: '',
        value: '',
        description: '',
      })
      setParams([...allparamsClone])
    }
    let rez = []
    const t = evt.target
    if (evt.keyCode === 8) {
      const deletedChar = t.value[t.selectionStart - 1]
      if (deletedChar === '&') {
        setTimeout(() => {
          const splitParametrs = paramterStr.split('&')
          console.log(splitParametrs)
          splitParametrs.map((param, index) => {
            let isEqual = /[=]+/.exec(param)
            if (isEqual !== null) {
              const key = param.slice(0, isEqual.index)
              const value = param.slice(isEqual.index + 1)
              const item = { id: uuidv4(), key, value, description: '' }
              rez.push(item)
            } else {
              let newParams = {
                id: uuidv4(),
                key: '',
                value: '',
                description: '',
              }
              rez.push(newParams)
            }
            setParams([...rez])
          })
        }, 1)
      }
    } else if (evt.keyCode === 46) {
      // for delete key
    }
  }
  return (
    <div>
      {/* input */}
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
