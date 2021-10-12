import { useQuery } from 'react-apollo'

import GET_APP_SETTINGS from '../queries/AppSettings.graphql'

export interface AppSettingsData {
  version: string
}

export interface AppSettingsResponse {
  appSettings: any
}

export const useAppSettings = ({ version }: AppSettingsData) =>
  useQuery<AppSettingsResponse>(GET_APP_SETTINGS, {
    variables: {
      version,
    },
    ssr: false,
  })