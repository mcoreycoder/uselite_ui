// const formMaker = formInput => {
//   // console.log('formInput', formInput)
//   let getKeys = objInput =>
//     Object.keys(objInput).map(key => {
//         // console.log(`getKey()  key: ${key} `)
//       return key
//     })

// //   let sections = getKeys(formInput)
// //   let sectionElements = sections.map((section, index) => {
// //     let elements = getKeys(formInput[section]).map((el, index) => {
// //       let elBuilder = getKeys(formInput[section][el]).map((elHas, index) => {          console.log(`elHas : ${elHas}`)        })    })  })

// let sections = getKeys(formInput).map((section, index, arr) =>{
//     console.log(`section: ${section} `) //\n index: ${index} \n array: ${arr}
    
//     getKeys(formInput[section]).map(element => {
//         console.log(`- element: ${element}`)
        
//         getKeys(formInput[section][element]).map(elHas => {
//             console.log(`--  elHas: ${elHas}`)
//             //  elHas === 'attributes' ? getKeys(elHas) : console.log(`--  elHas: ${elHas}`)
//             // elHas = typeof formInput[section][element][elHas] === 'object' ? getKeys(elHas) : elHas
//             let myAtts= []

//             typeof formInput[section][element][elHas] === 'object' ? 
//             myAtts = getKeys(formInput[section][element][elHas]) : 
//             console.log(`---- content: ${formInput[section][element][elHas]}`)

//              typeof formInput[section][element][elHas] === 'object' ? 
//              console.log(`----    myAtts: ${ myAtts} `) : 
//              console.log(`--${formInput[section][element][elHas]}  elHas: ${typeof formInput[section][element][elHas]}`)

//         })//end elHas map

//     }) //end of element map

// })//end of section map()


//     } //end of formMaker


// const formMaker = formInput => {
//     // console.log('formInput', formInput)
//   let sections = Object.entries(formInput).map(section => {
//     console.log(`section`, section)
//     let elements = Object.entries(section[1]).map(element => {
//       console.log(`${element[0]}-element`, element[1].attributes)
//       let addAttributes = Object.entries(element[1].attributes).map(attribute =>{
//         console.log(`attribute`, attribute)

//       })
//     //   console.log(`parts`, parts)

//       return { [element[0]]: element[1] }
//     }) //end of elements.map
//     // console.log(`elements`, elements)

//     // let elementsMapped = elements.map(el => {
//     //     console.log(`elementsMapped el:`, el)
//     //     let elHas = Object.entries(el).map(has =>{
//     //         console.log(`elHas has:`, has[0])

//     //     })
//     //     console.log(`elementsMapped elHas:`, elHas)

//     //   return `makeElements`
//     // })
//     // console.log(`elementsMapped:`, elementsMapped)

//     return (
//       <div key={`${section[0]}-section`}>
//         {`${section[0]}-section`}
//         <br />
//         {/* {elementsMapped} */}
//       </div>
//     )
//   }) //end of sections.map
// //   console.log(`sections`, sections)
//   // return form
//   return <form>{sections.map(el => el)}</form>
// }

//this was a good start
export default function formMaker (formInput) {
    // console.log('formInput', formInput)
    let getKeys = objInput =>
      Object.keys(objInput).map(key => {
        // console.log(`getKey()  key: ${key} `)
        return key
      })
  
    let sections = getKeys(formInput).map((section, index, arr) => {
      console.log(`section: ${section} `) //\n index: ${index} \n array: ${arr}
  
      getKeys(formInput[section]).map(element => {
        console.log(`- element: ${element}`)
  
        getKeys(formInput[section][element]).map(elHas => {
          console.log(`--  elHas: ${elHas}`)
          //  elHas === 'attributes' ? getKeys(elHas) : console.log(`--  elHas: ${elHas}`)
          // elHas = typeof formInput[section][element][elHas] === 'object' ? getKeys(elHas) : elHas
          let myAtts = []
  
          typeof formInput[section][element][elHas] === 'object'
            ? (myAtts = getKeys(formInput[section][element][elHas]))
            : console.log(`---- content: ${formInput[section][element][elHas]}`)
  
          typeof formInput[section][element][elHas] === 'object'
            ? console.log(`----    myAtts: ${myAtts} `)
            : console.log(
                `--${
                  formInput[section][element][elHas]
                }  elHas: ${typeof formInput[section][element][elHas]}`
              )
        }) //end elHas map
      }) //end of element map
    }) //end of section map()
  } //end of formMaker
  