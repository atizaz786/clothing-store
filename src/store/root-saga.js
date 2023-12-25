import {all, call} from 'redux-saga/effects';

import {categoriesSagas} from './categories/category.saga';

export function* rootSaga() {
    yield all([
        call(categoriesSagas)
    ])
  
}