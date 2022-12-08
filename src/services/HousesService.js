import { AppState } from "../AppState.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"


class HousesService {

  async getHouses() {
    const res = await api.get('api/houses')
    logger.log('[getHouses]', res.data)
    AppState.houses = res.data
  }

  async getHouseById(id) {
    const res = await api.get('api/houses/' + id)
    logger.log('[getHouseById]', res.data)
    AppState.activeHouse = res.data
  }

  async createHouse(houseData) {
    const res = await api.post('api/houses', houseData)
    logger.log('[createHouse]', res.data)
    // NOTE push add to the end of the list, if you want to add to the start of the list use unshift
    AppState.houses.push(res.data)
  }

  async editHouse(houseData) {
    logger.log(houseData)
    const res = await api.put('api/houses/' + houseData.id, houseData)
    logger.log('[editHouse]', res.data)
  }

  async removeHouse(id) {
    // logger.log('deleteing', id)
    const res = await api.delete('api/houses/' + id)
    logger.log('[removeHouse]', res.data)
    // NOTE should this be only one line? NO
    // AppState.cars.splice(AppState.cars.findIndex(c => c.id == id), 1)
    // a little better cause there steps to it that can be debugged cleaner
    let index = AppState.houses.findIndex(h => h.id == id)
    if (index >= 0) {
      AppState.houses.splice(index, 1)
    }
  }

}


export const housesService = new HousesService()