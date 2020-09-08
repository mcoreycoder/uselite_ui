import React from 'react'

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
          ? { key: `${section}-${el}`, ...formInput[section][el].attributes }
          : {
              key: `${section}-${el}`,
              ...formInput[section][el].attributes,
              dangerouslySetInnerHTML: { __html: elContent }
            }
      // console.log(`elAtts:`, elAtts)
      // console.log(`elContent:`, elContent)
      let MyEl = React.createElement(el, elAtts)
    //   console.log(`myEl:`, MyEl)

      return MyEl
    })//end of sectionElements map

    return (
      <div key={section}>
        {sectionElements}
      </div>
    )
  }) //end of makeSection

  return (
    <form>
      {makeSections}
    </form>
  )
} //end of formMaker
