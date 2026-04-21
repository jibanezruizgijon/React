import { useState, useEffect } from "react"
import { getRandomFact } from "../services/facts"

 export function useCatFact () {
  const [fact, setFact] = useState()
  const refreshFact = async () => {
    getRandomFact().then(setFact)
  }

  useEffect(() => {
    refreshFact()
  }, [])

  return { fact, refreshFact }
}