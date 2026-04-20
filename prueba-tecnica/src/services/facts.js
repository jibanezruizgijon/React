const API_URL = "https://catfact.ninja/fact"

export const getRandomFact = async () => {
    const res = await fetch(API_URL)
    const data = await res.json()
    const { fact } = data
    return fact;
}