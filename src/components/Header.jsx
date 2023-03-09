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

  const setInputRequsetHandler = (event) => {
    const currentValue = inpref.current.value
    const findquery = /[?]+/.exec(currentValue)
    if (findquery !== null) {
      const indexofquery = findquery.index
      const currentQuery = findquery.input
      const allParams = currentQuery.slice(indexofquery + 1)
      if (params.length === 0) {
        setParams([...params, newParams])
      }
      splitParamsToTable(allParams)
    } else {
      if (params.length === 1) {
        const allParams = params.splice(-1, 1)
        console.log(allParams)
        setParams([])
      }
    }
  }

  const splitParamsToTable = (paramsText) => {
    const allParams = paramsText
    const findquery = /[&]+/.exec(allParams)
    if (findquery !== null) {
      const paramsList = allParams.split('&')
      paramsList.map((param) => {
        const isAddEqual = /[=]+/.exec(param)
        let key = param
        if (isAddEqual) {
          key = param.slice(0, isAddEqual.index)
          const value = param.slice(isAddEqual.index + 1)
          let allParams = params
          let newParam = { id: uuidv4, key, value, description: '' }
          setParams([...allParams, newParam])
        }
      })
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
  const isremoveAndHandler = (evt) => {
    let rez = []
    const t = evt.target
    if (evt.keyCode === 8) {
      const deletedChar = t.value[t.selectionStart - 1]
      if (deletedChar === '&') {
        setTimeout(() => {
          const findquery = /[?]+/.exec(inpref.current.value)
          if (findquery) {
            const splitValue = inpref.current.value
              .slice(findquery.index + 1)
              .split('&')
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
          }
        }, 1)
      }
    } else if (evt.keyCode === 46) {
      // for delete key
      console.log(t.value[t.selectionStart])
    }

    // if add & to url add new key and value
    if (evt.which === 55) {
      const allparamsClone = params
      allparamsClone.push({
        id: uuidv4(),
        key: '',
        value: '',
        description: '',
      })
      setParams([...allparamsClone])
    }
  }
  return (
    <div>
      <input
        ref={inpref}
        onChange={(event) => setInputRequsetHandler(event)}
        style={styles}
        onKeyDown={(event) => isremoveAndHandler(event)}
      />
    </div>
  )
}

export default Header
