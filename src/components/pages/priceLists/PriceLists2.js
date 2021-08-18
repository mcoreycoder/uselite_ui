import React, { useState, useEffect } from 'react'
import apiCaller from '../../functions/apiCaller'

let getPriceLists = () =>
  apiCaller({ route: `/sheets/pricelists`, method: `GET` })
let getProductData = brandsArr =>
  apiCaller({ route: `/sheets/products/?brands=${brandsArr}`, method: `GET` })
let getProductVariantData = () =>
  apiCaller({ route: `/sheets/variants`, method: `GET` })

export default function PriceLists () {
  const [priceLists, setPriceLists] = useState(['priceLists'])
  const [productList, setProducts] = useState(['productList'])

  const [selectedPriceLists, setSelectedPriceLists] = useState([`selectedPriceLists`])
  const [showBrands, setShowBrands] = useState([`showBrands`])
  const [hideBrands, setHideBrands] = useState([`hideBrands`])

  const [selectedProduct, setProduct] = useState(['selectedProduct'])
  const [optionList, setItem] = useState(['optionList'])

  let addSelectedPriceList = brand => {
    let updateList =
      selectedPriceLists[0] === `selectedPriceLists`
        ? [brand]
        : [...selectedPriceLists, brand]
    setSelectedPriceLists(updateList)
  }

  let clearSelectedPriceList = brand => {
    setProducts('productList')

    setSelectedPriceLists('selectedPriceLists')
    setShowBrands('showBrands')
    setHideBrands('hideBrands')

  }

  let sendPriceListSelections = async selectedBrands => {
    selectedBrands.forEach(selectedBrand =>
      console.log(`selectedBrand: ${selectedBrand}`)
    )
    let submitBrands = []

    selectedBrands.map(brand => {
      let foundBrandInProductList = productList.find(el => el.brand === brand)
      if (foundBrandInProductList === undefined) {
        console.log(`check4brand result: ${foundBrandInProductList}`)
        return (submitBrands = [...submitBrands, brand])
      } else {
        console.log(`don't submit brand ${brand}`)
      }
    })

    submitBrands.forEach(submitBrand =>
      console.log(`submitBrand: ${submitBrand}`)
    )

    await getProductData(selectedBrands)
      .then(res => {
        let addNewProductList = [...productList, ...res]
        productList[0] === 'productList'
          ? setProducts(res)
          : setProducts(addNewProductList)
      })
      .then(res => setShowBrands([...selectedBrands]))
  }

  let mapPriceLists = arr => {
    let brandsMapped = arr.map((brand, i) => {
      return (
        <div key={i}>
          <button
            onClick={e => {
              e.preventDefault()
              // console.log(`selectedPriceLists is: ${selectedPriceLists}`)
              // console.log(`adding to list: ${brand.brand}`)
              addSelectedPriceList(brand.brand)
            }}
          >
            {brand.brand}
          </button>
        </div>
      )
    })

    return brandsMapped
  }

  /*
  // let hideSelectedPriceList = brand => {
  //   console.log(`67 hideSelectedPriceList 'brand': ${brand}`)
  //   console.log(
  //     `68 productList.find(el => el.brand === brand)': ${productList.find(
  //       el => el.brand === brand
  //     )}`
  //   )
  //   let foundBrandinProductList =
  //     productList[0] === `productList`
  //       ? [{ brand: `productList` }]
  //       : productList.find(el => el.brand === brand) !== undefined
  //       ? productList.find(el => el.brand === brand)
  //       : [{ brand: `productList` }]
  //   console.log(
  //     `line 73 foundBrandinProductList:${foundBrandinProductList.brand}`
  //   )
  //   if (brand === showBrands.find(el => el === brand)) {
  //     console.log(
  //       `'hide items' button clicked: productList.find(el => el.brand === brand): ${foundBrandinProductList.brand}`
  //     )
  //     // if button shows 'hide items'
  //     setShowBrands(showBrands.filter(el => el !== brand))
  //   } else {
  //     // if button shows 'view items'
  //     brand === foundBrandinProductList.brand
  //       ? setShowBrands([...showBrands, brand])
  //       : sendPriceListSelections([brand]).then(res =>
  //           setShowBrands([...showBrands, brand])
  //         )
  //   }
  // }
  */

  let displayBrand = brand => {
    console.log(`view/hide button clicked on Brand: ${brand}`)
    let foundBrandinProductList = productList.find(el => el.brand === brand) // returns undefined or the first product object it matches
    let isShowing = showBrands.find(el => el === brand)

    let hideSelectedPriceList = async brand => { // removes from showBrands and adds to hideBrands
      console.log(`called hideSelectedPriceList`)
      setShowBrands(showBrands.filter(el => el !== brand))
      return setHideBrands([...hideBrands, brand])
    }

    let showSelectedPriceList = brand => { // checks to see if product data was already fetched and if not gets data, or toggles brand from hideBrands to showBrands
      // brand === foundBrandinProductList.brand
      //   ? setShowBrands([...showBrands, brand]).then(setHideBrands(hideBrands.filter(el => el !== brand))) 
      //   : sendPriceListSelections([brand]).then(res =>
      //       setShowBrands([...showBrands, brand])
      //     )
      console.log(`called showSelectedPriceList`)
      let toggleHideToShow = (brand)=> {
        console.log(`called toggleHideToShow`)
        setHideBrands(hideBrands.filter(el => el === brand))
        return setShowBrands([...showBrands, brand]);
      }

      foundBrandinProductList === undefined ? sendPriceListSelections([brand]).then(res => toggleHideToShow(brand)) : toggleHideToShow(brand)
    }

    if(isShowing === undefined){
      console.log(`calling showSelectedPriceList`)
      showSelectedPriceList(brand)
    }
    console.log(`calling hideSelectedPriceList`)
    hideSelectedPriceList(brand)

    
  }

  let mapSelectionLists = arr => {
    let brandsMapped = arr.map((brand, i) => {
      return (
        <div key={i}>
          {brand}
          <button
            onClick={e => {
              e.preventDefault()
              // hideSelectedPriceList(brand)
              displayBrand(brand)
            }}
          >
            {selectedPriceLists[0] === 'selectedPriceLists'
              ? null
              : brand === showBrands.find(el => el === brand)
              ? `Hide Items`
              : `View Items`}
          </button>
        </div>
      )
    })

    return brandsMapped
  }

  let mapProductList = arr => {
    let ProductsMapped = arr.map((product, i) => {
      return (
        <div key={i}>
          <p
            onClick={() => {
              console.log(
                `${product.price_parent_sku} ${product.price_product_name}`
              )
              // getProductVariantData(product).then(res => setItem(res))
            }}
          >{`${product.price_parent_sku} ${product.price_product_name}`}</p>
        </div>
      )
    })

    return ProductsMapped
  }

  let displayPriceList = mapPriceLists(priceLists)
  let displaySelectedPriceList = mapSelectionLists(selectedPriceLists)

  // let displayProductList = mapProductList(productList.filter(item => item.brand === "Arc'teryx")) //works
  let displayProductList = mapProductList(
    productList.filter(
      item => item.brand === showBrands.find(brand => brand === item.brand)
    )
  ) //seems to work

  useEffect(() => {
    let mounted = true
    // // implement to make call and get price list when component is rendering
    // getPriceLists().then(response => {
    //   if (mounted) {
    //     setPriceLists(response)
    //   }
    // })
    return () => (mounted = false)
  }, [])

  return (
    <div>
      <h2
        onClick={e => {
          e.preventDefault()
          getPriceLists().then(response => {
            setPriceLists(response)
          })
        }}
      >
        Price Lists
      </h2>
      <div>
        {selectedPriceLists[0] === 'selectedPriceLists' ? null : (
          <div>
            Selected:
            {displaySelectedPriceList}
            <button
              onClick={e => {
                e.preventDefault()
                console.log(`Submitting brands : ${selectedPriceLists}`)
                sendPriceListSelections(selectedPriceLists)
              }}
            >
              Submit List
            </button>
            <button
              onClick={e => {
                e.preventDefault()
                clearSelectedPriceList(`clearAll`)
              }}
            >
              Clear List
            </button>
          </div>
        )}
      </div>
      {/* <p>
        {selectedProduct[0] === 'Test'
          ? null
          : `${selectedProduct[0].upc_parent_sku} ${selectedProduct[0].upc_productname}`}
      </p> */}
      <hr />
      Select Price Lists
      {displayPriceList}
      <hr />
      {productList[0] === 'productList' ? null : displayProductList}
    </div>
  )
}
