import React from 'react'

const formStyle = {
  magin: '10px',
  border: 'solid 6px',
  padding: '5px',
  display: 'flex',
  alignItems: 'flex-start',
//   flexDirection: 'column',
  flexWrap: 'wrap',
//   justifyContent: 'space-between'
}
const sectionStyle = {
  magin: '1px',
  border: 'solid blue 4px',
  padding: '1px',
  display: 'flex',
  justifyContent: 'left',
  flexDirection: 'row',
  alignItems: 'flex-start',
  flex: '1 1 auto'
}

const labelStyle = {
  magin: '10px',
  border: 'solid yellow 2px',
  padding: '5px',
//   justifyContent: 'left'
}

const inputStyle = {
  magin: '10px',
  border: 'solid green 2px',
  padding: '5px',
//   flexDirection: 'row-reverse',
}

export default function formMaker (formInput) {
  let getKeys = objInput =>
    Object.keys(objInput).map(key => {
      // console.log(`getKey()  key: ${key} \n value: ${objInput[key]}`)
      return key
    })
  // console.log(`form sections: ${getKeys(formInput)}`)

  let makeSections = getKeys(formInput).map(section => {
    // console.log(`${section} section:`,  formInput[section])
    let sectionElements = getKeys(formInput[section]).map(el => {
      //   console.log(`el:`, el)
      let elContent = formInput[section][el].content
      let elAtts =
        el === `input`
          ? {
              key: `${section}-${el}`,
              style:  inputStyle 
            }
          : {
              key: `${section}-${el}`,
              style:  labelStyle,
              dangerouslySetInnerHTML: { __html: elContent }
            }

            elAtts = {...formInput[section][el].attributes, ...elAtts}

      // console.log(`elAtts:`, elAtts)
      // console.log(`elContent:`, elContent)
      let MyEl = React.createElement(el, elAtts)
      //   console.log(`myEl:`, MyEl)

      return MyEl
    }) //end of sectionElements map

    return (
      <div style={sectionStyle} key={section}>
        {sectionElements}
      </div>
    )
  }) //end of makeSection

  return <form style={formStyle}>{makeSections}</form>
} //end of formMaker
