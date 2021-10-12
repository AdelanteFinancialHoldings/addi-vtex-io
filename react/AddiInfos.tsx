import React from 'react'
import { useProduct } from 'vtex.product-context';
import { Helmet } from "react-helmet";
import { useAppSettings } from './hooks/useAppSettings';

declare let process: {
  env: {
    VTEX_APP_VERSION: string
  }
}

function AddiInfos() {

  const { data: AppSettingsResponse } = useAppSettings({
    version: process.env.VTEX_APP_VERSION,
  })

  if (!AppSettingsResponse) {
    return null
  }

  const settingsValue = JSON.parse(AppSettingsResponse?.appSettings.message)

  const productContext = useProduct();

  const selectedItem = productContext?.selectedItem

  const seller = selectedItem?.sellers[0]

  const price = seller?.commertialOffer.Price

  if (!price) {
    return null
  }

  return (
    <div>
      <Helmet>
        <script src="https://s3.amazonaws.com/widgets.addi.com/bundle.min.js"></script>
      </Helmet>
      {/* @ts-ignore */}
      <addi-widget-br price={price} ally-slug={settingsValue.allySlug}></addi-widget-br>
    </div>
  )
}

export default AddiInfos
