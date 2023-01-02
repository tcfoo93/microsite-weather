import axios from 'axios'
import ApiRequest from '@src/app/services/ApiRequest.service'
jest.mock('axios')

const request = new ApiRequest()

describe('getCurrentWeather', () => {
    it('successful call', async () => {
        const mockData = {
            data: 'test'
        }
        axios.mockResolvedValue(mockData)
        const res = await request.getCurrentWeather({})
        expect(res).toBe(mockData)
    })

    it('successful call with city', async () => {
        const mockData = {
            data: 'test'
        }
        axios.mockResolvedValue(mockData)
        const res = await request.getCurrentWeather({city: 'Johor'})
        expect(res).toBe(mockData)
    })

    it('successful call with city and country', async () => {
        const mockData = {
            data: 'test'
        }
        axios.mockResolvedValue(mockData)
        const res = await request.getCurrentWeather({city: 'Johor', country: 'MY'})
        expect(res).toBe(mockData)
    })

    it('with error', async () => {
        const mockData = {
            error: 'failed'
        }
        axios.mockRejectedValue(mockData)
        try {
            await request.getCurrentWeather({})
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
        const res = await request.fetchSearchHistory({})
        expect(res).toBe(mockData)
    })

    it('with error', async () => {
        const mockData = {
            error: 'failed'
        }
        axios.mockRejectedValue(mockData)
        try {
            await request.fetchSearchHistory({})
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
        const res = await request.addSearchItem({})
        expect(res).toBe(mockData)
    })

    it('with error', async () => {
        const mockData = {
            error: 'failed'
        }
        axios.mockRejectedValue(mockData)
        try {
            await request.addSearchItem({})
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
        const res = await request.deleteSearchItem()
        expect(res).toBe(mockData)
    })

    it('with error', async () => {
        const mockData = {
            error: 'failed'
        }
        axios.mockRejectedValue(mockData)
        try {
            await request.deleteSearchItem()
        } catch (err) {
            expect(err).toBe(mockData)
        }
    })
})