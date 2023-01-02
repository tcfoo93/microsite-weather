import LandingPage from "../Landing.route";

jest.mock('react-router-dom')

describe('LandingPage', () => {
    const props = {
        index: true
    }

    afterEach(() => {
        jest.clearAllMocks()
    })

    it('init', async () => {
        const routes = LandingPage(props)
        expect(routes.props.children.length).toBe(2)
        expect(routes.props.children[0].props.index).toBeTruthy()
    })
})
