//@ts-nocheck

import { useEffect, useState, useCallback } from 'react'

import { useMapsLibrary } from '@vis.gl/react-google-maps'

// Define proper types that match the actual API response
interface PlacePrediction {
  place: string
  placeId: string
  text: {
    text: string
    matches: Array<{ endOffset: number }>
  }
  structuredFormat?: {
    mainText: {
      text: string
      matches: Array<{ endOffset: number }>
    }
    secondaryText?: {
      text: string
      matches: Array<{ endOffset: number }>
    }
  }
  types?: string[]
}

interface QueryPrediction {
  text: {
    text: string
    matches: Array<{ endOffset: number }>
  }
}

interface AutocompleteSuggestion {
  placePrediction?: PlacePrediction
  queryPrediction?: QueryPrediction
}

export const useAutocompleteSuggestions = (input: string) => {
  const placesLib = useMapsLibrary('places')
  const [suggestions, setSuggestions] = useState<AutocompleteSuggestion[]>([])
  const [sessionToken, setSessionToken] = useState<google.maps.places.AutocompleteSessionToken | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const resetSession = useCallback(() => {
    if (placesLib) {
      setSessionToken(new google.maps.places.AutocompleteSessionToken())
    }
  }, [placesLib])

  useEffect(() => {
    if (!input || !placesLib) {
      if (!input) setSuggestions([])
      if (!sessionToken && placesLib) resetSession()

      return
    }

    if (!sessionToken) {
      resetSession()

      return
    }

    setLoading(true)
    setError(null)

    // Try the new API first
    if (placesLib.AutocompleteSuggestion?.fetchAutocompleteSuggestions) {
      const request: google.maps.places.AutocompleteSuggestion = {
        input,
        sessionToken,
        includedPrimaryTypes: ['establishment', 'geocode', 'locality', 'administrative_area_level_1', 'country']
      }

      placesLib.AutocompleteSuggestion.fetchAutocompleteSuggestions(request)
        .then(response => {
          console.log('New API response:', response)

          // Handle nested array response
          if (Array.isArray(response) && Array.isArray(response[0])) {
            const transformedSuggestions: AutocompleteSuggestion[] = response[0].map((item: any) => ({
              placePrediction: {
                place: item[0],
                placeId: item[1],
                text: {
                  text: item[2][0],
                  matches: item[2][1].map((match: any) => ({
                    endOffset: match[1] || match[0] || 0
                  }))
                },
                structuredFormat: {
                  mainText: {
                    text: item[3][0][0],
                    matches: item[3][0][1].map((match: any) => ({
                      endOffset: match[1] || match[0] || 0
                    }))
                  },
                  secondaryText: item[3][1]
                    ? {
                        text: item[3][1][0],
                        matches:
                          item[3][1][1]?.map((match: any) => ({
                            endOffset: match[1] || match[0] || 0
                          })) || []
                      }
                    : undefined
                },
                types: item[4]
              }
            }))

            setSuggestions(transformedSuggestions)
          } else if (response.suggestions) {
            // Handle standard suggestions response if available
            const validSuggestions = response.suggestions.filter(
              (suggestion: AutocompleteSuggestion) => suggestion.placePrediction || suggestion.queryPrediction
            )

            setSuggestions(validSuggestions)
          } else {
            setSuggestions([])
          }

          setLoading(false)
        })
        .catch(error => {
          console.error('New API error:', error)
          setError(`New API Error: ${error.message}`)
          tryLegacyAPI()
        })
    } else {
      tryLegacyAPI()
    }

    function tryLegacyAPI() {
      console.log('Trying legacy AutocompleteService...')

      if (!placesLib.AutocompleteService) {
        setError('AutocompleteService not available')
        setLoading(false)

        return
      }

      const autocompleteService = new placesLib.AutocompleteService()

      autocompleteService.getPlacePredictions(
        {
          input,
          sessionToken,
          types: ['establishment', 'geocode']
        },
        (predictions, status) => {
          console.log('Legacy API status:', status, 'predictions:', predictions)

          if (status === google.maps.places.PlacesServiceStatus.OK && predictions) {
            const convertedSuggestions: AutocompleteSuggestion[] = predictions.map((pred: any) => ({
              placePrediction: {
                place: pred.place_id,
                placeId: pred.place_id,
                text: {
                  text: pred.description,
                  matches:
                    pred.matched_substrings?.map((match: any) => ({
                      endOffset: match.length + match.offset
                    })) || []
                },
                structuredFormat: pred.structured_formatting
                  ? {
                      mainText: {
                        text: pred.structured_formatting.main_text,
                        matches:
                          pred.structured_formatting.main_text_matched_substrings?.map((match: any) => ({
                            endOffset: match.length + match.offset
                          })) || []
                      },
                      secondaryText: pred.structured_formatting.secondary_text
                        ? {
                            text: pred.structured_formatting.secondary_text,
                            matches:
                              pred.structured_formatting.secondary_text_matched_substrings?.map((match: any) => ({
                                endOffset: match.length + match.offset
                              })) || []
                          }
                        : undefined
                    }
                  : '',
                types: pred.types
              }
            }))

            setSuggestions(convertedSuggestions)
            setError(null)
          } else {
            console.error('Legacy API error status:', status)
            setSuggestions([])
            setError(`Legacy API Error: ${status}`)
          }

          setLoading(false)
        }
      )
    }
  }, [input, placesLib, sessionToken, resetSession])

  return { suggestions, resetSession, loading, error }
}
