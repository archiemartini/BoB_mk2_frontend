import MockAdapter from 'axios-mock-adapter'
import axios from 'axios'
import configureStore from '../store'
import { searchMeals, selectMeal } from '../meals';

describe('the Meals slice', () => {
  
  let fakeAxios;
  let store;

  beforeEach(() => {
    fakeAxios = new MockAdapter(axios)
    store = configureStore()
  })

  const mealsSlice = () => store.getState().entities.meals

  describe('Searching Meals', () => {
    
    it('should search the bugs and populate the store', async () => {
      fakeAxios.onPost('/meals').reply(200, [{title: 'Sausage Casserole'}])

      await store.dispatch(searchMeals({search: 'sausage'}))

      expect(mealsSlice().list).toHaveLength(1)
    })

    describe('loading indicator', () => {

      it('should be true while fetching the meals search', async () => {
        fakeAxios.onPost("/meals").reply(() => {
          expect(mealsSlice.loading).toBe(true)
          return [200, [{title: 'Sausage Casserole'}]]
        })

        store.dispatch(searchMeals({search: 'sausage'}))
      })
      it('should be false after fetching the meals', async () => {
        fakeAxios.onPost("/meals").reply(200, [{title: 'Sausage Casserole'}])

        await store.dispatch(searchMeals({search: 'sausage'}))
     
        expect(mealsSlice().loading).toBe(false)
      })
      it('should be false if the server returns an error', async () => {
        fakeAxios.onPost("/meals").reply(500)

        await store.dispatch(searchMeals({search: 'sausage'}))

        expect(mealsSlice().loading).toBe(false)
      })   

    })
  })

  describe('Selecting Meals', () => {
    
    it('should search the selected meal and populate the store with it', async () => {
      fakeAxios.onGet('/selectmeal?id=1').reply(200, {title: 'Sausage Casserole'})

      await store.dispatch(selectMeal({id: 1}))

      expect(mealsSlice().selectedMeal.info.title).toBe('Sausage Casserole')
    })

    describe('loading indicator', () => {

      it('should be true while fetching the meals search', async () => {
        fakeAxios.onGet("/select").reply(() => {
          expect(mealsSlice.selectedMeal.loading).toBe(true)
          return [200, [{title: 'Sausage Casserole'}]]
        })

        store.dispatch(selectMeal({id: 1}))
      })
      it('should be false after fetching the meals', async () => {
        fakeAxios.onGet("/select").reply(200, [{title: 'Sausage Casserole'}])

        await store.dispatch(selectMeal({id: 1}))
     
        expect(mealsSlice().selectedMeal.loading).toBe(false)
      })
      it('should be false if the server returns an error', async () => {
        fakeAxios.onGet("/select").reply(500)

        await store.dispatch(selectMeal({id: 1}))

        expect(mealsSlice().selectedMeal.loading).toBe(false)
      })   
    })  
  })



})