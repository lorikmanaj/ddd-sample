export interface Hotel {
    id: number,
    name: string,
    starsRating: number,
    comment: string,
    address: string,
    countryId: number | null
}