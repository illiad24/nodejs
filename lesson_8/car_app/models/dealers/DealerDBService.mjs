import Dealer from './Dealer.mjs'

class DealerDBService {
    static async getList() {
        try {
            const data = await Dealer.find()
            return data
        } catch (error) {
            console.log(error)
            return []
        }
    }
}
export default DealerDBService