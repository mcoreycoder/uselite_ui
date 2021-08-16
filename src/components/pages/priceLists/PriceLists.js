import React, { useState, useEffect } from 'react'
import apiCaller from '../../functions/apiCaller'

let getPriceLists = () =>
  apiCaller({ route: `/sheets/pricelists`, method: `GET` })
let getProductData = brandsArr =>
  apiCaller({ route: `/sheets/products/?brands=${brandsArr}`, method: `GET` })
let getProductVariantData = () =>
  apiCaller({ route: `/sheets/variants`, method: `GET` })

export default function PriceLists () {
  const [priceLists, setPriceLists] = useState(['Test'])
  const [productList, setProducts] = useState(['Test'])

  const [selectedPriceLists, setSelectedPriceLists] = useState([`Test`])
  const [showBrands, setShowBrands] = useState([`Test`])

  const [selectedProduct, setProduct] = useState(['Test'])
  const [optionList, setItem] = useState(['Test'])

  let addSelectedPriceList = brand => {
    let updateList =
      selectedPriceLists[0] === `Test`
        ? [brand]
        : [...selectedPriceLists, brand]
    setSelectedPriceLists(updateList)
  }

  let clearSelectedPriceList = brand => {
    let update = [`Test`]
    setSelectedPriceLists(update)
    setProducts(update)
    setShowBrands(update)
  }

  let sendPriceListSelections = async selectedBrands => {

    await getProductData(selectedBrands).then(res => {
      let addNewProductList = [...productList, ...res]
      productList[0] === 'Test'
        ? setProducts(res)
        : setProducts(addNewProductList)
    }).then( res => setShowBrands([...selectedBrands]))
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

  let hideSelectedPriceList = brand => {
    console.log(`67 hideSelectedPriceList 'brand': ${brand}`)
    console.log(`68 productList.find(el => el.brand === brand)': ${productList.find(el => el.brand === brand)}`)
    let foundBrandinProductList =
      productList[0] === `Test`
        ? [{ brand: `Test` }]
        : productList.find(el => el.brand === brand) !== undefined ? productList.find(el => el.brand === brand) : [{ brand: `Test` }]
    console.log(
      `line 73 foundBrandinProductList:${foundBrandinProductList.brand}`
    )
    if (brand === showBrands.find(el => el === brand)) {
      console.log(
        `'hide items' button clicked: productList.find(el => el.brand === brand): ${foundBrandinProductList.brand}`
      )
      // if button shows 'hide items'
      setShowBrands(showBrands.filter(el => el !== brand))
    } else {
      // if button shows 'view items'
      brand === foundBrandinProductList.brand
        ? setShowBrands([...showBrands, brand])
        : sendPriceListSelections(brand).then(res =>
            setShowBrands([...showBrands, brand])
          )
    }
  }
  let mapSelectionLists = arr => {
    let brandsMapped = arr.map((brand, i) => {
      return (
        <div key={i}>
          {brand}
          <button
            onClick={e => {
              e.preventDefault()
              hideSelectedPriceList(brand)
            }}
          >
            {selectedPriceLists[0] === 'Test'
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
        {selectedPriceLists[0] === 'Test' ? null : (
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
      {productList[0] === 'Test' ? null : displayProductList}
    </div>
  )
}
