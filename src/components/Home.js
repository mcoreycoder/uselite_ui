// import React, { Component } from 'react'
import React from 'react'

const imgTags = {
    maxWidth: "40%", 
    maxHeight: "200px", 
    height: "auto"
}


const govPage = (
  <div>
    <header className='page-header '>
      <div>
        <h1 className='title' data-default-text='Government Sales'>
          Government Sales
        </h1>
      </div>
    </header>

    <div className='article sidebar-page'>
      <p className='ng-binding'>
        U.S. Elite is proud to serve the U.S. Government, contractors and other
        allied entities. We offer hundreds of brands that are not on our
        website. Please send your requirements via email to
        governmentsales@US-EliteGear.com.
      </p>
      <div
        // ng-bind-html='trustAsHtml(generalPage.panels[0].fields.html)'
        className='ng-binding'
      >
        <p>
          For individuals, we offer a 10% "Duty Call" Discount for Military and
          First Responders - check it out{' '}
          <a href='https://www.us-elitegear.com/get-my-service-discount'>
            here
          </a>
          .&nbsp;
        </p>
      </div>
      <hr />
      <section className='agencies'>
        <div className='agency'>
          <div className='image-wrapper'></div>
          <div className='image-wrapper'></div>
          <div className='image-wrapper'>
            <img 
            src='https://ganzsecurity.com/misc/image/CONTRACTHOLDER_SCREENA2.JPG' 
            alt='contract_holder'
            style={imgTags}
            />
          </div>
        </div>
        <h5 className='ng-binding'>Schedule 84</h5>
        <div
        //   ng-bind-html='trustAsHtml(generalPage.panels[1].fields.html)'
          className='ng-binding'
        >
          <p>
            Schedule 84: Total Solutions for Law Enforcement, Security,
            Facilities Management, Fire, Rescue, Clothing, Marine Craft and
            Emergency/Disaster Response.
          </p>
          <p>
            <b>Contract #:</b> GS-07F0287W&nbsp;
          </p>
          <hr />
        </div>
        <div className='agency'>
          <div className='image-wrapper'></div>
          <div className='image-wrapper'>
            <img
              src='https://cdn.shopify.com/s/files/1/1735/4437/files/SDVOSB-Logo-2-1_480x480.jpg?v=1558743857'
              alt='sdvosb'
              style={imgTags}
            />
          </div>
          <h5 className='ng-binding'>SDVOSB</h5>
          <div
            // ng-bind-html='trustAsHtml(generalPage.panels[2].fields.html)'
            className='ng-binding'
          >
            <p>
              <a
                href='http://www.va.gov/osdbu/programs/sdvosb.asp'
                target='blank'
              >
                Service Disabled Veteran-Owned Small Business (SDVOSB)
              </a>
            </p>
          </div>
        </div>
        <div className='agency'>
          <div className='image-wrapper'>
            <hr />
          </div>
          <div className='image-wrapper'></div>
          <div className='image-wrapper'></div>
          <div className='image-wrapper'>
            <img 
            src='https://www.sam.gov/SAM/javax.faces.resource/logo.gif.jsf?ln=img' 
            alt='sam.gov'
            style={imgTags}
            />
          </div>
          <h5 className='ng-binding'>System for Award Management</h5>
          <div
            // ng-bind-html='trustAsHtml(generalPage.panels[3].fields.html)'
            className='ng-binding'
          >
            <p>
              <a
                href='https://www.google.com/url?sa=t&amp;rct=j&amp;q=&amp;esrc=s&amp;source=web&amp;cd=1&amp;cad=rja&amp;uact=8&amp;sqi=2&amp;ved=0ahUKEwjtrdDB0frLAhUBqx4KHeF4CT8QFghLMAA&amp;url=https%3A%2F%2Fwww.sam.gov%2F&amp;usg=AFQjCNGTb1-vp2vj7qt27bGr5BDnjTr3_w&amp;bvm=bv.118443451,d.dmo'
                target='blank'
              >
                Registered with System For Award Management
              </a>
            </p>
          </div>
        </div>
        <div className='agency'>
          <div className='image-wrapper'>
            <img 
            src='https://cdn2.hubspot.net/hub/46415/images/CAGE%20Code.png' 
            alt='cage-code'
            style={imgTags}
            />
          </div>
          <h5 className='ng-binding'>CageCode</h5>
          <div
            // ng-bind-html='trustAsHtml(generalPage.panels[4].fields.html)'
            className='ng-binding'
          >
            <p>
              <b>CAGE/NCAGE Code:</b> 1WGW6
            </p>
            <hr />
          </div>
        </div>
        <div className='agency'>
          <div className='image-wrapper'></div>
          <div className='image-wrapper'></div>
          <div className='image-wrapper'>
            <img 
            src='https://lh3.googleusercontent.com/proxy/7O36I1IMj-A7hobORMYn_b-t1oNks-uqy9pDhU8WiYayxFGjdrUHFI4uOHBsYc_qnYgZ_5-V_dwMhyExkh0sD1lvGDnaidJKxmWi5a8RZ0o'
            alt="duns" 
            style={imgTags}
            />
          </div>
          <h5 className='ng-binding'>Duns</h5>
          <div
            // ng-bind-html='trustAsHtml(generalPage.panels[5].fields.html)'
            className='ng-binding'
          >
            <p>
              <b>DUNS #:</b> 127890411
            </p>
            <hr />
          </div>
        </div>
        <div className='agency'>
          <div className='image-wrapper'></div>
          <div className='image-wrapper'></div>
          <div className='image-wrapper'>
            <img 
            src='https://defensetax.com/wp-content/uploads/Form-W-9-irs-form9.png' 
            alt='Form-W-9-irs'
            style={imgTags}
            />
          </div>
          <h5 className='ng-binding'>Tax ID</h5>
          <div
            // ng-bind-html='trustAsHtml(generalPage.panels[6].fields.html)'
            className='ng-binding'
          >
            <p>Tax ID available on request</p>
          </div>
        </div>
      </section>
    </div>
  </div>
)

export default function Home () {
  return (
    <div>
      I am Elite!
      <br />
      {/* <iframe
        title='us-elitegear-gov-sales'
        height='500px'
        width='95%vw'
        object-fit='scale-down'
        src='https://www.us-elitegear.com/pages/gov-sales'
      /> */}
      {govPage}
    </div>
  )
}
