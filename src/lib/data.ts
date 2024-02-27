import { faker } from '@faker-js/faker'

export type House = {
    imageUrl: string
    imageAlt: string
    beds: number
    livingArea: number
    plotSize: number
    location: string
    formattedPrice: string
    monthlyPrice: string
    favorite: boolean
    watched: boolean
    lat_long: [number, number]
    description: string

}
export const fallbackImageUrl =
    "https://images.pexels.com/photos/206172/pexels-photo-206172.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";
const range = (len: number) => {
    const arr: number[] = []
    for (let i = 0; i < len; i++) {
        arr.push(i)
    }
    return arr
}

const newHouse = (): House => {
    return {
        imageUrl: `https://cloud.funda.nl/valentina_media/186/686/${187 + faker.number.int(200)}_720x480.jpg`,
        imageAlt: faker.lorem.words(4),
        beds: faker.number.int({
            min: 1,
            max: 5
        }),
        livingArea: faker.number.int(200),
        plotSize: faker.number.int(500),
        location: faker.location.streetAddress(),
        formattedPrice: faker.finance.amount({ min: 300000, max: 600000, dec: 0, symbol: '$', autoFormat: true }),
        monthlyPrice: faker.finance.amount({ min: 500, max: 2000, dec: 0, symbol: '$', autoFormat: true }),
        favorite: faker.datatype.boolean(),
        watched: faker.datatype.boolean(),
        lat_long: faker.location.nearbyGPSCoordinate({ origin: [52.35, 4.9166], radius: 5, isMetric: true }),
        description: faker.lorem.paragraphs(3)
    }
}

export const makeData = (len: number) => {
    const makeDataLevel = (): House[] => {
        return range(len).map((d): House => {
            return {
                ...newHouse()
            }
        })
    }

    return makeDataLevel()
}

export const getHousesData = () => {
    let houses: House[];
    if (localStorage.getItem("houses") !== null) {
        houses = JSON.parse(localStorage.getItem("houses") ?? "[]") as House[];
    } else {
        houses = makeData(10);
        localStorage.setItem("houses", JSON.stringify(houses));
    }
    return houses;
}
