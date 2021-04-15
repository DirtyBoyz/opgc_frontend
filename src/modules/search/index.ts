import { handleActions, createAction } from 'redux-actions';
import { FAVORITES_KEY, HISTORIES_KEY } from './constants';
import { getList } from './services';
/**
 * interface
 */
interface I_STATE {
    favorites: string[];
    histories: string[];
}

/**
 * actions
 */
export const GET_HISTORIES = 'app/GET_HISTORIES';
export const GET_FAVORITES = 'app/GET_FAVORITES';
export const ADD_HISTORY = 'app/ADD_HISTORY';
export const ADD_FAVORITE = 'app/ADD_FAVORITE';
export const REMOVE_HISTORY = 'app/REMOVE_HISTORY';
export const REMOVE_FAVORITE = 'app/REMOVE_FAVORITE';

/**
 * functions for creating actions
 */
export const getHistories = createAction(GET_HISTORIES);
export const getFavorites = createAction(GET_FAVORITES);
export const addHistory = createAction(ADD_HISTORY, (item: string) => item);
export const addFavorite = createAction(ADD_FAVORITE, (item: string) => item);
export const removeHistory = createAction(
    REMOVE_HISTORY,
    (item: string) => item
);
export const removeFavorite = createAction(
    REMOVE_FAVORITE,
    (item: string) => item
);

/**
 * initial state
 */
const initialState: I_STATE = {
    favorites: [],
    histories: [],
};

/**
 * reducer
 */
const search = handleActions(
    {
        [GET_HISTORIES]: (state: I_STATE): I_STATE => ({
            ...state,
            histories: getList(HISTORIES_KEY),
        }),
        [GET_FAVORITES]: (state: I_STATE): I_STATE => ({
            ...state,
            favorites: getList(FAVORITES_KEY),
        }),
        [ADD_HISTORY]: (
            state: I_STATE,
            { payload }: { payload: string }
        ): I_STATE => {
            const histories = [...state.histories];

            if (payload && !histories.includes(payload)) {
                histories.push(payload);
            }

            localStorage.setItem(HISTORIES_KEY, JSON.stringify(histories));

            return {
                ...state,
                histories,
            };
        },
        [ADD_FAVORITE]: (
            state: I_STATE,
            { payload }: { payload: string }
        ): I_STATE => {
            const favorites = [...state.favorites];

            if (payload && !favorites.includes(payload)) {
                favorites.push(payload);
            }

            localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));

            return {
                ...state,
                favorites,
            };
        },
        [REMOVE_HISTORY]: (
            state: I_STATE,
            { payload }: { payload: string }
        ): I_STATE => {
            const histories = state.histories.filter(
                (item) => item !== payload
            );

            localStorage.setItem(HISTORIES_KEY, JSON.stringify(histories));

            return {
                ...state,
                histories,
            };
        },
        [REMOVE_FAVORITE]: (
            state: I_STATE,
            { payload }: { payload: string }
        ): I_STATE => {
            const favorites = state.favorites.filter(
                (item) => item !== payload
            );

            localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));

            return {
                ...state,
                favorites,
            };
        },
    },
    initialState
);

export default search;