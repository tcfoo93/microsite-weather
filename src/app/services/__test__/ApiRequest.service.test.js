import axios from 'axios'
import ApiRequest from '@src/app/services/ApiRequest.service'
jest.mock('axios')

describe('getCurrentWeather', () => {
    it('successful call', async () => {
        const mockData = {
            data: 'test'
        }
        axios.mockResolvedValue(mockData)
        const res = await ApiRequest.getCurrentWeather({})
        expect(res).toBe(mockData)
    })

    it('successful call with city', async () => {
        const mockData = {
            data: 'test'
        }
        axios.mockResolvedValue(mockData)
        const res = await ApiRequest.getCurrentWeather({city: 'Johor'})
        expect(res).toBe(mockData)
    })

    it('successful call with city and country', async () => {
        const mockData = {
            data: 'test'
        }
        axios.mockResolvedValue(mockData)
        const res = await ApiRequest.getCurrentWeather({city: 'Johor', country: 'MY'})
        expect(res).toBe(mockData)
    })

    it('with error', async () => {
        const mockData = {
            error: 'failed'
        }
        axios.mockRejectedValue(mockData)
        try {
            await ApiRequest.getCurrentWeather({})
        } catch (err) {
            expect(err).toBe(mockData)
        }
    })
})

describe('fetchSearchHistory', () => {
    it('successful call', async () => {
        const mockData = {
            data: 'test'
        }
        axios.mockResolvedValue(mockData)
        const res = await ApiRequest.fetchSearchHistory()
        expect(res).toBe(mockData)
    })

    it('with error', async () => {
        const mockData = {
            error: 'failed'
        }
        axios.mockRejectedValue(mockData)
        try {
            await ApiRequest.fetchSearchHistory()
        } catch (err) {
            expect(err).toBe(mockData)
        }
    })
})

describe('addSearchItem', () => {
    it('successful call', async () => {
        const mockData = {
            data: 'test'
        }
        axios.mockResolvedValue(mockData)
        const res = await ApiRequest.addSearchItem({})
        expect(res).toBe(mockData)
    })

    it('with error', async () => {
        const mockData = {
            error: 'failed'
        }
        axios.mockRejectedValue(mockData)
        try {
            await ApiRequest.addSearchItem({})
        } catch (err) {
            expect(err).toBe(mockData)
        }
    })
})

describe('deleteSearchItem', () => {
    it('successful call', async () => {
        const mockData = {
            data: 'test'
        }
        axios.mockResolvedValue(mockData)
        const res = await ApiRequest.deleteSearchItem()
        expect(res).toBe(mockData)
    })

    it('with error', async () => {
        const mockData = {
            error: 'failed'
        }
        axios.mockRejectedValue(mockData)
        try {
            await ApiRequest.deleteSearchItem()
        } catch (err) {
            expect(err).toBe(mockData)
        }
    })
})